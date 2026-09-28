<script lang="ts">
  import { onMount } from 'svelte';
  import { loadTurnstile, renderTurnstile, isTurnstileConfigured } from '$lib/turnstile-client';

  let { token = $bindable('') } = $props();

  let container = $state<HTMLDivElement | null>(null);
  let widget: { reset: () => void; remove: () => void } | null = null;
  const configured = isTurnstileConfigured();

  onMount(() => {
    if (!configured) return;
    loadTurnstile()
      .then(() => {
        if (container) {
          widget = renderTurnstile(container, (t) => {
            token = t ?? '';
          });
        }
      })
      .catch(() => {});
    return () => widget?.remove();
  });

  function reset() {
    token = '';
    widget?.reset();
  }
</script>

{#if configured}
  <div bind:this={container} aria-hidden="true" class="mt-4 flex justify-center"></div>
{/if}