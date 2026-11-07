<script lang="ts">
  import { site } from '$lib/config';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let text = true;
  const widths = { sm: 104, md: 142, lg: 172 }[size];
</script>
<a href="/" class="group inline-flex items-center" aria-label="{site.name} home">
  <img src="/brand-logo.svg" alt={site.name} width={widths} height={Math.round(widths * 676 / 1240)} class="h-auto w-auto max-w-full object-contain transition-opacity duration-300 group-hover:opacity-75" style="width:{widths}px" />
</a>