import type { SupabaseServerClient } from '$lib/server/supabase';
import { forumCategories as seedCategories, forumThreads as seedThreads, forumReplies as seedReplies } from '$lib/data/forum';
import type { User } from '@supabase/supabase-js';
import { slugify } from '$lib/utils';

export type ForumThreadView = ForumThread & {
  author_name: string;
  author_avatar: string | null;
  category_name: string;
};

export type ForumReplyView = ForumReply & {
  author_name: string;
  author_avatar: string | null;
};

export type ForumData = {
  source: 'db' | 'seed';
  categories: ForumCategory[];
  threads: ForumThreadView[];
};

function toThreadView(t: (typeof seedThreads)[number]): ForumThreadView {
  return {
    ...t,
    slug: t.id,
    author_avatar: t.author_avatar ?? null
  };
}

function toReplyView(r: (typeof seedReplies)[number]): ForumReplyView {
  return {
    ...r,
    author_avatar: null
  };
}

type DbThreadRow = {
  id: string;
  title: string;
  slug: string;
  content: string;
  author_id: string;
  category_id: string;
  pinned: boolean;
  locked: boolean;
  upvotes: number;
  reply_count: number;
  last_reply_at: string | null;
  created_at: string;
  updated_at: string;
  author: { full_name: string | null; username: string | null; avatar_url: string | null } | null;
  category: { name: string | null; slug: string | null; color: string | null; icon: string | null } | null;
};

type DbReplyRow = {
  id: string;
  content: string;
  thread_id: string;
  author_id: string;
  parent_id: string | null;
  upvotes: number;
  created_at: string;
  updated_at: string;
  author: { full_name: string | null; username: string | null; avatar_url: string | null } | null;
};

type DbCategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  color: string;
  thread_count: number;
  post_count: number;
  order: number;
};

function authorName(row: { author: { full_name: string | null; username: string | null } | null }): string {
  const a = row.author;
  if (a?.full_name) return a.full_name;
  if (a?.username) return a.username;
  return 'Member';
}

function mapThread(row: DbThreadRow): ForumThreadView {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    author_id: row.author_id,
    author_name: authorName(row),
    author_avatar: row.author?.avatar_url ?? null,
    category_id: row.category_id,
    category_name: row.category?.name ?? 'General',
    pinned: row.pinned,
    locked: row.locked,
    upvotes: row.upvotes,
    reply_count: row.reply_count,
    last_reply_at: row.last_reply_at,
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

function mapCategory(row: DbCategoryRow): ForumCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? '',
    icon: row.icon,
    color: row.color,
    thread_count: row.thread_count,
    post_count: row.post_count,
    order: row.order
  };
}

function isSeededFallbackError(error: { message?: string } | null): boolean {
  if (!error?.message) return false;
  const m = error.message.toUpperCase();
  return (
    m.includes('RELATION') ||
    m.includes('DOES NOT EXIST') ||
    m.includes('PERMISSION DENIED') ||
    m.includes('MUST APPEAR IN THE GROUP BY')
  );
}

export async function loadForumData(supabase: SupabaseServerClient | null): Promise<ForumData> {
  if (!supabase) {
    return { source: 'seed', categories: seedCategories, threads: seedThreads.map(toThreadView) };
  }

  try {
    const [catRes, threadRes] = await Promise.all([
      supabase.from('forum_categories').select('*').order('"order"', { ascending: true }),
      supabase
        .from('forum_threads')
        .select(
          'id,title,slug,content,author_id,category_id,pinned,locked,upvotes,reply_count,last_reply_at,created_at,updated_at,' +
            'author:profiles!author_id(full_name,username,avatar_url),' +
            'category:forum_categories!category_id(name,slug,color,icon)'
        )
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(80)
    ]);

    if (catRes.error || threadRes.error) {
      if (isSeededFallbackError(catRes.error) || isSeededFallbackError(threadRes.error)) {
        return { source: 'seed', categories: seedCategories, threads: seedThreads.map(toThreadView) };
      }
      throw (catRes.error ?? threadRes.error) as Error;
    }

    const categories = (catRes.data as unknown as DbCategoryRow[]).map(mapCategory);
    const threads = (threadRes.data as unknown as DbThreadRow[]).map(mapThread);

    if (threads.length === 0) return { source: 'seed', categories, threads: seedThreads.map(toThreadView) };

    return { source: 'db', categories, threads };
  } catch {
    return { source: 'seed', categories: seedCategories, threads: seedThreads.map(toThreadView) };
  }
}

