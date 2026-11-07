<script lang="ts">
  import { ArrowUpRight } from 'lucide-svelte';
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import { services } from '$lib/config';
</script>

<section class="section-padding bg-fog dark:bg-night">
  <div class="container-x">
    <Reveal>
      <div class="grid gap-8 border-b border-ink/20 pb-10 dark:border-white/15 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <p class="text-[11px] font-bold uppercase tracking-[.22em] text-primary-700 dark:text-primary-300">What we do / Capabilities</p>
        <div><h2 class="font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] text-ink dark:text-white sm:text-6xl">Good ideas need<br/>great execution.</h2><p class="mt-5 max-w-xl text-base leading-7 text-ink-light dark:text-slate-400">One focused team across the full product journey — from the first hard question to the final detail.</p></div>
      </div>
    </Reveal>
    <div class="mt-5 grid gap-x-12 md:grid-cols-2">
      {#each services as service, i (service.title)}
        <Reveal>
          <a href="/services" class="group grid grid-cols-[48px_1fr_24px] gap-4 border-b border-ink/15 py-7 dark:border-white/15">
            <span class="pt-1 font-display text-sm font-semibold text-primary-700 dark:text-primary-300">{String(i+1).padStart(2,'0')}</span>
            <div><h3 class="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-300 sm:text-2xl">{service.title}</h3><p class="mt-2 max-w-md text-sm leading-6 text-ink-light dark:text-slate-400">{service.description}</p><div class="mt-4 flex flex-wrap gap-x-4 gap-y-2">{#each service.features.slice(0,3) as feature}<span class="text-[10px] font-semibold uppercase tracking-[.12em] text-ink-light/80 dark:text-slate-500">{feature}</span>{/each}</div></div>
            <ArrowUpRight size={19} class="mt-1 text-ink/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-700 dark:text-white/40 dark:group-hover:text-primary-300"/>
          </a>
        </Reveal>
      {/each}
    </div>
  </div>
</section>