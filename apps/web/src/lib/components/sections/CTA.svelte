<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import { ArrowUpRight } from 'lucide-svelte';
</script>

<section class="relative overflow-hidden bg-[#191d17] py-24 text-[#f3f2eb] md:py-32">
  <div class="pointer-events-none absolute -right-32 -top-48 h-[600px] w-[600px] rounded-full border border-white/10"></div>
  <div class="pointer-events-none absolute -right-12 -top-28 h-[360px] w-[360px] rounded-full border border-primary-300/30"></div>
  <div class="container-x relative">
    <Reveal>
      <div class="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div><p class="mb-6 text-[11px] font-bold uppercase tracking-[.24em] text-primary-300">Have a project in mind?</p><h2 class="max-w-4xl font-display text-5xl font-semibold leading-[.98] tracking-[-.065em] sm:text-6xl md:text-7xl">Let’s make<br/><span class="text-primary-300">something matter.</span></h2><p class="mt-7 max-w-xl text-base leading-7 text-white/65">Bring us the challenge. We’ll bring curiosity, craft and the technical experience to move it forward.</p></div>
        <a href="/contact" class="group inline-flex min-w-[190px] items-center justify-between gap-8 bg-primary-400 px-6 py-5 text-sm font-bold text-[#191d17] transition-colors hover:bg-[#f3f2eb]">Start a conversation <ArrowUpRight size={20} class="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></a>
      </div>
    </Reveal>
  </div>
</section>