import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

const FALLBACK_SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? '';

export const GET: RequestHandler = async ({ url: reqUrl, request }) => {
  const action = reqUrl.searchParams.get('action') ?? 'confirm';
  const token = reqUrl.searchParams.get('token') ?? '';

  const supabaseUrl = env.SUPABASE_URL || FALLBACK_SUPABASE_URL;
  const anonKey = env.SUPABASE_ANON_KEY ?? (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);

  if (!token || !supabaseUrl || !anonKey) {
    throw redirect(303, '/?subscribe=error');
  }

  const remoteAddr = request.headers.get('x-forwarded-for') ?? '';
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/rpc/${action}_subscription`, {
      method: 'POST',
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        'Content-Type': 'application/json',
        'X-Client-Info': 'elevate-media-productions',
        'X-Forwarded-For': remoteAddr
      },
      body: JSON.stringify({ token })
    });
    if (!res.ok) {
      throw redirect(303, '/?subscribe=invalid');
    }
  } catch {
    throw redirect(303, '/?subscribe=invalid');
  }

  if (action === 'unsubscribe') {
    throw redirect(303, '/?subscribe=unsubscribed');
  }
  throw redirect(303, '/?subscribe=confirmed');
};