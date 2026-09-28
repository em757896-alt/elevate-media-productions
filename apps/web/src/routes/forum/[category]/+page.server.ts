import { loadForumData } from '$lib/server/forum';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
  const { user } = await locals.safeGetSession();
  const data = await loadForumData(locals.supabase);
  const category = data.categories.find((c) => c.slug === params.category) ?? null;
  const threads = data.threads.filter((t) => t.category_name === category?.name);
  return {
    user: user ?? null,
    category,
    threads,
    source: data.source
  };
};