<script lang="ts">
  let { value, suffix = '', label = '' }: {
    value: number;
    suffix?: string;
    label?: string;
  } = $props();

  let display = $state(0);

  $effect(() => {
    if (typeof requestAnimationFrame === 'undefined') {
      display = value;
      return;
    }
    const duration = 800;
    const start = performance.now();
    const run = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      display = Math.round(value * t);
      if (t < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  });
</script>

<div class="glass group relative overflow-hidden rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/10 cursor-default">
  <span class="block font-display text-2xl font-bold tracking-tight text-ink dark:text-white sm:text-3xl">
    {display}{suffix}
  </span>
  {#if label}
    <span class="mt-1 block text-sm text-ink-light dark:text-slate-400">
      {label}
    </span>
  {/if}
</div>