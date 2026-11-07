<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { skills } from '$lib/config';
</script>
<svelte:head><title>Capabilities — Elevate Media Productions</title><meta name="description" content="The engineering disciplines and technologies behind Elevate Media Productions."/></svelte:head>
<div class="pt-28 md:pt-36">
  <section class="section-padding"><div class="container-x"><SectionHeading badge="Engineering capabilities" title="The tools behind the work." subtitle="We choose technology to suit the product — not the other way around. These are the platforms and disciplines we work with."/>
    <div class="grid gap-x-12 md:grid-cols-2">{#each skills as group,i}<Reveal><article class="border-t border-ink/20 py-8 dark:border-white/15"><div class="flex items-baseline justify-between"><h2 class="font-display text-2xl font-semibold tracking-[-.04em] text-ink dark:text-white">{group.category}</h2><span class="font-display text-sm text-primary-700 dark:text-primary-300">0{i+1}</span></div><div class="mt-6 flex flex-wrap gap-2">{#each group.items as skill}<span class="border border-ink/15 px-3 py-2 text-xs font-medium text-ink-light dark:border-white/15 dark:text-slate-300">{skill.name}</span>{/each}</div></article></Reveal>{/each}</div>
    <Reveal><div class="mt-12 border-t border-ink/20 pt-8 dark:border-white/15"><p class="max-w-2xl text-sm leading-7 text-ink-light dark:text-slate-400">The final stack is selected around the product’s requirements: performance, security, maintainability, accessibility and the people who will use it.</p><a href="/contact" class="mt-6 inline-flex items-center gap-3 bg-[#191d17] px-6 py-4 text-sm font-semibold text-[#f3f2eb] transition-colors hover:bg-primary-600">Discuss a project <span aria-hidden="true">↗</span></a></div></Reveal>
  </div></section>
</div>