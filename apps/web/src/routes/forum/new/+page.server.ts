import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createThread, loadForumData } from '$lib/server/forum';

export const load: PageServerLoad = async ({ locals, url }) => {
  const { user } = await locals.safeGetSession();
  if (!user) {
    const redirectTo = url.searchParams.get('redirect') ?? '/forum';
    throw redirect(302, `/auth/login?redirect=${encodeURIComponent(redirectTo)}`);
  }
  const data = await loadForumData(locals.supabase);
  return {
    user,
    categories: data.categories
  };
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const { user } = await locals.safeGetSession();
    if (!user) return fail(401, { error: 'You must be signed in to post.' });
    const supabase = locals.supabase;
    if (!supabase) return fail(503, { error: 'Forum is not configured yet.' });

    const fd = await request.formData();
    const result = await createThread(supabase, user, {
      title: String(fd.get('title') ?? ''),
      content: String(fd.get('content') ?? ''),
      category_id: String(fd.get('category_id') ?? '')
    });

    if ('error' in result) return fail(400, { error: result.error });
    throw redirect(303, `/forum/thread/${result.id}`);
  }
};