<script lang="ts">
  import { page } from '$app/state';
  import { fade } from 'svelte/transition';
  import { Menu, Moon, Sun, X } from 'lucide-svelte';
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

  const headerClass = $derived(`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'shadow-lg backdrop-blur-xl ' + ($theme === 'light' ? 'bg-fog/90' : 'bg-night/80') : ''}`);
</script>

<header class={headerClass}>
  <nav class="container-x flex h-16 items-center justify-between md:h-20" aria-label="Main">
    <Logo />
    <div class="hidden items-center gap-1 lg:flex">
      {#each nav.main as link (link.href)}
        <a href={link.href} class="group relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 {isActive(link.href) ? 'text-ink dark:text-white' : 'text-ink-light dark:text-slate-400 hover:text-ink dark:hover:text-white'}">
          {link.label}
          {#if isActive(link.href)}<span class="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"></span>{:else}<span class="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-transform duration-300 group-hover:scale-x-100"></span>{/if}
        </a>
      {/each}
    </div>
    <div class="flex items-center gap-2.5">
      <button class="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-light transition-colors hover:bg-ink/5 dark:text-slate-400 dark:hover:bg-white/5" onclick={toggleTheme} aria-label="Toggle theme">
        {#if $theme === 'dark'}<Moon size={18} />{:else}<Sun size={18} />{/if}
      </button>
      {#if $session.user}
        <a href="/dashboard" class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 text-sm font-bold text-white transition-transform hover:scale-105" aria-label="Go to dashboard">{($session.user.full_name ?? $session.user.username ?? 'U').slice(0, 1).toUpperCase()}</a>
      {/if}
      <a href="/contact" class="btn-gradient hidden !px-4 !py-2 !text-sm sm:inline-flex">Let’s talk</a>
      <button class="flex h-10 w-10 items-center justify-center rounded-lg text-ink-light dark:text-slate-300 lg:hidden" onclick={() => (mobileOpen = !mobileOpen)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
        {#if mobileOpen}<X size={22} />{:else}<Menu size={22} />{/if}
      </button>
    </div>
  </nav>
  {#if mobileOpen}
    <div class="glass-strong mx-4 mb-4 overflow-hidden rounded-2xl border lg:hidden" transition:fade={{ duration: 200 }}>
      <div class="flex flex-col p-4">
        {#each nav.main as link (link.href)}
          <a href={link.href} onclick={() => (mobileOpen = false)} class="rounded-xl px-4 py-3 text-sm font-medium transition-colors {isActive(link.href) ? 'bg-gradient-to-r from-primary-500/15 to-secondary-500/15 text-ink dark:text-white' : 'text-ink-light dark:text-slate-400 hover:bg-ink/5 dark:hover:bg-white/5'}">{link.label}</a>
        {/each}
        <a href="/contact" onclick={() => (mobileOpen = false)} class="btn-gradient mt-3 text-center">Start a project</a>
      </div>
    </div>
  {/if}
</header>