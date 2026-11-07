import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
  const db = locals.supabase;
  if (!db) throw error(404, 'Author not found');

  const { data: author } = await db
    .from('profiles')
    .select('id,username,full_name,avatar_url,bio,author_headline,expertise,website_url,social_links,is_author')
    .eq('username', params.username)
    .eq('is_author', true)
    .maybeSingle();

  if (!author) throw error(404, 'Author not found');

  const { data: posts } = await db
    .from('posts')
    .select('id,title,slug,excerpt,cover_image,category,tags,reading_time,published_at')
    .eq('author_id', author.id)
    .eq('published', true)
    .order('published_at', { ascending: false });

  return { author, posts: posts ?? [] };
};
