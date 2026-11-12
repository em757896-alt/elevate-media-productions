import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { isDisposableEmail } from '$lib/server/disposable-email';
import { verifyTurnstile } from '$lib/server/turnstile';
import { consumeRateLimit } from '$lib/server/rate-limit';
import { database } from '$lib/server/neon';

const ORIGIN = 'https://elevatemediaproductions.cc';

async function tokenHash(token: string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('');
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const limited = await consumeRateLimit('newsletter:' + getClientAddress(), 5, 600);
  if (!limited.allowed) throw error(429, 'Too many subscription attempts. Please try again later.');

  let payload: { email?: unknown; name?: unknown; turnstile?: unknown; website?: unknown };
  try { payload = await request.json(); } catch { throw error(400, 'Invalid request body.'); }
  if (payload.website) return json({ ok: true, sent: true });

  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const name = typeof payload.name === 'string' ? payload.name.trim().slice(0, 100) : '';
  const turnstile = typeof payload.turnstile === 'string' ? payload.turnstile : '';
  if (!email || email.length > 254 || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) throw error(400, 'Please enter a valid email address.');
  if (isDisposableEmail(email)) throw error(400, 'Please use a non-disposable email address.');
  if (!(await verifyTurnstile(turnstile))) throw error(400, 'Human verification could not be completed. Please refresh the page and try again.');

  const token = crypto.randomUUID() + crypto.randomUUID();
  const hashed = await tokenHash(token);
  try {
    await database()`INSERT INTO newsletter_subscribers (email,name,consent_at,confirmation_token_hash,verified_at,unsubscribed_at,delivery_status)
      VALUES (${email},${name || null},now(),${hashed},NULL,NULL,'pending')
      ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, consent_at=now(),
      confirmation_token_hash=EXCLUDED.confirmation_token_hash, verified_at=NULL,
      unsubscribed_at=NULL, delivery_status='pending'`;
  } catch (cause) {
    console.error('Newsletter persistence failed:', cause);
    throw error(503, 'The newsletter service is temporarily unavailable. Please try again later.');
  }

  const apiKey = (env.BREVO_API_KEY ?? '').trim();
  if (!apiKey) {
    console.error('Newsletter confirmation queued; BREVO_API_KEY is not configured.');
    return json({ ok: true, sent: true, queued: true });
  }

  const confirmUrl = ((env.SITE_URL ?? '').trim() || ORIGIN) + '/api/newsletter/confirm?token=' + encodeURIComponent(token);
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
    textContent: 'Confirm your Elevate Media Productions newsletter subscription: ' + confirmUrl + '\\n\\nIf you did not request this, ignore this email.'
  };

  try {
    const delivery = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST', headers: { 'api-key': apiKey, accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify(body), signal: AbortSignal.timeout(8000)
    });
    if (!delivery.ok) {
      const detail = await delivery.text().catch(() => '');
      console.error('Brevo newsletter delivery failed', delivery.status, detail.slice(0, 500));
      await database()`UPDATE newsletter_subscribers SET delivery_status='failed' WHERE email=${email}`;
      return json({ ok: true, sent: true, queued: true });
    }
    await database()`UPDATE newsletter_subscribers SET delivery_status='sent' WHERE email=${email}`;
  } catch (cause) {
    console.error('Brevo newsletter delivery error:', cause);
    await database()`UPDATE newsletter_subscribers SET delivery_status='failed' WHERE email=${email}`;
  }
  return json({ ok: true, sent: true });
};