export async function loadThreadData(
  supabase: SupabaseServerClient | null,
  id: string
): Promise<{ thread: ForumThreadView | null; replies: ForumReplyView[]; source: 'db' | 'seed' }> {
  if (!supabase) {
    const seed = seedThreads.find((t) => t.id === id);
    return {
      thread: seed ? toThreadView(seed) : null,
      replies: seedReplies.filter((r) => r.thread_id === id).map(toReplyView),
      source: 'seed'
    };
  }

  try {
    const threadRes = await supabase
      .from('forum_threads')
      .select(
        'id,title,slug,content,author_id,category_id,pinned,locked,upvotes,reply_count,last_reply_at,created_at,updated_at,' +
          'author:profiles!author_id(full_name,username,avatar_url),' +
          'category:forum_categories!category_id(name,slug,color,icon)'
      )
      .eq('id', id)
      .maybeSingle();

    if (threadRes.error) {
      if (isSeededFallbackError(threadRes.error)) {
        const seed = seedThreads.find((t) => t.id === id);
        return {
          thread: seed ? toThreadView(seed) : null,
          replies: seedReplies.filter((r) => r.thread_id === id).map(toReplyView),
          source: 'seed'
        };
      }
      throw threadRes.error;
    }

    if (!threadRes.data) return { thread: null, replies: [], source: 'db' };

    const replyRes = await supabase
      .from('forum_replies')
      .select('id,content,thread_id,author_id,parent_id,upvotes,created_at,updated_at,author:profiles!author_id(full_name,username,avatar_url)')
      .eq('thread_id', id)
      .order('created_at', { ascending: true });

    if (replyRes.error && !isSeededFallbackError(replyRes.error)) throw replyRes.error;

    const replies = replyRes.error
      ? []
      : (replyRes.data as unknown as DbReplyRow[]).map((r) => ({
          id: r.id,
          content: r.content,
          thread_id: r.thread_id,
          author_id: r.author_id,
          parent_id: r.parent_id,
          upvotes: r.upvotes,
          created_at: r.created_at,
          updated_at: r.updated_at,
          author_name: authorName(r),
          author_avatar: r.author?.avatar_url ?? null
        }));

    return { thread: mapThread(threadRes.data as unknown as DbThreadRow), replies, source: 'db' };
  } catch {
    const seed = seedThreads.find((t) => t.id === id);
    return {
      thread: seed ? toThreadView(seed) : null,
      replies: seedReplies.filter((r) => r.thread_id === id).map(toReplyView),
      source: 'seed'
    };
  }
}

export async function createThread(
  supabase: SupabaseServerClient,
  user: User,
  payload: { title?: unknown; content?: unknown; category_id?: unknown }
): Promise<{ id: string; slug: string } | { error: string }> {
  const title = typeof payload.title === 'string' ? payload.title.trim() : '';
  const content = typeof payload.content === 'string' ? payload.content.trim() : '';
  const category_id = typeof payload.category_id === 'string' ? payload.category_id.trim() : '';

  if (title.length < 4 || title.length > 120) return { error: 'Title must be between 4 and 120 characters.' };
  if (content.length < 10 || content.length > 20000) return { error: 'Your post must be between 10 and 20,000 characters.' };
  if (!category_id) return { error: 'Please choose a category.' };

  const { data: cat } = await supabase.from('forum_categories').select('id').eq('id', category_id).maybeSingle();
  if (!cat) return { error: 'That category does not exist.' };

  const baseSlug = slugify(title) || `thread-${Date.now()}`;
  const slug = `${baseSlug}-${Date.now().toString(36)}`;

  const { data, error } = await supabase
    .from('forum_threads')
    .insert({ title, content, category_id, author_id: user.id, slug })
    .select('id,slug')
    .single();

  if (error) return { error: error.message };
  if (!data?.id) return { error: 'Could not save thread.' };
  return { id: data.id, slug: data.slug };
}

export async function createReply(
  supabase: SupabaseServerClient,
  user: User,
  threadId: string,
  content: string
): Promise<{ id: string } | { error: string }> {
  const trimmed = content?.trim();
  if (!threadId) return { error: 'Missing thread id.' };
  if (typeof trimmed !== 'string' || trimmed.length < 1) return { error: 'Reply cannot be empty.' };
  if (trimmed.length > 4000) return { error: 'Reply is too long.' };

  const { data: thread } = await supabase.from('forum_threads').select('id,locked').eq('id', threadId).maybeSingle();
  if (!thread) return { error: 'Thread not found.' };
  if (thread.locked) return { error: 'This thread is locked.' };

  const { data, error } = await supabase
    .from('forum_replies')
    .insert({ thread_id: threadId, author_id: user.id, content: trimmed })
    .select('id')
    .single();
  if (error) return { error: error.message };
  if (!data?.id) return { error: 'Could not save reply.' };

  try {
    await supabase.rpc('touch_thread', { p_thread_id: threadId });
  } catch {
    // non-fatal: reply saved, counters refresh on next load
  }

  return { id: data.id };
}

export async function toggleVote(
  supabase: SupabaseServerClient,
  user: User,
  payload: { thread_id?: unknown; reply_id?: unknown }
): Promise<{ upvotes: number } | { error: string }> {
  const thread_id = typeof payload.thread_id === 'string' ? payload.thread_id.trim() : '';
  const reply_id = typeof payload.reply_id === 'string' ? payload.reply_id.trim() : '';
  if (!thread_id && !reply_id) return { error: 'Missing target.' };

  void user;
  const { data, error } = await supabase.rpc('toggle_forum_vote', {
    p_thread_id: thread_id || null,
    p_reply_id: reply_id || null
  });

  if (error) return { error: error.message };
  return { upvotes: Number(data ?? 0) };
}