import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createSupabaseServerClient } from '$lib/server/supabase';
import { verifyTurnstile } from '$lib/server/turnstile';
import { consumeRateLimit } from '$lib/server/rate-limit';

export const POST: RequestHandler = async ({ request, cookies, getClientAddress }) => {
  const supabase = createSupabaseServerClient(cookies);
  if (!supabase) throw error(503, 'Authentication is not configured.');

  const limited = await consumeRateLimit('login:' + getClientAddress(), 8, 900);
  if (!limited.allowed) throw error(429, 'Too many sign-in attempts. Please wait before trying again.');

  let payload: { email?: unknown; password?: unknown; turnstile?: unknown };
  try { payload = await request.json(); } catch { throw error(400, 'Invalid request body.'); }
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const password = typeof payload.password === 'string' ? payload.password : '';
  const turnstile = typeof payload.turnstile === 'string' ? payload.turnstile : '';
  if (!email || email.length > 254 || !password || password.length > 1024 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw error(400, 'Please enter a valid email and password.');
  }
  if (!(await verifyTurnstile(turnstile))) throw error(400, 'Human verification could not be completed. Please try again.');

  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError) {
    throw error(401, 'Invalid email or password.');
  }
  return json({ ok: true });
};
