import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url }) => {
  const token = (url.searchParams.get('token') ?? '').trim();
  const action = url.searchParams.get('action') ?? 'confirm';
  const rpc = action === 'unsubscribe' ? 'unsubscribe_subscription' : action === 'confirm' ? 'confirm_subscription' : null;
  const supabaseUrl = (env.SUPABASE_URL ?? (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? '').trim();
  const supabaseKey = (env.SUPABASE_ANON_KEY ?? (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? '').trim();

  if (!token || token.length > 100 || !rpc || !supabaseUrl || !supabaseKey) throw redirect(303, '/?subscribe=error');

  try {
    const res = await fetch(supabaseUrl.replace(/\/$/, '') + '/rest/v1/rpc/' + rpc, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: 'Bearer ' + supabaseKey,
        'Content-Type': 'application/json',
        'X-Client-Info': 'elevate-media-productions'
      },
      body: JSON.stringify({ p_token: token }),
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) throw new Error('Subscription RPC failed: ' + res.status);
  } catch (cause) {
    console.error('Newsletter confirmation failed', cause);
    throw redirect(303, '/?subscribe=invalid');
  }
  throw redirect(303, action === 'unsubscribe' ? '/?subscribe=unsubscribed' : '/?subscribe=confirmed');
};
