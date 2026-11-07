<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
</script>

<section class="relative isolate overflow-hidden bg-fog pb-24 pt-32 dark:bg-night md:pb-32 md:pt-40">
  <div class="pointer-events-none absolute inset-0 -z-10 opacity-40" style="background-image:linear-gradient(to right,rgba(25,29,23,.055) 1px,transparent 1px),linear-gradient(to bottom,rgba(25,29,23,.055) 1px,transparent 1px);background-size:72px 72px"></div>
  <div class="pointer-events-none absolute -right-48 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-primary-300/20 blur-[130px]"></div>
  <div class="container-x grid items-center gap-16 lg:grid-cols-[1.08fr_.92fr]">
    <div class="max-w-3xl">
      <Reveal>
        <p class="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.24em] text-ink-light dark:text-slate-400"><span class="h-px w-9 bg-primary-500"></span> Independent digital production studio · Est. 2026</p>
      </Reveal>
      <Reveal>
        <h1 class="font-display text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[.91] tracking-[-.075em] text-ink dark:text-white">
          We make<br/>digital <span class="relative inline-block text-primary-700 dark:text-primary-300">matter<span class="absolute -bottom-1 left-0 h-[.12em] w-full bg-secondary-500"></span></span>.
        </h1>
      </Reveal>
      <Reveal>
        <p class="mt-9 max-w-xl text-lg leading-8 text-ink-light dark:text-slate-300 md:text-xl">
          Strategy, design and engineering for ambitious digital products. We turn complex ideas into clear, useful experiences people love to use.
        </p>
      </Reveal>
      <Reveal>
        <div class="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="/portfolio" class="btn-gradient px-7 py-4 text-sm">Explore selected work <span aria-hidden="true">↗</span></a>
          <a href="/contact" class="inline-flex items-center gap-2 px-3 py-4 text-sm font-semibold text-ink transition-colors hover:text-primary-700 dark:text-white dark:hover:text-primary-300">Start a project <span aria-hidden="true">→</span></a>
        </div>
      </Reveal>
      <Reveal>
        <div class="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/15 pt-5 text-[11px] font-semibold uppercase tracking-[.16em] text-ink-light dark:border-white/15 dark:text-slate-400">
          <span>Digital strategy</span><span>Product design</span><span>Engineering</span>
        </div>
      </Reveal>
    </div>

    <Reveal>
      <div class="relative mx-auto w-full max-w-[560px]">
        <div class="relative aspect-[.92] overflow-hidden bg-[#191d17] p-7 text-[#f3f2eb] shadow-2xl shadow-black/15 sm:p-10">
          <div class="absolute inset-0 opacity-25" style="background-image:linear-gradient(rgba(243,242,235,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(243,242,235,.15) 1px,transparent 1px);background-size:44px 44px"></div>
          <div class="relative flex h-full flex-col justify-between">
            <div class="flex items-center justify-between border-b border-white/20 pb-4 text-[10px] font-semibold uppercase tracking-[.22em] text-white/60"><span>Elevate / Studio</span><span>01 — 03</span></div>
            <div class="relative py-10">
              <div class="absolute right-0 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full border border-primary-300/70 sm:h-56 sm:w-56"></div>
              <div class="absolute right-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-primary-400 sm:right-12 sm:h-40 sm:w-40"></div>
              <div class="absolute right-16 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-secondary-500 sm:right-20 sm:h-20 sm:w-20"></div>
              <p class="relative z-10 max-w-[75%] font-display text-5xl font-semibold leading-[.95] tracking-[-.07em] sm:text-6xl">Ideas<br/>with<br/><span class="text-primary-300">intent.</span></p>
            </div>
            <div class="flex items-end justify-between gap-5 border-t border-white/20 pt-4">
              <p class="max-w-[220px] text-xs leading-5 text-white/65">We bring clarity to the boldest ideas — then build what comes next.</p>
              <span class="font-display text-3xl font-semibold tracking-[-.06em] text-primary-300">EM<span class="text-secondary-500">.</span></span>
            </div>
          </div>
        </div>
        <div class="absolute -bottom-5 -left-5 bg-primary-400 px-5 py-4 text-xs font-bold uppercase tracking-[.13em] text-[#191d17] shadow-xl">Built for what’s next ↗</div>
      </div>
    </Reveal>
  </div>
</section>