<script lang="ts">
  import { ArrowRight, ArrowUpRight, Search, Newspaper, Clock } from 'lucide-svelte';
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { formatDate } from '$lib/utils';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const posts = $derived(data.posts ?? []);
  const categories = $derived(data.categories ?? []);
  let search = $state('');
  let activeCategory = $state('All');

  const filtered = $derived(posts.filter((post: any) => {
    const term = search.trim().toLowerCase();
    const matchesSearch = !term ||
      post.title.toLowerCase().includes(term) ||
      (post.excerpt ?? '').toLowerCase().includes(term) ||
      (post.category ?? '').toLowerCase().includes(term) ||
      (post.tags ?? []).some((tag: string) => tag.toLowerCase().includes(term));
    return matchesSearch && (activeCategory === 'All' || post.category === activeCategory);
  }));
</script>

<svelte:head>
  <title>Technology Newsroom — Elevate Media Productions</title>
  <meta name="description" content="A technology newsroom covering artificial intelligence, software, cybersecurity, mobile, digital business and emerging technology." />
  <link rel="canonical" href="https://elevatemediaproductions.cc/blog" />
  <meta property="og:title" content="Technology Newsroom — Elevate Media Productions" />
  <meta property="og:description" content="Technology reporting, useful analysis and practical guides from across the digital world." />
  <meta property="og:type" content="website" />
</svelte:head>

<div class="pt-28 md:pt-36">
  <section class="section-padding relative overflow-hidden">
    <div class="pointer-events-none absolute -top-36 right-0 h-[460px] w-[600px] rounded-full bg-primary-500/10 blur-[150px]"></div>
    <div class="container-x relative">
      <div class="mb-10 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">
        <Newspaper size={15} /> Elevate Media / Newsroom
      </div>
      <div class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p class="text-sm font-semibold text-primary-500">Technology, clearly explained.</p>
          <h1 class="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink dark:text-white sm:text-5xl lg:text-6xl">The ideas shaping what comes next.</h1>
        </div>
        <p class="max-w-xl text-base leading-8 text-ink-light dark:text-slate-400">Independent technology coverage, practical explainers and considered perspectives on the tools changing how people live and work — across every industry.</p>
      </div>

      <div class="mt-12 border-y border-slate-200/70 py-5 dark:border-white/10">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex flex-wrap gap-2">
            <button onclick={() => activeCategory = 'All'} class="rounded-full px-4 py-2 text-xs font-semibold transition {activeCategory === 'All' ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'bg-ink/5 text-ink-light hover:bg-ink/10 dark:bg-white/5 dark:text-slate-300'}">All coverage</button>
            {#each categories as category (category.id)}
              <button onclick={() => activeCategory = category.name} class="rounded-full px-4 py-2 text-xs font-semibold transition {activeCategory === category.name ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'bg-ink/5 text-ink-light hover:bg-ink/10 dark:bg-white/5 dark:text-slate-300'}">{category.name}</button>
            {/each}
          </div>
          <div class="relative w-full lg:max-w-xs">
            <Search size={16} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-light dark:text-slate-500" />
            <input type="search" bind:value={search} placeholder="Search the newsroom" aria-label="Search articles" class="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-night-lighter dark:text-white" />
          </div>
        </div>
      </div>

      {#if filtered.length}
        <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {#each filtered as post, i (post.id)}
            <Reveal>
              <a href="/blog/{post.slug}" class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white transition duration-300 hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-night-lighter dark:hover:shadow-black/20">
                <div class="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-white/5 dark:to-white/10">
                  {#if post.cover_image}
                    <img src={post.cover_image} alt={post.title} loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  {:else}
                    <div class="flex h-full items-center justify-center font-display text-5xl font-bold text-slate-300 dark:text-white/10">EM</div>
                  {/if}
                  <span class="absolute left-4 top-4 rounded-full bg-[#111b2b]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">{post.category}</span>
                </div>
                <div class="flex flex-1 flex-col p-6">
                  <div class="flex items-center gap-2 text-[11px] text-ink-light dark:text-slate-500">
                    <time>{formatDate(post.published_at ?? post.created_at)}</time><span>·</span><Clock size={12} /><span>{post.reading_time} min read</span>
                  </div>
                  <h2 class="mt-3 font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-primary-500 dark:text-white">{post.title}</h2>
                  <p class="mt-3 line-clamp-3 text-sm leading-6 text-ink-light dark:text-slate-400">{post.excerpt}</p>
                  <div class="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-white/10">
                    <div class="flex min-w-0 items-center gap-2">
                      {#if post.author?.avatar_url}
                        <img src={post.author.avatar_url} alt="" class="h-7 w-7 rounded-full object-cover" />
                      {:else}
                        <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500/10 text-[10px] font-bold text-primary-600">{(post.author?.full_name ?? 'E').slice(0, 1).toUpperCase()}</span>
                      {/if}
                      <span class="truncate text-xs font-medium text-ink-light dark:text-slate-400">{post.author?.full_name ?? 'Elevate Editorial'}</span>
                    </div>
                    <span class="flex shrink-0 items-center gap-1 text-xs font-semibold text-primary-500">Read <ArrowUpRight size={14} /></span>
                  </div>
                </div>
              </a>
            </Reveal>
          {/each}
        </div>
      {:else}
        <div class="mt-12 rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-white/15">
          <Newspaper size={30} class="mx-auto text-slate-400" />
          <h2 class="mt-4 font-display text-xl font-bold text-ink dark:text-white">{posts.length ? 'No matching stories' : 'The newsroom is preparing its first edition'}</h2>
          <p class="mx-auto mt-2 max-w-lg text-sm leading-6 text-ink-light dark:text-slate-400">{posts.length ? 'Try another search or choose a different editorial category.' : 'Published reporting and practical guides will appear here once the editorial team releases them. We will not fill this space with placeholder stories.'}</p>
          {#if posts.length}
            <button onclick={() => { search = ''; activeCategory = 'All'; }} class="mt-5 text-sm font-semibold text-primary-500">Clear filters</button>
          {/if}
        </div>
      {/if}
      <div class="mt-14 flex items-center justify-between border-t border-slate-200/70 pt-6 text-xs text-ink-light dark:border-white/10 dark:text-slate-500">
        <span>Reporting, research and practical insight.</span>
        <a href="/dashboard/blog" class="inline-flex items-center gap-1 font-semibold text-primary-500">Editorial workspace <ArrowRight size={14} /></a>
      </div>
    </div>
  </section>
</div>
