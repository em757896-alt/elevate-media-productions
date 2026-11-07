export const forumCategories: ForumCategory[] = [
  {
    id: '1',
    name: 'Announcements',
    slug: 'announcements',
    description: 'Studio announcements, product releases and service updates.',
    icon: 'megaphone',
    color: '#71852d',
    thread_count: 0,
    post_count: 0,
    order: 1
  },
  {
    id: '2',
    name: 'Projects & Portfolio',
    slug: 'projects-portfolio',
    description: 'Selected product work, implementation notes and project showcases.',
    icon: 'rocket',
    color: '#e9785b',
    thread_count: 0,
    post_count: 0,
    order: 2
  },
  {
    id: '3',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Frontend engineering, accessible interfaces and modern web platforms.',
    icon: 'code',
    color: '#8db7ed',
    thread_count: 0,
    post_count: 0,
    order: 3
  },
  {
    id: '4',
    name: 'Mobile & Native',
    slug: 'mobile-native',
    description: 'Android, Kotlin, Jetpack Compose and mobile product engineering.',
    icon: 'smartphone',
    color: '#e9785b',
    thread_count: 0,
    post_count: 0,
    order: 4
  },
  {
    id: '5',
    name: 'Backend & Databases',
    slug: 'backend-databases',
    description: 'APIs, data architecture, identity and reliable infrastructure.',
    icon: 'database',
    color: '#71852d',
    thread_count: 0,
    post_count: 0,
    order: 5
  },
  {
    id: '6',
    name: 'Show & Tell',
    slug: 'show-and-tell',
    description: 'Product demonstrations, interface explorations and shipped work.',
    icon: 'trophy',
    color: '#e9785b',
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