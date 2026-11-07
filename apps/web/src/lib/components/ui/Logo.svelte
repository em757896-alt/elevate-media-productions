<script lang="ts">
  import { site } from '$lib/config';

  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let text = true;

  const dims = {
    sm: { box: 'h-8 w-8', text: 'text-base', sub: 'text-[8px]' },
    md: { box: 'h-10 w-10', text: 'text-lg', sub: 'text-[9px]' },
    lg: { box: 'h-12 w-12', text: 'text-xl', sub: 'text-[10px]' }
  }[size];
</script>

<a href="/" class="group inline-flex items-center gap-3" aria-label="{site.shortName} home">
  <span class="{dims.box} relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-[#191d17] text-primary-300 transition-colors duration-300 group-hover:bg-primary-400 group-hover:text-[#191d17]">
    <span class="font-display text-[1.7rem] font-semibold leading-none tracking-[-.12em]">E</span>
    <span class="absolute bottom-[22%] right-[19%] h-[5px] w-[5px] bg-secondary-500 group-hover:bg-[#191d17]"></span>
  </span>
  {#if text}
    <span class="flex flex-col leading-none">
      <span class="font-display {dims.text} font-bold tracking-[.075em] text-ink dark:text-white">ELEVATE</span>
      <span class="{dims.sub} mt-1.5 font-semibold uppercase tracking-[.24em] text-ink-light dark:text-slate-400">Media Productions</span>
    </span>
  {/if}
</a>