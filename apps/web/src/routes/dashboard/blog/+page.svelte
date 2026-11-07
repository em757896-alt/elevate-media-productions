<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowUpRight, BookOpen, Check, Eye, EyeOff, FileText, LoaderCircle, Pencil, Plus, RefreshCw, Save, Search, Send, Trash2, X } from 'lucide-svelte';
  import { supabase } from '$lib/supabase';
  import { session } from '$lib/stores/session';
  import { formatDate } from '$lib/utils';

  type EditorialPost = {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    cover_image: string | null;
    author_id: string | null;
    category: string;
    tags: string[];
    reading_time: number;
    published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
  };

  const categories = [
    'Artificial Intelligence', 'Web & Software', 'Cybersecurity',
    'Mobile & Devices', 'Business & Innovation', 'Science & Emerging Tech', 'Digital Culture'
  ];

  let posts = $state<EditorialPost[]>([]);
  let search = $state('');
  let loading = $state(true);
  let saving = $state(false);
  let errorMessage = $state('');
  let successMessage = $state('');
  let editorOpen = $state(false);
  let editingId = $state<string | null>(null);
  let form = $state({
    title: '', slug: '', excerpt: '', content: '', cover_image: '',
    category: categories[0], tags: '', published: false
  });

  const isAdmin = $derived($session.user?.role === 'admin');
  const filtered = $derived(posts.filter((post) => {
    const term = search.trim().toLowerCase();
    return !term || post.title.toLowerCase().includes(term) || post.category.toLowerCase().includes(term);
  }));
  const publishedCount = $derived(posts.filter((post) => post.published).length);
  const draftCount = $derived(posts.filter((post) => !post.published).length);

  onMount(() => { void loadPosts(); });

  async function loadPosts() {
    if (!supabase) {
      errorMessage = 'The publishing database is not configured for this site.';
      loading = false;
      return;
    }
    loading = true;
    const { data, error } = await supabase.from('posts').select('*').order('updated_at', { ascending: false });
    if (error) errorMessage = error.message;
    else posts = (data ?? []) as EditorialPost[];
    loading = false;
  }

  function slugify(value: string) {
    return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function openNew() {
    editingId = null;
    form = { title: '', slug: '', excerpt: '', content: '', cover_image: '', category: categories[0], tags: '', published: false };
    errorMessage = '';
    successMessage = '';
    editorOpen = true;
  }

  function openEdit(post: EditorialPost) {
    editingId = post.id;
    form = {
      title: post.title, slug: post.slug, excerpt: post.excerpt ?? '',
      content: post.content, cover_image: post.cover_image ?? '',
      category: post.category, tags: (post.tags ?? []).join(', '), published: post.published
    };
    errorMessage = '';
    successMessage = '';
    editorOpen = true;
  }

  async function savePost(event: SubmitEvent) {
    event.preventDefault();
    if (!supabase || !$session.user?.id) return;
    if (!isAdmin) {
      errorMessage = 'Only an administrator can publish or edit newsroom articles.';
      return;
    }
    if (!form.title.trim() || !form.content.trim()) {
      errorMessage = 'Add an article title and body before saving.';
      return;
    }
    saving = true;
    errorMessage = '';
    successMessage = '';
    const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length;
    const payload = {
      title: form.title.trim(),
      slug: slugify(form.slug || form.title),
      content: form.content.trim(),
      excerpt: form.excerpt.trim() || null,
      cover_image: form.cover_image.trim() || null,
      author_id: $session.user.id,
      category: form.category,
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      reading_time: Math.max(1, Math.ceil(wordCount / 220)),
      published: form.published,
      published_at: form.published
        ? (posts.find((post) => post.id === editingId)?.published_at ?? new Date().toISOString())
        : null,
      updated_at: new Date().toISOString()
    };

    const result = editingId
      ? await supabase.from('posts').update(payload).eq('id', editingId).select().single()
      : await supabase.from('posts').insert({ ...payload, created_at: new Date().toISOString() }).select().single();

    if (result.error) {
      errorMessage = result.error.message;
    } else {
      successMessage = payload.published ? 'Article published.' : 'Draft saved.';
      editorOpen = false;
      await loadPosts();
    }
    saving = false;
  }

  async function togglePublished(post: EditorialPost) {
    if (!supabase || !isAdmin) return;
    errorMessage = '';
    const next = !post.published;
    const { error } = await supabase.from('posts').update({
      published: next,
      published_at: next ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    }).eq('id', post.id);
    if (error) errorMessage = error.message;
    else await loadPosts();
  }

  async function deletePost(post: EditorialPost) {
    if (!supabase || !isAdmin || !confirm('Permanently delete this article?')) return;
    const { error } = await supabase.from('posts').delete().eq('id', post.id);
    if (error) errorMessage = error.message;
    else {
      successMessage = 'Article deleted.';
      await loadPosts();
    }
  }
</script>

<svelte:head>
  <title>Editorial Publishing — Elevate Media Workspace</title>
  <meta name="description" content="Create, edit and publish newsroom articles." />
</svelte:head>

<div class="space-y-7">
  <section class="relative overflow-hidden rounded-3xl bg-[#111b2b] p-6 text-white sm:p-8">
    <div class="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-rose-500/20 blur-3xl"></div>
    <div class="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-200">Editorial workspace</p>
        <h1 class="mt-3 font-display text-3xl font-bold">Newsroom publishing</h1>
        <p class="mt-2 max-w-xl text-sm leading-6 text-slate-300">Create real articles, save drafts and publish approved reporting to the public newsroom.</p>
      </div>
      {#if isAdmin}
        <button onclick={openNew} class="inline-flex w-fit items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"><Plus size={16} /> New article</button>
      {/if}
    </div>
  </section>

  {#if successMessage}
    <div class="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"><Check size={16} />{successMessage}</div>
  {/if}
  {#if errorMessage}
    <div role="alert" class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">{errorMessage}</div>
  {/if}

  <section class="grid gap-4 sm:grid-cols-3">
    <div class="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-[#101827]"><p class="text-xs font-semibold uppercase tracking-wider text-slate-400">All articles</p><p class="mt-3 font-display text-3xl font-bold">{posts.length}</p></div>
    <div class="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-[#101827]"><p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Published</p><p class="mt-3 font-display text-3xl font-bold text-emerald-600 dark:text-emerald-300">{publishedCount}</p></div>
    <div class="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-[#101827]"><p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Drafts</p><p class="mt-3 font-display text-3xl font-bold text-amber-600 dark:text-amber-300">{draftCount}</p></div>
  </section>

  <section class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#101827]">
    <div class="flex flex-col gap-3 border-b border-slate-100 p-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
      <div><h2 class="font-display text-lg font-bold">Article library</h2><p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Manage newsroom content stored in Supabase.</p></div>
      <div class="flex gap-2">
        <label class="relative flex-1 sm:w-64"><Search size={15} class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input bind:value={search} placeholder="Search articles" class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-rose-400 dark:border-white/10 dark:bg-white/5" /></label>
        <button aria-label="Refresh articles" onclick={loadPosts} class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5"><RefreshCw size={15} /></button>
      </div>
    </div>
    {#if loading}
      <div class="flex items-center justify-center gap-2 p-12 text-sm text-slate-500"><LoaderCircle size={18} class="animate-spin" /> Loading articles…</div>
    {:else if filtered.length}
      <div class="divide-y divide-slate-100 dark:divide-white/10">
        {#each filtered as post (post.id)}
          <article class="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <span class="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600 dark:bg-white/10 dark:text-slate-300">{post.category}</span>
                {#if post.published}<span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-300"><Eye size={12} /> Published</span>{:else}<span class="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-300"><EyeOff size={12} /> Draft</span>{/if}
              </div>
              <h3 class="mt-2 truncate text-sm font-semibold">{post.title}</h3>
              <p class="mt-1 text-xs text-slate-500">{post.slug} · {post.reading_time} min read · Updated {formatDate(post.updated_at)}</p>
            </div>
            <div class="flex shrink-0 items-center gap-2">
              {#if post.published}<a href="/blog/{post.slug}" target="_blank" rel="noopener noreferrer" aria-label="View public article" class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-rose-600 dark:border-white/10"><ArrowUpRight size={15} /></a>{/if}
              {#if isAdmin}
                <button onclick={() => openEdit(post)} aria-label="Edit article" class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-rose-300 hover:text-rose-600 dark:border-white/10"><Pencil size={15} /></button>
                <button onclick={() => togglePublished(post)} aria-label={post.published ? 'Unpublish article' : 'Publish article'} class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600 dark:border-white/10">{#if post.published}<EyeOff size={15} />{:else}<Send size={15} />{/if}</button>
                <button onclick={() => deletePost(post)} aria-label="Delete article" class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-rose-300 hover:text-rose-600 dark:border-white/10"><Trash2 size={15} /></button>
              {/if}
            </div>
          </article>
        {/each}
      </div>
    {:else}
      <div class="p-12 text-center"><FileText size={28} class="mx-auto text-slate-300" /><h3 class="mt-4 font-display font-bold">No articles found</h3><p class="mt-1 text-sm text-slate-500">Create your first newsroom article or adjust the search.</p></div>
    {/if}
  </section>
</div>

{#if editorOpen}
  <div class="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-slate-950/70 p-3 backdrop-blur-sm sm:p-6">
    <section role="dialog" aria-modal="true" aria-labelledby="editor-title" class="my-4 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#101827]">
      <div class="flex items-center justify-between border-b border-slate-100 p-5 dark:border-white/10 sm:p-6">
        <div><p class="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-600">Editorial desk</p><h2 id="editor-title" class="mt-1 font-display text-xl font-bold">{editingId ? 'Edit article' : 'Create article'}</h2></div>
        <button aria-label="Close editor" onclick={() => editorOpen = false} class="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"><X size={18} /></button>
      </div>
      <form onsubmit={savePost} class="space-y-5 p-5 sm:p-6">
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="block sm:col-span-2"><span class="mb-2 block text-xs font-semibold text-slate-500">Article title *</span><input bind:value={form.title} oninput={() => { if (!editingId || !form.slug) form.slug = slugify(form.title); }} required maxlength="180" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-rose-400 dark:border-white/10 dark:bg-white/5" placeholder="A clear, specific headline" /></label>
          <label class="block"><span class="mb-2 block text-xs font-semibold text-slate-500">URL slug</span><input bind:value={form.slug} required class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-rose-400 dark:border-white/10 dark:bg-white/5" /></label>
          <label class="block"><span class="mb-2 block text-xs font-semibold text-slate-500">Editorial category</span><select bind:value={form.category} class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-rose-400 dark:border-white/10 dark:bg-[#172235]">{#each categories as category}<option value={category}>{category}</option>{/each}</select></label>
          <label class="block sm:col-span-2"><span class="mb-2 block text-xs font-semibold text-slate-500">Standfirst / summary</span><textarea bind:value={form.excerpt} rows="2" maxlength="320" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-rose-400 dark:border-white/10 dark:bg-white/5" placeholder="What should readers understand from this story?" /></label>
          <label class="block sm:col-span-2"><span class="mb-2 block text-xs font-semibold text-slate-500">Cover image URL</span><input bind:value={form.cover_image} type="url" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-rose-400 dark:border-white/10 dark:bg-white/5" placeholder="https://…" /></label>
          <label class="block sm:col-span-2"><span class="mb-2 block text-xs font-semibold text-slate-500">Article body * (Markdown headings and paragraphs supported)</span><textarea bind:value={form.content} required rows="16" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm leading-6 outline-none focus:border-rose-400 dark:border-white/10 dark:bg-white/5" placeholder="# Opening section&#10;&#10;Write the article…&#10;&#10;## Next section" /></label>
          <label class="block sm:col-span-2"><span class="mb-2 block text-xs font-semibold text-slate-500">Tags (comma separated)</span><input bind:value={form.tags} class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-rose-400 dark:border-white/10 dark:bg-white/5" placeholder="AI, research, digital policy" /></label>
        </div>
        <label class="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-white/[0.04]"><input type="checkbox" bind:checked={form.published} class="h-4 w-4 accent-rose-600" /><span><span class="block text-sm font-semibold">Publish immediately</span><span class="mt-0.5 block text-xs text-slate-500">Leave unchecked to save as a private draft.</span></span></label>
        {#if errorMessage}<p role="alert" class="text-sm text-rose-600 dark:text-rose-300">{errorMessage}</p>{/if}
        <div class="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 dark:border-white/10 sm:flex-row sm:justify-end">
          <button type="button" onclick={() => editorOpen = false} class="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300">Cancel</button>
          <button type="submit" disabled={saving} class="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-60">{#if saving}<LoaderCircle size={16} class="animate-spin" /> Saving…{:else}<Save size={16} /> {form.published ? 'Publish article' : 'Save draft'}{/if}</button>
        </div>
      </form>
    </section>
  </div>
{/if}
