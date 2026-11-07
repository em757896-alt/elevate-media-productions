<script lang="ts">
  import {
    ArrowRight, ArrowUpRight, BookOpen, FolderKanban, Layers3,
    Plus, Sparkles, Compass, Settings2, MessageSquareText
  } from 'lucide-svelte';
  import { projects } from '$lib/data/projects';
  import { getBlogPosts } from '$lib/data/blog';
  import { session } from '$lib/stores/session';

  const publishedPosts = getBlogPosts();
  const featuredProjects = [...projects].sort((a, b) => a.order - b.order).slice(0, 3);

  const shortcuts = [
    { href: '/dashboard/projects', label: 'Manage projects', detail: 'Update your portfolio', icon: FolderKanban },
    { href: '/dashboard/blog', label: 'Manage articles', detail: 'Write and publish stories', icon: BookOpen },
    { href: '/dashboard/forum', label: 'Open community', detail: 'Join the conversation', icon: MessageSquareText },
    { href: '/dashboard/settings', label: 'Workspace settings', detail: 'Manage your account', icon: Settings2 }
  ];
</script>

<svelte:head>
  <title>Workspace Overview — Elevate Media</title>
  <meta name="description" content="Your Elevate Media member workspace overview." />
</svelte:head>

<div class="space-y-8">
  <section class="relative isolate overflow-hidden rounded-[28px] bg-[#111b2b] px-6 py-8 text-white shadow-xl shadow-slate-900/10 sm:px-9 sm:py-10 lg:px-11">
    <div class="absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl"></div>
    <div class="absolute -bottom-28 right-1/3 -z-10 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl"></div>
    <div class="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
      <div class="max-w-2xl">
        <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-200">
          <Sparkles size={13} /> Your creative workspace
        </div>
        <h1 class="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[42px]">
          {#if $session.user?.full_name}
            Welcome back, {$session.user.full_name.split(' ')[0]}.
          {:else}
            Welcome to your workspace.
          {/if}
        </h1>
        <p class="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
          Your space to manage projects, publish ideas and connect with the Elevate Media community.
        </p>
      </div>
      <a href="/dashboard/projects" class="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-950/30 transition hover:-translate-y-0.5 hover:bg-rose-500">
        Explore workspace <ArrowRight size={16} />
      </a>
    </div>
    <div class="relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-xs text-slate-300">
      <span class="inline-flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-emerald-400"></span> Workspace available</span>
      <span class="text-slate-500">Elevate Media Productions</span>
    </div>
  </section>

  <section aria-label="Workspace summary" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <article class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101827]">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Portfolio projects</span>
        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300"><Layers3 size={19} /></span>
      </div>
      <p class="mt-4 font-display text-3xl font-bold tracking-tight">{projects.length}</p>
      <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Projects in the portfolio catalogue</p>
    </article>
    <article class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101827]">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Published articles</span>
        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300"><BookOpen size={19} /></span>
      </div>
      <p class="mt-4 font-display text-3xl font-bold tracking-tight">{publishedPosts.length}</p>
      <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Articles currently marked as published</p>
    </article>
    <article class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101827] sm:col-span-2 xl:col-span-1">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Account</span>
        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"><Compass size={19} /></span>
      </div>
      <p class="mt-4 font-display text-2xl font-bold tracking-tight">Signed in</p>
      <p class="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{$session.user?.full_name ?? 'Member account'}</p>
    </article>
  </section>

  <section class="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
    <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#101827]">
      <div class="flex items-center justify-between border-b border-slate-100 px-5 py-5 dark:border-white/10 sm:px-6">
        <div>
          <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-300">Your work</p>
          <h2 class="mt-1 font-display text-lg font-bold">Portfolio overview</h2>
        </div>
        <a href="/dashboard/projects" class="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-300">View all <ArrowUpRight size={14} /></a>
      </div>
      <div class="divide-y divide-slate-100 dark:divide-white/10">
        {#each featuredProjects as project (project.id)}
          <div class="flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50/80 dark:hover:bg-white/[0.03] sm:px-6">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-display text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-200">
              {project.title.slice(0, 2).toUpperCase()}
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-semibold">{project.title}</p>
              <p class="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{project.category} <span class="px-1 text-slate-300">/</span> {project.tech_tags.slice(0, 3).join(' · ')}</p>
            </div>
            <a href="/portfolio/{project.slug}" aria-label="View {project.title}" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-rose-300 hover:text-rose-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-rose-300"><ArrowUpRight size={16} /></a>
          </div>
        {/each}
      </div>
    </div>

    <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101827] sm:p-6">
      <div class="mb-5">
        <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-300">Quick access</p>
        <h2 class="mt-1 font-display text-lg font-bold">Where would you like to go?</h2>
      </div>
      <div class="space-y-2">
        {#each shortcuts as item (item.href)}
          <a href={item.href} class="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 transition hover:border-slate-200 hover:bg-slate-50 dark:hover:border-white/10 dark:hover:bg-white/[0.04]">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-rose-50 group-hover:text-rose-600 dark:bg-white/[0.06] dark:text-slate-300 dark:group-hover:bg-rose-500/10 dark:group-hover:text-rose-300"><item.icon size={18} /></span>
            <span class="min-w-0 flex-1">
              <span class="block text-sm font-semibold">{item.label}</span>
              <span class="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{item.detail}</span>
            </span>
            <ArrowUpRight size={15} class="text-slate-300 transition group-hover:text-rose-600 dark:group-hover:text-rose-300" />
          </a>
        {/each}
      </div>
      <div class="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-white/[0.04]">
        <div class="flex items-start gap-3">
          <span class="mt-0.5 text-rose-600 dark:text-rose-300"><Plus size={17} /></span>
          <div>
            <p class="text-xs font-semibold">Keep building</p>
            <p class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Add new work and share what you learn with the wider community.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
