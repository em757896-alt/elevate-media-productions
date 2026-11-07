import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.supabase) return { authors: [] };
  const { data } = await locals.supabase
    .from('profiles')
    .select('id,username,full_name,avatar_url,bio,author_headline,expertise')
    .eq('is_author', true)
    .order('full_name', { ascending: true });
  return { authors: data ?? [] };
};
