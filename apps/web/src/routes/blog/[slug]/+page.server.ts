import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
  const db = locals.supabase;
  if (!db) throw error(404, 'Article not found');

  const { data: post, error: postError } = await db
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .maybeSingle();

  if (postError || !post) throw error(404, 'Article not found');

  let author = null;
  if (post.author_id) {
    const { data } = await db
      .from('profiles')
      .select('*')
      .eq('id', post.author_id)
      .maybeSingle();
    author = data;
  }

  return { post, author };
};
