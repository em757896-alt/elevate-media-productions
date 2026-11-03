<script lang="ts">
  import Icon from './Icon.svelte';
  import { site } from '$lib/config';

  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let text = true;

  const dims = {
    sm: { box: 'h-8 w-8', mark: 16, text: 'text-lg' },
    md: { box: 'h-10 w-10', mark: 20, text: 'text-xl' },
    lg: { box: 'h-12 w-12', mark: 24, text: 'text-2xl' }
  }[size];
</script>

<a href="/" class="group inline-flex items-center gap-2.5" aria-label="{site.shortName} home">
  <span class="{dims.box} relative inline-flex items-center justify-center rounded-sm border border-primary-400/40 bg-[#24242b] text-primary-400 shadow-[0_0_22px_-10px_rgba(217,54,64,.8)] transition-transform duration-300 group-hover:scale-105">
    <Icon name="rocket" size={dims.mark} />
  </span>
  {#if text}
    <span class="font-display {dims.text} font-semibold tracking-tight text-ink dark:text-white">
      Elevate<span class="text-primary-400"> Media</span>
    </span>
  {/if}
</a>