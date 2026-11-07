import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const db = locals.supabase;
  if (!db) return { posts: [], categories: [] };

  const { data: rows, error } = await db
    .from('posts')
    .select('id,title,slug,content,excerpt,cover_image,author_id,category,category_id,tags,reading_time,published,published_at,created_at,updated_at,seo_title,seo_description,canonical_url,source_urls')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error || !rows) return { posts: [], categories: [] };

  const authorIds = [...new Set(rows.map((post) => post.author_id).filter(Boolean))];
  const { data: authors } = authorIds.length
    ? await db.from('profiles').select('id,username,full_name,avatar_url,bio,author_headline,expertise,is_author').in('id', authorIds)
    : { data: [] };

  let categories: { id: string; name: string; slug: string; description: string }[] = [];
  const { data: categoryRows } = await db
    .from('editorial_categories')
    .select('id,name,slug,description')
    .order('sort_order', { ascending: true });
  if (categoryRows?.length) {
    categories = categoryRows;
  } else {
    categories = [...new Set(rows.map((post) => post.category).filter(Boolean))]
      .map((name) => ({ id: name, name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), description: '' }));
  }

  const authorMap = new Map((authors ?? []).map((author) => [author.id, author]));
  const posts = rows.map((post) => ({
    ...post,
    author: post.author_id ? authorMap.get(post.author_id) ?? null : null
  }));

  return { posts, categories };
};
