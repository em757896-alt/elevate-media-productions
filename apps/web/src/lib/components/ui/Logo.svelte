<script lang="ts">
  import { site } from '$lib/config';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let text = true;
  const height = { sm: 38, md: 48, lg: 58 }[size];
</script>
<a href="/" class="group inline-flex items-center gap-3" aria-label="{site.name} home">
  <svg width={height * 1.18} height={height} viewBox="0 0 118 100" fill="none" aria-hidden="true" class="shrink-0">
    <rect x="1" y="1" width="116" height="98" rx="5" fill="#191D17"/>
    <path d="M17 27H48M17 27V72H48M17 49H43" stroke="#F3F2EB" stroke-width="10" stroke-linecap="square"/>
    <path d="M51 72V27L76 53L101 27V72" stroke="#B8D957" stroke-width="10" stroke-linecap="square" stroke-linejoin="miter"/>
    <path d="M8 83C38 86 70 23 109 11" stroke="#F28A6D" stroke-width="3.5" stroke-linecap="round"/>
  </svg>
  {#if text}
    <span class="flex flex-col leading-none">
      <span class="font-display text-[1.05rem] font-bold tracking-[.13em] text-ink dark:text-white sm:text-xl">ELEVATE</span>
      <span class="mt-1.5 text-[9px] font-semibold uppercase tracking-[.25em] text-ink-light dark:text-slate-400 sm:text-[10px]">Media Productions</span>
    </span>
  {/if}
</a>