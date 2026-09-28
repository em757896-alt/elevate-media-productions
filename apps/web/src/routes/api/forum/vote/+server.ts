import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { toggleVote } from '$lib/server/forum';

export const POST: RequestHandler = async ({ request, locals }) => {
  const { user } = await locals.safeGetSession();
  if (!user) throw error(401, 'You must be signed in to vote.');

  const supabase = locals.supabase;
  if (!supabase) throw error(503, 'Forum is not configured yet.');

  let payload: { thread_id?: unknown; reply_id?: unknown };
  try {
    payload = await request.json();
  } catch {
    throw error(400, 'Invalid request body.');
  }

  const result = await toggleVote(supabase, user, payload);
  if ('error' in result) {
    throw error(400, result.error);
  }
  return json({ ok: true, upvotes: result.upvotes });
};