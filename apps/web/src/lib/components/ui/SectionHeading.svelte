<script lang="ts">
  import Reveal from './Reveal.svelte';
  export let badge: string = 'Explore';
  export let title: string;
  export let subtitle: string = '';
  export let center = false;
</script>
<Reveal class="mb-14 md:mb-20">
  <div class="flex flex-col gap-5 {center ? 'items-center text-center' : 'items-start'}">
    <p class="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.23em] text-primary-700 dark:text-primary-300"><span class="h-px w-8 bg-secondary-500"></span>{badge}</p>
    <h1 class="max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-[-.06em] text-ink dark:text-white sm:text-5xl md:text-6xl">{title}</h1>
    {#if subtitle}<p class="max-w-2xl text-base leading-7 text-ink-light dark:text-slate-400 md:text-lg">{subtitle}</p>{/if}
  </div>
</Reveal>