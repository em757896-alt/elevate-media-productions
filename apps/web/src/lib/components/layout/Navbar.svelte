<script lang="ts">
  import { page } from '$app/state';
  import { fade } from 'svelte/transition';
  import { Menu, Moon, Sun, X, MessageCircle } from 'lucide-svelte';
  import Logo from '$lib/components/ui/Logo.svelte';
  import { nav } from '$lib/config';
  import { theme } from '$lib/stores/theme';
  import { session } from '$lib/stores/session';

  let scrolled = $state(false);
  let mobileOpen = $state(false);

  function isActive(href: string): boolean {
    if (href === '/') return page.url.pathname === '/';
    return page.url.pathname.startsWith(href);
  }
  function toggleTheme() { theme.set($theme === 'dark' ? 'light' : 'dark'); }
  function onScroll() { scrolled = window.scrollY > 24; }
  $effect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
  });

  const showAuth = $derived(isActive('/forum') || isActive('/blog'));
  const headerClass = $derived(`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'border-b border-white/10 bg-[#1b1a23]/90 shadow-none backdrop-blur-xl' : 'bg-transparent'}`);
</script>

<header class={headerClass}>
  <nav class="container-x flex h-[76px] items-center justify-between md:h-[88px]" aria-label="Main">
    <Logo size="lg" />
    <div class="hidden items-center gap-1 lg:flex">
      {#each nav.main as link (link.href)}
        <a href={link.href} class="px-3.5 py-2 text-[12px] font-medium uppercase tracking-[.12em] transition-colors {isActive(link.href) ? 'text-white' : 'text-white/60 hover:text-white'}">
          {link.label}
          {#if isActive(link.href)}<span class="ml-2 inline-block h-1 w-1 rounded-full bg-[#d93640] align-middle"></span>{/if}
        </a>
      {/each}
    </div>
    <div class="flex items-center gap-2.5">
      <button class="flex h-9 w-9 items-center justify-center text-white/65 transition-colors hover:text-white" onclick={toggleTheme} aria-label="Toggle theme">
        {#if $theme === 'dark'}<Moon size={18} />{:else}<Sun size={18} />{/if}
      </button>
      <a href="/forum" class="hidden items-center gap-2 px-3 py-2 text-xs font-medium uppercase tracking-[.1em] text-white/65 hover:text-white sm:flex">
        <MessageCircle size={15} /><span class="hidden md:inline">Community</span>
      </a>
      {#if $session.user}
        <a href="/dashboard" class="flex h-9 w-9 items-center justify-center rounded-full bg-[#c92e39] text-sm font-bold text-white" aria-label="Go to dashboard">
          {($session.user.full_name ?? $session.user.username ?? 'U').slice(0, 1).toUpperCase()}
        </a>
      {:else if showAuth}
        <a href="/auth/login" class="btn-gradient hidden !px-4 !py-2 !text-xs sm:inline-flex">Sign in</a>
      {/if}
      <button class="flex h-10 w-10 items-center justify-center text-white lg:hidden" onclick={() => (mobileOpen = !mobileOpen)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
        {#if mobileOpen}<X size={22} />{:else}<Menu size={22} />{/if}
      </button>
    </div>
  </nav>
  {#if mobileOpen}
    <div class="mx-4 mb-4 border border-white/10 bg-[#22212b] lg:hidden" transition:fade={{ duration: 200 }}>
      <div class="flex flex-col p-4">
        {#each nav.main as link (link.href)}
          <a href={link.href} onclick={() => (mobileOpen = false)} class="border-b border-white/10 px-3 py-3 text-xs font-medium uppercase tracking-[.12em] {isActive(link.href) ? 'text-white' : 'text-white/65'}">{link.label}</a>
        {/each}
        <div class="mt-3 flex gap-2">
          {#if $session.user}
            <a href="/dashboard" class="btn-gradient flex-1 !py-2.5" onclick={() => (mobileOpen = false)}>Dashboard</a>
          {:else if showAuth}
            <a href="/auth/login" class="btn-gradient flex-1 !py-2.5" onclick={() => (mobileOpen = false)}>Sign in</a>
            <a href="/auth/signup" class="btn-outline flex-1 !py-2.5" onclick={() => (mobileOpen = false)}>Join free</a>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</header>