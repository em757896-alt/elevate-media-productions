export const blogPosts: Post[] = [];

export function getBlogPosts(): Post[] {
  return blogPosts.filter((post) => post.published);
}

export function getPostBySlug(slug: string): Post | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return getBlogPosts().slice(0, 2);
}