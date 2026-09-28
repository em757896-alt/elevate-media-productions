import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createSupabaseServerClient } from '$lib/server/supabase';
import { verifyTurnstile } from '$lib/server/turnstile';
import { isDisposableEmail } from '$lib/server/disposable-email';
import { consumeRateLimit } from '$lib/server/rate-limit';
import { env } from '$env/dynamic/private';

const EMAIL_REDIRECT = (env.SITE_URL ?? '').trim() || 'https://elevate-media-productions.vercel.app';

export const POST: RequestHandler = async ({ request, cookies, getClientAddress }) => {
  const supabase = createSupabaseServerClient(cookies);
  if (!supabase) {
    throw error(503, 'Authentication is not configured.');
  }

  // Per-IP + per-email guard against signup flooding.
  const ip = getClientAddress();
  const limited = await consumeRateLimit(`signup:${ip}`, 5, 600);
  if (!limited.allowed) {
    throw error(429, 'Too many signup attempts from this address. Please wait and try again.');
  }

  let payload: { email?: unknown; password?: unknown; name?: unknown; turnstile?: unknown; website?: unknown } = {};
  try {
    payload = await request.json();
  } catch {
    throw error(400, 'Invalid request body.');
  }

  // Honeypot: bots fill hidden fields humans never see.
  if (payload.website) {
    // Pretend success without doing the work.
    return json({ ok: true, sent: true });
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const password = typeof payload.password === 'string' ? payload.password : '';
  const turnstile = typeof payload.turnstile === 'string' ? payload.turnstile : '';

  if (!name || !email || !password || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw error(400, 'Please fill in all fields with valid values.');
  }

  if (isDisposableEmail(email)) {
    // Silently accept to avoid signaling the blocklist.
    return json({ ok: true, sent: true });
  }

  const human = await verifyTurnstile(turnstile);
  if (!human) {
    throw error(400, 'Could not verify you are human. Please try again.');
  }

  const limited2 = await consumeRateLimit(`signup:${email}`, 5, 3600);
  if (!limited2.allowed) {
    throw error(429, 'Too many accounts registered with this email. Please try again later.');
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name, username: email.split('@')[0] },
      emailRedirectTo: `${EMAIL_REDIRECT}/auth/login`
    }
  });

  if (signUpError) {
    throw error(400, signUpError.message);
  }

  // With email confirmation ON, no session is returned and the link is emailed.
  return json({ ok: true, sent: !data.session });
};