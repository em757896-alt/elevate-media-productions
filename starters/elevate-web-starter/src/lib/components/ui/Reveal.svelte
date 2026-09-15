<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children, class: className = '', delay = 0 }: { children: Snippet; class?: string; delay?: number } = $props();
  let visible = $state(false);
  let el: HTMLElement | null = $state(null);

  $effect(() => {
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => (visible = true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<div
  bind:this={el}
  class="transition-all duration-700 ease-out {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} {className}"
>
  {@render children?.()}
</div>