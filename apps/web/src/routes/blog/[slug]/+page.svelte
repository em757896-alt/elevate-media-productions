<script lang="ts">
  import { page } from '$app/state';
  import { ArrowLeft, ArrowUpRight, Clock, Tag, UserRound, BookOpen } from 'lucide-svelte';
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import { formatDate } from '$lib/utils';

  let { data } = $props();
  const post = $derived(data.post);
  const author = $derived(data.author);
  const canonical = $derived(post.canonical_url || 'https://elevatemediaproductions.cc/blog/' + post.slug);
</script>

<svelte:head>
  <title>{post.seo_title || post.title} — Elevate Media Newsroom</title>
  <meta name="description" content={post.seo_description || post.excerpt || post.title} />
  <link rel="canonical" href={canonical} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={post.seo_title || post.title} />
  <meta property="og:description" content={post.seo_description || post.excerpt || post.title} />
  <meta property="og:url" content={canonical} />
  {#if post.cover_image}<meta property="og:image" content={post.cover_image.startsWith('http') ? post.cover_image : 'https://elevatemediaproductions.cc' + post.cover_image} />{/if}
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="pt-28 md:pt-36">
  <section class="section-padding relative overflow-hidden">
    <div class="container-x relative mx-auto max-w-4xl">
      <Reveal>
        <a href="/blog" class="group mb-10 inline-flex items-center gap-2 text-sm text-ink-light transition-colors hover:text-primary-500 dark:text-slate-400">
          <ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" /> Back to newsroom
        </a>
      </Reveal>

      <Reveal>
        <div class="mb-6 flex flex-wrap items-center gap-3">
          <Badge>{post.category}</Badge>
          <span class="inline-flex items-center gap-1.5 text-xs text-ink-light dark:text-slate-500"><Clock size={13} /> {post.reading_time} min read</span>
          <span class="text-xs text-ink-light dark:text-slate-500">·</span>
          <time class="text-xs text-ink-light dark:text-slate-500">{formatDate(post.published_at ?? post.created_at)}</time>
        </div>
        <h1 class="max-w-4xl font-display text-3xl font-bold leading-tight tracking-tight text-ink dark:text-white sm:text-4xl md:text-5xl">{post.title}</h1>
        {#if post.excerpt}<p class="mt-5 max-w-3xl text-lg leading-8 text-ink-light dark:text-slate-400">{post.excerpt}</p>{/if}
        <div class="mt-7 flex flex-wrap items-center gap-3 border-y border-slate-200/70 py-4 dark:border-white/10">
          {#if author?.avatar_url}
            <img src={author.avatar_url} alt="" class="h-10 w-10 rounded-full object-cover" />
          {:else}
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/10 text-sm font-bold text-primary-600">{(author?.full_name ?? 'E').slice(0, 1).toUpperCase()}</span>
          {/if}
          <div class="min-w-0">
            {#if author?.username}
              <a href="/authors/{author.username}" class="text-sm font-semibold text-ink transition hover:text-primary-500 dark:text-white">{author.full_name ?? 'Editorial contributor'}</a>
            {:else}
              <p class="text-sm font-semibold text-ink dark:text-white">{author?.full_name ?? 'Elevate Editorial'}</p>
            {/if}
            <p class="text-xs text-ink-light dark:text-slate-500">{author?.author_headline ?? 'Elevate Media newsroom'}</p>
          </div>
          {#if author?.username}
            <a href="/authors/{author.username}" class="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-primary-500">Author profile <ArrowUpRight size={13} /></a>
          {/if}
        </div>
      </Reveal>

      {#if post.cover_image}
        <Reveal>
          <div class="mt-9 overflow-hidden rounded-2xl border border-slate-200/60 dark:border-white/10">
            <img src={post.cover_image} alt={post.title} width="1200" height="675" fetchpriority="high" class="max-h-[560px] w-full object-cover" />
          </div>
        </Reveal>
      {/if}

      <Reveal>
        <article class="prose-custom mt-10 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-night-lighter sm:p-9 md:p-11">
          {#each post.content.split('\n') as paragraph, index}
            {#if paragraph.startsWith('# ')}
              <h2 class="font-display text-2xl font-bold text-ink dark:text-white">{paragraph.replace('# ', '')}</h2>
            {:else if paragraph.startsWith('## ')}
              <h2 class="mt-8 mb-3 font-display text-xl font-bold text-ink dark:text-white">{paragraph.replace('## ', '')}</h2>
            {:else if paragraph.startsWith('### ')}
              <h3 class="mt-6 mb-2 font-display text-lg font-bold text-ink dark:text-white">{paragraph.replace('### ', '')}</h3>
            {:else if paragraph.startsWith('- ')}
              <ul><li class="text-ink-light dark:text-slate-300">{paragraph.replace('- ', '')}</li></ul>
            {:else if paragraph.trim() !== ''}
              <p class="my-4 text-ink-light dark:text-slate-300 leading-8">{paragraph}</p>
            {/if}
          {/each}
        </article>
      </Reveal>

      {#if post.source_urls?.length}
        <section class="mt-8 rounded-2xl border border-slate-200/70 p-6 dark:border-white/10">
          <h2 class="font-display text-sm font-bold text-ink dark:text-white">Sources & further reading</h2>
          <ul class="mt-3 space-y-2">
            {#each post.source_urls as source, index}
              <li><a href={source} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 break-all text-sm text-primary-500 hover:underline">Source {index + 1} <ArrowUpRight size={13} /></a></li>
            {/each}
          </ul>
        </section>
      {/if}

      <div class="mt-8 flex flex-wrap gap-2">
        {#each post.tags ?? [] as tag}
          <span class="inline-flex items-center gap-1.5 rounded-lg bg-ink/5 px-3 py-1.5 text-xs text-ink-light dark:bg-white/5 dark:text-slate-400"><Tag size={12} /> {tag}</span>
        {/each}
      </div>
      <div class="mt-12 border-t border-slate-200/70 pt-7 dark:border-white/10">
        <a href="/blog" class="inline-flex items-center gap-2 text-sm font-semibold text-primary-500"><BookOpen size={16} /> Explore more newsroom stories</a>
      </div>
    </div>
  </section>
</div>
