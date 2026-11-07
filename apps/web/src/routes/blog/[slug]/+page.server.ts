import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
  const db = locals.supabase;
  if (!db) throw error(404, 'Article not found');

  const { data: post, error: postError } = await db
    .from('posts')
    .select('id,title,slug,content,excerpt,cover_image,author_id,category,category_id,tags,reading_time,published,published_at,created_at,updated_at,seo_title,seo_description,canonical_url,source_urls')
    .eq('slug', params.slug)
    .eq('published', true)
    .maybeSingle();

  if (postError || !post) throw error(404, 'Article not found');

  let author = null;
  if (post.author_id) {
    const { data } = await db
      .from('profiles')
      .select('id,username,full_name,avatar_url,bio,author_headline,expertise,is_author')
      .eq('id', post.author_id)
      .maybeSingle();
    author = data;
  }

  return { post, author };
};
