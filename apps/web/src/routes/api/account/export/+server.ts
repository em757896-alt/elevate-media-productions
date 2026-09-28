import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
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

  const dump: Record<string, unknown> = {
    exported_at: new Date().toISOString(),
    user: {
      id: user.id,
      email: user.email,
      created_at: user.created_at
    }
  };

  const fetches: Promise<void>[] = [];
  for (const [table, filter] of [
    ['profiles', { id: user.id }],
    ['forum_threads', { author_id: user.id }],
    ['forum_replies', { author_id: user.id }],
    ['forum_votes', { user_id: user.id }]
  ] as const) {
    fetches.push(
      (async () => {
        try {
          const { data } = await supabase.from(table).select('*').match(filter);
          dump[table] = data ?? [];
        } catch {
          dump[table] = 'could not fetch';
        }
      })()
    );
  }

  await Promise.all(fetches);
  return json(dump);
};