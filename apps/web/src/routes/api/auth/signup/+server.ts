import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createSupabaseServerClient } from '$lib/server/supabase';
import { verifyTurnstile } from '$lib/server/turnstile';
import { isDisposableEmail } from '$lib/server/disposable-email';
import { consumeRateLimit } from '$lib/server/rate-limit';
import { env } from '$env/dynamic/private';

const EMAIL_REDIRECT = (env.SITE_URL ?? '').trim() || 'https://elevatemediaproductions.cc';

export const POST: RequestHandler = async ({ request, cookies, getClientAddress }) => {
  const supabase = createSupabaseServerClient(cookies);
  if (!supabase) throw error(503, 'Authentication is not configured.');

  const limited = await consumeRateLimit('signup:' + getClientAddress(), 5, 600);
  if (!limited.allowed) throw error(429, 'Too many signup attempts. Please wait and try again.');

  let payload: { email?: unknown; password?: unknown; name?: unknown; turnstile?: unknown; website?: unknown };
  try { payload = await request.json(); } catch { throw error(400, 'Invalid request body.'); }
  if (payload.website) return json({ ok: true, sent: true });

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const password = typeof payload.password === 'string' ? payload.password : '';
  const turnstile = typeof payload.turnstile === 'string' ? payload.turnstile : '';
  if (!name || name.length > 100 || !email || email.length > 254 || !password ||
      password.length < 12 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw error(400, 'Use a valid name and email, and a password of at least 12 characters with upper/lowercase letters, a number and a symbol.');
  }
  if (isDisposableEmail(email)) throw error(400, 'Please use a non-disposable email address.');
  if (!(await verifyTurnstile(turnstile))) throw error(400, 'Human verification could not be completed. Please try again.');

  const emailLimit = await consumeRateLimit('signup-email:' + email, 3, 3600);
  if (!emailLimit.allowed) throw error(429, 'Too many signup attempts for this email. Please try later.');

  const { data, error: signupError } = await supabase.auth.signUp({
    email, password,
    options: { data: { full_name: name, username: email.split('@')[0] }, emailRedirectTo: EMAIL_REDIRECT + '/auth/login' }
  });
  if (signupError) {
    if (/already registered|already been registered/i.test(signupError.message)) {
      return json({ ok: true, sent: true });
    }
    console.error('Signup provider error:', signupError.message);
    throw error(400, 'We could not create your account. Check your details and try again.');
  }
  return json({ ok: true, sent: !data.session });
};
