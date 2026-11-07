<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import { workflow } from '$lib/config';
</script>

<section class="section-padding bg-[#e9e9df] dark:bg-[#191d17]">
  <div class="container-x">
    <Reveal>
      <div class="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><p class="mb-4 text-[11px] font-bold uppercase tracking-[.22em] text-primary-700 dark:text-primary-300">Our approach / 04 steps</p><h2 class="font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] text-ink dark:text-white sm:text-6xl">Thoughtful from<br/>first sketch to launch.</h2></div>
        <p class="max-w-sm text-sm leading-7 text-ink-light dark:text-slate-400">A clear process keeps the work focused, decisions intentional and outcomes measurable.</p>
      </div>
    </Reveal>
    <div class="grid gap-0 border-y border-ink/20 dark:border-white/15 sm:grid-cols-2 lg:grid-cols-4">
      {#each workflow as step, i (step.step)}
        <Reveal>
          <div class="relative min-h-52 border-b border-ink/20 py-7 pr-7 dark:border-white/15 sm:border-r sm:px-6 sm:first:pl-0 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0">
            <p class="font-display text-5xl font-semibold tracking-[-.07em] text-primary-700 dark:text-primary-300">{step.step}</p>
            <h3 class="mt-8 font-display text-xl font-semibold tracking-tight text-ink dark:text-white">{step.title}</h3>
            <p class="mt-3 max-w-xs text-sm leading-6 text-ink-light dark:text-slate-400">{step.description}</p>
          </div>
        </Reveal>
      {/each}
    </div>
  </div>
</section>