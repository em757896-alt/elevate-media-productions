import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { createSupabaseServerClient } from '$lib/server/supabase';

export const POST: RequestHandler = async ({ cookies, locals }) => {
  const supabase = locals.supabase ?? createSupabaseServerClient(cookies);
  if (!supabase) {
    throw error(503, 'Authentication is not configured.');
  }
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    throw error(401, 'Not signed in.');
  }

  // Content keyed by the user (forum contributions cascade from the profile row
  // which is cascade-deleted with the auth user). Messages/subscriptions are
  // keyed by email and removed explicitly.
  await Promise.allSettled([
    supabase.from('messages').delete().eq('email', user.email ?? ''),
    supabase.from('subscribers').delete().eq('email', user.email ?? '')
  ]);

  const url = env.SUPABASE_URL ?? (import.meta.env.VITE_SUPABASE_URL as string | undefined);
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw error(503, 'Server is missing the admin key required to delete accounts.');
  }

  // Deleting the auth user cascades to the profile and all forum content.
  const res = await fetch(`${url}/auth/v1/admin/users/${user.id}`, {
    method: 'DELETE',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`
    }
  });
  if (!res.ok) {
    throw error(502, 'Could not delete the account right now. Please try again later.');
  }

  await supabase.auth.signOut();
  return json({ ok: true });
};