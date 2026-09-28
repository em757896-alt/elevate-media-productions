import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createSupabaseServerClient } from '$lib/server/supabase';

export const POST: RequestHandler = async ({ cookies }) => {
  const supabase = createSupabaseServerClient(cookies);
  if (supabase) {
    await supabase.auth.signOut();
  }
  // Clear any Supabase auth cookies regardless of exact names.
  for (const name of cookies.getAll().map((c) => c.name)) {
    if (name.startsWith('sb-')) {
      cookies.delete(name, { path: '/' });
    }
  }
  return json({ ok: true });
};