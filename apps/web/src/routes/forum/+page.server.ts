import { loadForumData } from '$lib/server/forum';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { user } = await locals.safeGetSession();
  const data = await loadForumData(locals.supabase);
  return {
    user: user ?? null,
    categories: data.categories,
    threads: data.threads,
    source: data.source
  };
};