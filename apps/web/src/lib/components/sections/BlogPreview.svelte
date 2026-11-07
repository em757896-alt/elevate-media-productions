<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { ArrowUpRight, Newspaper, Search, Sparkles } from 'lucide-svelte';
</script>

<section class="section-padding relative">
  <div class="container-x">
    <SectionHeading
      badge="Technology newsroom"
      title="Ideas shaping what comes next."
      subtitle="Coverage and practical insight across AI, software, cybersecurity, business, science and digital culture."
    />

    <Reveal>
      <div class="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-[#111b2b] px-7 py-9 text-white sm:px-10 sm:py-12">
        <div class="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-rose-500/15 blur-3xl"></div>
        <div class="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-200"><Newspaper size={15} /> Elevate Media Newsroom</div>
            <h3 class="mt-4 font-display text-2xl font-bold leading-tight sm:text-3xl">Technology is changing every industry. Understand the shifts.</h3>
            <p class="mt-3 text-sm leading-7 text-slate-300">Explore reporting, explainers and original perspectives. Every published story is managed through the editorial desk.</p>
          </div>
          <a href="/blog" class="inline-flex w-fit items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500">Explore newsroom <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </Reveal>
  </div>
</section>
