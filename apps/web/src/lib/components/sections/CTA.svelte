<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import { Rocket } from 'lucide-svelte';
</script>

<section class="section-padding relative overflow-hidden">
  <div class="absolute inset-0 -z-10 bg-grid opacity-40"></div>
  <div class="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[840px] rounded-full bg-primary-500/20 blur-[160px] pointer-events-none"></div>
  <div class="container-x relative">
    <Reveal>
      <div class="glass relative overflow-hidden rounded-3xl p-9 text-center sm:p-16 md:p-20">
        <div class="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-500/15 blur-3xl pointer-events-none"></div>
        <div class="relative flex flex-col items-center gap-6">
          <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-glow"><Rocket size={28} /></div>
          <h2 class="font-display text-3xl font-bold tracking-tight text-ink dark:text-white sm:text-4xl md:text-5xl">Have a good idea?<br class="hidden sm:block" /> Let’s make it real.</h2>
          <p class="max-w-xl text-ink-light dark:text-slate-400">Tell us what you want to build. We’ll help shape the right solution and a clear path to launch.</p>
          <a href="/contact" class="btn-gradient mt-3 px-8 py-3.5 text-base">Start a conversation <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </Reveal>
  </div>
</section>