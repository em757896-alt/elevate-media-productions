import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createSupabaseServerClient } from '$lib/server/supabase';
import { verifyTurnstile } from '$lib/server/turnstile';

export const POST: RequestHandler = async ({ request, cookies, getClientAddress }) => {
  const supabase = createSupabaseServerClient(cookies);
  if (!supabase) {
    throw error(503, 'Authentication is not configured.');
  }

  let payload: { email?: unknown; password?: unknown; turnstile?: unknown };
  try {
    payload = await request.json();
  } catch {
    throw error(400, 'Invalid request body.');
  }

  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const password = typeof payload.password === 'string' ? payload.password : '';
  const turnstile = typeof payload.turnstile === 'string' ? payload.turnstile : '';

  if (!email || !password || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw error(400, 'Please enter a valid email and password.');
  }

  const human = await verifyTurnstile(turnstile);
  if (!human) {
    throw error(400, 'Could not verify you are human. Please try again.');
  }

  const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

  if (signInError) {
    throw error(401, signInError.message);
  }

  void data;
  void getClientAddress;
  return json({ ok: true });
};