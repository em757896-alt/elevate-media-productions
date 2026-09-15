<script lang="ts">
  import { dev } from '$app/environment';
  import { onMount } from 'svelte';
  import '../app.css';

  let theme = $state<'dark' | 'light'>('dark');

  onMount(() => {
    const stored = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    theme = stored === 'light' || (!stored && prefersLight) ? 'light' : 'dark';
    apply(theme);
  });

  function apply(t: 'dark' | 'light') {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(t);
    localStorage.setItem('theme', t);
  }

  function toggle() {
    theme = theme === 'dark' ? 'light' : 'dark';
    apply(theme);
  }

  $effect(() => {
    if (dev) console.log('theme:', theme);
  });
</script>

<div class="min-h-dvh font-sans text-slate-200">
  {svelte:children}
  <button
    onclick={toggle}
    aria-label="Toggle theme"
    class="glass fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full text-lg"
  >
    {theme === 'dark' ? '☀️' : '🌙'}
  </button>
</div>