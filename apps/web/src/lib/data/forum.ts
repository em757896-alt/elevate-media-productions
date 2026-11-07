export const forumCategories: ForumCategory[] = [
  {
    id: '1',
    name: 'Announcements',
    slug: 'announcements',
    description: 'Official Elevate Media news, product launches and community updates.',
    icon: 'megaphone',
    color: '#6c5cf8',
    thread_count: 0,
    post_count: 0,
    order: 1
  },
  {
    id: '2',
    name: 'Projects & Portfolio',
    slug: 'projects-portfolio',
    description: 'Showcase your projects, request reviews or discover work from the community.',
    icon: 'rocket',
    color: '#8b5cf6',
    thread_count: 0,
    post_count: 0,
    order: 2
  },
  {
    id: '3',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Svelte, Next.js, React, TypeScript, CSS — all things building for the web.',
    icon: 'code',
    color: '#14b8a6',
    thread_count: 0,
    post_count: 0,
    order: 3
  },
  {
    id: '4',
    name: 'Mobile & Native',
    slug: 'mobile-native',
    description: 'Kotlin, Compose, React Native and everything that ships to a pocket.',
    icon: 'smartphone',
    color: '#8b5cf6',
    thread_count: 0,
    post_count: 0,
    order: 4
  },
  {
    id: '5',
    name: 'Backend & Databases',
    slug: 'backend-databases',
    description: 'Supabase, PostgreSQL, APIs, auth and serverless architecture.',
    icon: 'database',
    color: '#6d28d9',
    thread_count: 0,
    post_count: 0,
    order: 5
  },
  {
    id: '6',
    name: 'Show & Tell',
    slug: 'show-and-tell',
    description: 'Bragging rights section. Share screenshots, demos and wins.',
    icon: 'trophy',
    color: '#5340f2',
    thread_count: 0,
    post_count: 0,
    order: 6
  }
];

export const forumThreads: Array<
  Omit<ForumThread, 'slug'> & { author_name: string; category_name: string }
> = [];

const replies: Array<ForumReply & { author_name: string; author_role: string }> = [];

export function getForumCategories(): ForumCategory[] {
  return forumCategories;
}

export function getForumThreads(): typeof forumThreads {
  return forumThreads;
}

export function getThreadById(id: string) {
  return forumThreads.find((t) => t.id === id);
}

export { replies as forumReplies };