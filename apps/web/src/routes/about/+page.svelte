<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { site, team, stats } from '$lib/config';
</script>
<svelte:head><title>About — Elevate Media Productions</title><meta name="description" content="Meet Elevate Media Productions: an independent digital studio shaping useful products through strategy, design and engineering."/></svelte:head>
<div class="pt-28 md:pt-36">
  <section class="section-padding">
    <div class="container-x">
      <SectionHeading badge="The studio" title="Small team. Serious intent." subtitle="We partner with ambitious people to turn complex ideas into digital products that are clear, capable and built to last."/>
      <div class="grid gap-12 lg:grid-cols-[1fr_.85fr] lg:items-start">
        <Reveal><div class="border-l-2 border-primary-500 pl-7 md:pl-10"><p class="font-display text-3xl font-medium leading-[1.2] tracking-[-.045em] text-ink dark:text-white md:text-4xl">Technology should make the difficult feel simple. That belief shapes every product we design and build.</p><p class="mt-8 max-w-xl text-base leading-7 text-ink-light dark:text-slate-400">{site.name} works across web applications, Android products and the systems behind them. We care about the details people notice — and the engineering they never have to think about.</p></div></Reveal>
        <Reveal><div class="bg-[#191d17] p-8 text-[#f3f2eb] md:p-10"><p class="text-[11px] font-bold uppercase tracking-[.22em] text-primary-300">What guides us</p><div class="mt-8 space-y-7">{#each [{n:'01',t:'Clarity before complexity',d:'Understand the real problem before choosing the technology.'},{n:'02',t:'Craft in every detail',d:'Make the experience feel considered, from the first screen to the final interaction.'},{n:'03',t:'Build for real use',d:'Prioritise accessibility, performance, privacy and maintainability.'}] as item}<div class="grid grid-cols-[42px_1fr] gap-4 border-t border-white/15 pt-5"><span class="font-display text-sm text-primary-300">{item.n}</span><div><h3 class="font-display text-lg font-semibold">{item.t}</h3><p class="mt-2 text-sm leading-6 text-white/60">{item.d}</p></div></div>{/each}</div></div></Reveal>
      </div>
    </div>
  </section>
  <section class="section-padding bg-[#e9e9df] dark:bg-[#191d17]">
    <div class="container-x"><SectionHeading badge="People" title="The people behind the work" subtitle="A focused team bringing product thinking and engineering together."/>
      <div class="grid gap-8 md:grid-cols-2">{#each team as member}<Reveal><div class="flex flex-col gap-6 border-t border-ink/20 pt-7 dark:border-white/15 sm:flex-row"><div class="h-28 w-28 shrink-0 overflow-hidden bg-[#d5d6ca] dark:bg-[#292e24]">{#if member.name === 'Emmanuel Michael'}<img src="/founder.jpg" alt="Emmanuel Michael" class="h-full w-full object-cover"/>{:else}<span class="flex h-full items-center justify-center font-display text-3xl">{member.initials}</span>{/if}</div><div><p class="text-[10px] font-bold uppercase tracking-[.2em] text-primary-700 dark:text-primary-300">{member.role}</p><h3 class="mt-2 font-display text-2xl font-semibold text-ink dark:text-white">{member.name}</h3><p class="mt-3 max-w-md text-sm leading-6 text-ink-light dark:text-slate-400">{member.bio}</p>{#if member.name === 'Emmanuel Michael'}<a href="/about-me" class="mt-4 inline-flex text-sm font-semibold text-primary-700 hover:underline dark:text-primary-300">More about Emmanuel ↗</a>{/if}</div></div></Reveal>{/each}</div>
    </div>
  </section>
  <section class="section-padding"><div class="container-x"><SectionHeading badge="In practice" title="Built work, not just ideas" subtitle="A growing body of digital products across education, civic technology and personal finance."/><div class="grid grid-cols-2 gap-0 border-y border-ink/20 dark:border-white/15 md:grid-cols-4">{#each stats as stat}<div class="border-r border-ink/15 py-7 pr-5 last:border-0 dark:border-white/10"><p class="font-display text-4xl font-semibold tracking-[-.06em] text-ink dark:text-white">{stat.value}{#if stat.label === 'Products shipped'}+{/if}</p><p class="mt-2 text-xs uppercase tracking-[.14em] text-ink-light dark:text-slate-400">{stat.label}</p></div>{/each}</div></div></section>
</div>