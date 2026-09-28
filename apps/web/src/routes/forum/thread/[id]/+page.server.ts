import { loadThreadData } from '$lib/server/forum';
import { createReply } from '$lib/server/forum';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
  const { user } = await locals.safeGetSession();
  const { thread, replies, source } = await loadThreadData(locals.supabase, params.id);
  return {
    user: user ?? null,
    thread,
    replies,
    source,
    isConfigured: Boolean(locals.supabase)
  };
};

export const actions: Actions = {
  reply: async ({ request, locals, params }) => {
    const { user } = await locals.safeGetSession();
    if (!user) {
      return fail(401, { message: 'You must be signed in to reply.', ok: false });
    }
    if (!locals.supabase) {
      return fail(503, { message: 'Forum is not configured yet.', ok: false });
    }
    const fd = await request.formData();
    const content = String(fd.get('content') ?? '').trim();

    const result = await createReply(locals.supabase, user, params.id, content);
    if ('error' in result) {
      return fail(400, { message: result.error, ok: false });
    }
    return { message: 'Reply posted.', ok: true, replyId: result.id };
  }
};