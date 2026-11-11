import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { isDisposableEmail } from '$lib/server/disposable-email';
import { verifyTurnstile } from '$lib/server/turnstile';
import { consumeRateLimit } from '$lib/server/rate-limit';

const FALLBACK_ORIGIN = 'https://elevatemediaproductions.cc';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const limited = await consumeRateLimit('newsletter:' + getClientAddress(), 5, 600);
  if (!limited.allowed) throw error(429, 'Too many subscription attempts. Please try again later.');

  let payload: { email?: unknown; name?: unknown; turnstile?: unknown; website?: unknown };
  try { payload = await request.json(); } catch { throw error(400, 'Invalid request body.'); }
  if (payload.website) return json({ ok: true, sent: true });

  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const name = typeof payload.name === 'string' ? payload.name.trim().slice(0, 100) : '';
  const turnstile = typeof payload.turnstile === 'string' ? payload.turnstile : '';
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw error(400, 'Please enter a valid email address.');
  if (isDisposableEmail(email)) throw error(400, 'Please use a non-disposable email address.');
  if (!(await verifyTurnstile(turnstile))) throw error(400, 'Human verification could not be completed. Please refresh the page and try again.');

  const apiKey = (env.BREVO_API_KEY ?? '').trim();
  const supabaseUrl = (env.SUPABASE_URL ?? (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? '').trim();
  const supabaseKey = (env.SUPABASE_ANON_KEY ?? (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? '').trim();
  if (!apiKey || !supabaseUrl || !supabaseKey) {
    console.error('Newsletter service configuration is incomplete.');
    throw error(503, 'The newsletter service is temporarily unavailable. Please try again later.');
  }

  const origin = (env.SITE_URL ?? '').trim() || FALLBACK_ORIGIN;
  const token = crypto.randomUUID();
  const save = await fetch(supabaseUrl.replace(/\/$/, '') + '/rest/v1/subscribers?on_conflict=email', {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: 'Bearer ' + supabaseKey,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify({
      email, name: name || null, consent_at: new Date().toISOString(),
      confirm_token: token, verified: false, unsubscribed: false
    }),
    signal: AbortSignal.timeout(8000)
  });
  if (!save.ok) {
    const detail = await save.text().catch(() => '');
    console.error('Newsletter subscriber persistence failed', save.status, detail.slice(0, 500));
    throw error(502, 'We could not save your subscription. Please try again later.');
  }

  const confirmUrl = origin + '/api/newsletter/confirm?token=' + encodeURIComponent(token);
  const senderEmail = (env.CONTACT_SENDER ?? '').trim() || 'elevatemediaproductions1@gmail.com';
  const body = {
    sender: { name: 'Elevate Media Productions', email: senderEmail },
    to: [{ email, name: name || email.split('@')[0] }],
    subject: 'Confirm your subscription',
    htmlContent: '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;">' +
      '<p style="font-size:20px;font-weight:700;margin:0 0 12px;">Almost there — confirm your subscription</p>' +
      '<p style="margin:0 0 20px;line-height:1.6;">Thanks for joining the Elevate Media newsletter. Confirm your email to receive occasional studio updates and new work.</p>' +
      '<p style="margin:0 0 20px;"><a href="' + confirmUrl + '" style="display:inline-block;background:#6366f1;color:#fff;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:600;">Confirm subscription</a></p>' +
      '<p style="color:#94a3b8;font-size:12px;margin:24px 0 0;">If you did not request this, you can safely ignore this email.</p></div>',
    textContent: 'Confirm your Elevate Media Productions newsletter subscription: ' + confirmUrl + '\n\nIf you did not request this, ignore this email.'
  };

  let delivery: Response;
  try {
    delivery = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000)
    });
  } catch { throw error(504, 'The confirmation email service did not respond. Please try again later.'); }
  if (!delivery.ok) {
    const detail = await delivery.text().catch(() => '');
    console.error('Brevo newsletter delivery failed', delivery.status, detail.slice(0, 500));
    throw error(502, 'We could not send the confirmation email. Please try again later.');
  }
  return json({ ok: true, sent: true });
};
