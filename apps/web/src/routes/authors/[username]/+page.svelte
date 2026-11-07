<script lang="ts">
  import { ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-svelte';
  import { formatDate } from '$lib/utils';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const author = $derived(data.author);
  const posts = $derived(data.posts ?? []);
</script>

<svelte:head>
  <title>{author.full_name} — Elevate Media Authors</title>
  <meta name="description" content={author.bio || author.author_headline || 'Articles and insights from an Elevate Media contributor.'} />
  <link rel="canonical" href="https://elevatemediaproductions.cc/authors/{author.username}" />
</svelte:head>

<div class="pt-28 md:pt-36">
  <section class="section-padding">
    <div class="container-x mx-auto max-w-5xl">
      <a href="/blog" class="mb-10 inline-flex items-center gap-2 text-sm text-ink-light transition hover:text-primary-500 dark:text-slate-400">
        <ArrowLeft size={16} /> Back to newsroom
      </a>

      <div class="rounded-3xl border border-slate-200/70 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-night-lighter sm:p-10">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-center">
          {#if author.avatar_url}
            <img src={author.avatar_url} alt="" class="h-24 w-24 rounded-2xl object-cover" />
          {:else}
            <div class="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary-500/10 font-display text-3xl font-bold text-primary-500">{(author.full_name ?? 'A').slice(0, 1).toUpperCase()}</div>
          {/if}
          <div class="min-w-0">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-primary-500">Author profile</p>
            <h1 class="mt-2 font-display text-3xl font-bold text-ink dark:text-white">{author.full_name}</h1>
            {#if author.author_headline}<p class="mt-2 text-base text-ink-light dark:text-slate-300">{author.author_headline}</p>{/if}
            {#if author.bio}<p class="mt-3 max-w-2xl text-sm leading-7 text-ink-light dark:text-slate-400">{author.bio}</p>{/if}
            {#if author.expertise?.length}
              <div class="mt-4 flex flex-wrap gap-2">{#each author.expertise as item}<span class="rounded-full bg-primary-500/10 px-3 py-1 text-xs text-primary-600 dark:text-primary-300">{item}</span>{/each}</div>
            {/if}
            {#if author.website_url}
              <a href={author.website_url} target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-500">Personal website <ArrowUpRight size={13} /></a>
            {/if}
          </div>
        </div>
      </div>

      <div class="mt-12">
        <div class="mb-6 flex items-end justify-between">
          <div><p class="text-xs font-bold uppercase tracking-[0.2em] text-primary-500">By this author</p><h2 class="mt-2 font-display text-2xl font-bold text-ink dark:text-white">Published articles</h2></div>
          <span class="text-sm text-ink-light dark:text-slate-400">{posts.length} articles</span>
        </div>
        {#if posts.length}
          <div class="grid gap-5 md:grid-cols-2">
            {#each posts as post (post.id)}
              <a href="/blog/{post.slug}" class="glass group rounded-2xl p-6 transition hover:-translate-y-1">
                <div class="flex items-center gap-2 text-xs text-ink-light dark:text-slate-500"><BookOpen size={13} /> {post.category} · {post.reading_time} min read</div>
                <h3 class="mt-3 font-display text-xl font-bold text-ink group-hover:text-primary-500 dark:text-white">{post.title}</h3>
                <p class="mt-2 line-clamp-3 text-sm leading-6 text-ink-light dark:text-slate-400">{post.excerpt}</p>
                <time class="mt-5 block text-xs text-ink-light dark:text-slate-500">{formatDate(post.published_at)}</time>
              </a>
            {/each}
          </div>
        {:else}
          <p class="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-ink-light dark:border-white/10 dark:text-slate-400">No published articles yet.</p>
        {/if}
      </div>
    </div>
  </section>
</div>
