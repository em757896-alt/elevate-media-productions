<script lang="ts">
  import { ArrowLeft, ArrowUpRight, Users } from 'lucide-svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  const authors = $derived(data.authors ?? []);
</script>

<svelte:head>
  <title>Authors — Elevate Media Newsroom</title>
  <meta name="description" content="Meet the writers and contributors behind Elevate Media's technology newsroom." />
  <link rel="canonical" href="https://elevatemediaproductions.cc/authors" />
</svelte:head>

<div class="pt-28 md:pt-36">
  <section class="section-padding">
    <div class="container-x mx-auto max-w-6xl">
      <a href="/blog" class="inline-flex items-center gap-2 text-sm text-ink-light transition hover:text-primary-500 dark:text-slate-400"><ArrowLeft size={16} /> Back to newsroom</a>
      <div class="mt-10 max-w-3xl">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-primary-500">People behind the reporting</p>
        <h1 class="mt-3 font-display text-4xl font-bold text-ink dark:text-white sm:text-5xl">Our authors</h1>
        <p class="mt-4 text-base leading-8 text-ink-light dark:text-slate-400">Meet the writers and contributors sharing informed perspectives on technology and its impact across industries.</p>
      </div>
      {#if authors.length}
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {#each authors as author (author.id)}
            <a href="/authors/{author.username}" class="group rounded-2xl border border-slate-200/70 bg-white p-6 transition hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-lg dark:border-white/10 dark:bg-night-lighter">
              <div class="flex items-center gap-4">
                {#if author.avatar_url}<img src={author.avatar_url} alt="" class="h-14 w-14 rounded-xl object-cover" />{:else}<span class="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-500/10 font-display text-xl font-bold text-primary-600">{(author.full_name ?? 'A').slice(0, 1).toUpperCase()}</span>{/if}
                <div class="min-w-0"><h2 class="truncate font-display text-lg font-bold text-ink group-hover:text-primary-500 dark:text-white">{author.full_name}</h2><p class="mt-1 line-clamp-2 text-xs text-ink-light dark:text-slate-400">{author.author_headline ?? 'Editorial contributor'}</p></div>
              </div>
              {#if author.bio}<p class="mt-4 line-clamp-3 text-sm leading-6 text-ink-light dark:text-slate-400">{author.bio}</p>{/if}
              {#if author.expertise?.length}<div class="mt-4 flex flex-wrap gap-1.5">{#each author.expertise.slice(0, 3) as item}<span class="rounded-full bg-primary-500/10 px-2.5 py-1 text-[10px] text-primary-600 dark:text-primary-300">{item}</span>{/each}</div>{/if}
              <span class="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-primary-500">View profile <ArrowUpRight size={13} /></span>
            </a>
          {/each}
        </div>
      {:else}
        <div class="mt-12 rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center dark:border-white/15">
          <Users size={30} class="mx-auto text-slate-400" />
          <h2 class="mt-4 font-display text-xl font-bold text-ink dark:text-white">Author profiles are being prepared</h2>
          <p class="mx-auto mt-2 max-w-lg text-sm leading-6 text-ink-light dark:text-slate-400">Contributor profiles will appear here once writers complete their newsroom profiles.</p>
        </div>
      {/if}
    </div>
  </section>
</div>
