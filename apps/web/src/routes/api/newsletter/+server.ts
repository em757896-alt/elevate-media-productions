import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { isDisposableEmail } from '$lib/server/disposable-email';
import { verifyTurnstile } from '$lib/server/turnstile';
import { consumeRateLimit } from '$lib/server/rate-limit';

const FALLBACK_ORIGIN = 'https://elevate-media-productions.vercel.app';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const apiKey = env.BREVO_API_KEY;
  if (!apiKey) {
    throw error(503, 'Email service not configured.');
  }

  const origin = (env.SITE_URL ?? '').trim() || FALLBACK_ORIGIN;

  const limited = await consumeRateLimit(`newsletter:${getClientAddress()}`, 5, 600);
  if (!limited.allowed) {
    throw error(429, 'Too many subscription attempts. Please try again later.');
  }

  let payload: { email?: unknown; name?: unknown; turnstile?: unknown; website?: unknown };
  try {
    payload = await request.json();
  } catch {
    throw error(400, 'Invalid request body.');
  }

  if (payload.website) {
    return json({ ok: true, sent: true });
  }

  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const turnstile = typeof payload.turnstile === 'string' ? payload.turnstile : '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw error(400, 'Please enter a valid email address.');
  }

  if (isDisposableEmail(email)) {
    return json({ ok: true, sent: true });
  }

  const human = await verifyTurnstile(turnstile);
  if (!human) {
    throw error(400, 'Could not verify you are human. Please try again.');
  }

  const token = crypto.randomUUID();
  const confirmUrl = `${origin}/api/newsletter/confirm?token=${encodeURIComponent(token)}`;

  const body = {
    sender: { name: 'Elevate Media Productions', email: (env.CONTACT_SENDER ?? '').trim() || 'elevatemediaproductions1@gmail.com' },
    to: [{ email, name: name || email.split('@')[0] }],
    subject: 'Confirm your subscription',
    htmlContent: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;">
        <p style="font-size:20px;font-weight:700;margin:0 0 12px;">Almost there — confirm your subscription</p>
        <p style="margin:0 0 20px;line-height:1.6;">Thanks for joining the Elevate Media newsletter. Click the button below to confirm your subscription and receive monthly builds, launch notes and honest engineering lessons.</p>
        <p style="margin:0 0 20px;"><a href="${confirmUrl}" style="display:inline-block;background:#6366f1;color:#fff;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:600;">Confirm subscription</a></p>
        <p style="color:#94a3b8;font-size:12px;margin:24px 0 0;">If you didn't request this, you can safely ignore this email. No email will be sent unless you confirm.</p>
      </div>`,
    textContent: `Almost there — confirm your subscription. Visit ${confirmUrl} to confirm. If you didn't request this, ignore this email.`
  };

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) {
      throw error(502, 'Could not send the confirmation email. Please try again later.');
    }
  } catch {
    throw error(502, 'Could not send the confirmation email. Please try again later.');
  }

  // Persist the pending (unverified) subscriber so confirm can activate it.
  await persistSubscriber(email, name, token);

  return json({ ok: true, sent: true });
};

async function persistSubscriber(email: string, name: string, token: string) {
  const url = env.SUPABASE_URL ?? (import.meta.env.VITE_SUPABASE_URL as string | undefined);
  const anonKey = env.SUPABASE_ANON_KEY ?? (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);
  if (!url || !anonKey) return;
  try {
    await fetch(`${url}/rest/v1/subscribers`, {
      method: 'POST',
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates'
      },
      body: JSON.stringify({ email, name, confirm_token: token, verified: false })
    });
  } catch {
    // Non-fatal — email still sent.
  }
}