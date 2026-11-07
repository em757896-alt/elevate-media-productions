<script lang="ts">
  import { page } from '$app/state';
  import {
    LayoutDashboard, FolderOpen, FileText, MessageCircle, MessagesSquare,
    Users, Settings, LogOut, ChevronLeft, Rocket, Menu, X, ArrowUpRight, Newspaper
  } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { session } from '$lib/stores/session';
  import { signOut, supabaseConfigured } from '$lib/supabase';

  let { children } = $props();
  let sidebarOpen = $state(true);
  let mobileMenuOpen = $state(false);

  const links = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Overview', exact: true },
    { href: '/dashboard/projects', icon: FolderOpen, label: 'Projects' },
    { href: '/dashboard/blog', icon: FileText, label: 'Articles' },
    { href: '/dashboard/editorial', icon: Newspaper, label: 'Editorial Desk' },
    { href: '/dashboard/forum', icon: MessageCircle, label: 'Discussions' },
    { href: '/dashboard/messages', icon: MessagesSquare, label: 'Messages' },
    { href: '/dashboard/users', icon: Users, label: 'Members' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' }
  ];

  function isActive(href: string, exact = false) {
    return exact ? page.url.pathname === href : page.url.pathname.startsWith(href);
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  $effect(() => {
    if (typeof window === 'undefined') return;
    if (!supabaseConfigured) {
      goto('/auth/login');
      return;
    }
    if ($session.loading) return;
    if (!$session.user) goto('/auth/login');
  });

  async function onSignOut() {
    await signOut();
    goto('/');
  }
</script>

<svelte:head>
  <meta name="theme-color" content="#101827" />
</svelte:head>

<div class="min-h-screen bg-[#f5f6f8] text-slate-900 dark:bg-[#0b1220] dark:text-slate-100">
  <aside
    class="fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-slate-200/80 bg-white dark:border-white/10 dark:bg-[#101827] md:flex"
    class:w-[76px]={!sidebarOpen}
    class:w-64={sidebarOpen}
  >
    <div class="flex h-[76px] items-center gap-3 border-b border-slate-200/80 px-5 dark:border-white/10">
      <a href="/dashboard" class="flex min-w-0 items-center gap-3">
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-600 to-orange-500 text-white shadow-lg shadow-rose-600/20">
          <Rocket size={19} />
        </span>
        {#if sidebarOpen}
          <span class="min-w-0">
            <span class="block truncate font-display text-sm font-bold tracking-wide">ELEVATE</span>
            <span class="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Workspace</span>
          </span>
        {/if}
      </a>
      <button aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'} onclick={() => sidebarOpen = !sidebarOpen}
        class="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white">
        <ChevronLeft size={16} class={!sidebarOpen ? 'rotate-180' : ''} />
      </button>
    </div>

    <div class="px-4 pb-2 pt-7">
      {#if sidebarOpen}
        <p class="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Workspace menu</p>
      {/if}
    </div>
    <nav aria-label="Dashboard navigation" class="flex-1 space-y-1 overflow-y-auto px-3 pb-5">
      {#each links as link (link.href)}
        <a href={link.href} title={!sidebarOpen ? link.label : undefined}
          class="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all
            {isActive(link.href, link.exact)
              ? 'bg-rose-50 text-rose-700 shadow-sm dark:bg-rose-500/10 dark:text-rose-300'
              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'}">
          <link.icon size={18} class="shrink-0" />
          {#if sidebarOpen}
            <span>{link.label}</span>
            {#if isActive(link.href, link.exact)}
              <span class="ml-auto h-1.5 w-1.5 rounded-full bg-rose-600 dark:bg-rose-400"></span>
            {/if}
          {/if}
        </a>
      {/each}
    </nav>

    <div class="border-t border-slate-200/80 p-3 dark:border-white/10">
      {#if $session.user}
        <div class="mb-2 flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-white/[0.04]">
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-rose-500">
            {($session.user.full_name ?? 'M').slice(0, 1).toUpperCase()}
          </span>
          {#if sidebarOpen}
            <span class="min-w-0">
              <span class="block truncate text-xs font-semibold text-slate-800 dark:text-white">{$session.user.full_name ?? 'Member'}</span>
              <span class="block text-[10px] text-slate-400">Workspace member</span>
            </span>
          {/if}
        </div>
      {/if}
      <button onclick={onSignOut} title={!sidebarOpen ? 'Sign out' : undefined}
        class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-rose-50 hover:text-rose-700 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-300">
        <LogOut size={18} />
        {#if sidebarOpen}<span>Sign out</span>{/if}
      </button>
    </div>
  </aside>

  <div class="md:hidden">
    <header class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#101827]/95">
      <a href="/dashboard" class="flex items-center gap-2.5">
        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-600 to-orange-500 text-white"><Rocket size={17} /></span>
        <span class="font-display text-sm font-bold tracking-wide">ELEVATE <span class="font-normal text-slate-400">/ Workspace</span></span>
      </a>
      <button aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'} onclick={() => mobileMenuOpen = !mobileMenuOpen}
        class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 dark:border-white/10 dark:text-slate-200">
        {#if mobileMenuOpen}<X size={19} />{:else}<Menu size={19} />{/if}
      </button>
    </header>
    {#if mobileMenuOpen}
      <nav aria-label="Mobile dashboard navigation" class="absolute inset-x-0 z-30 border-b border-slate-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-[#101827]">
        <div class="grid grid-cols-2 gap-2">
          {#each links as link (link.href)}
            <a href={link.href} onclick={closeMobileMenu}
              class="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium {isActive(link.href, link.exact) ? 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5'}">
              <link.icon size={17} />{link.label}
            </a>
          {/each}
          <button onclick={onSignOut} class="flex items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"><LogOut size={17} />Sign out</button>
        </div>
      </nav>
    {/if}
  </div>

  <main class="min-h-screen min-w-0 md:transition-[margin] md:duration-300 {sidebarOpen ? 'md:ml-64' : 'md:ml-[76px]'}">
    <header class="hidden h-[76px] items-center justify-between border-b border-slate-200/70 bg-white/80 px-8 backdrop-blur-xl dark:border-white/10 dark:bg-[#101827]/70 md:flex lg:px-10">
      <div>
        <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Elevate Media Productions</p>
        <p class="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">Member workspace</p>
      </div>
      <a href="/" class="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-rose-300 hover:text-rose-700 dark:border-white/10 dark:text-slate-300 dark:hover:text-rose-300">
        Visit website <ArrowUpRight size={14} />
      </a>
    </header>
    <div class="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 md:px-8 md:py-9 lg:px-10">
      {@render children()}
    </div>
  </main>
</div>
