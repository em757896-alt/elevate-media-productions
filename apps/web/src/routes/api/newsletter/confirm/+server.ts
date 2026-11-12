import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { database } from '$lib/server/neon';

async function tokenHash(token: string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('');
}

export const GET: RequestHandler = async ({ url }) => {
  const token = (url.searchParams.get('token') ?? '').trim();
  const action = url.searchParams.get('action') ?? 'confirm';
  if (!token || token.length > 100 || !['confirm', 'unsubscribe'].includes(action)) {
    throw redirect(303, '/?subscribe=error');
  }
  try {
    const hashed = await tokenHash(token);
    const rows = action === 'unsubscribe'
      ? await database()`UPDATE newsletter_subscribers SET unsubscribed_at=now(), confirmation_token_hash=NULL
          WHERE confirmation_token_hash=${hashed} RETURNING id`
      : await database()`UPDATE newsletter_subscribers SET verified_at=COALESCE(verified_at,now()), confirmation_token_hash=NULL
          WHERE confirmation_token_hash=${hashed} AND unsubscribed_at IS NULL RETURNING id`;
    if (!rows.length) throw new Error('Invalid or expired subscription token');
  } catch (cause) {
    console.error('Newsletter confirmation failed:', cause);
    throw redirect(303, '/?subscribe=invalid');
  }
  throw redirect(303, action === 'unsubscribe' ? '/?subscribe=unsubscribed' : '/?subscribe=confirmed');
};
