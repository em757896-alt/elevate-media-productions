<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
</script>

<section class="relative isolate overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40">
  <div class="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40"></div>
  <div class="pointer-events-none absolute -right-40 top-0 -z-10 h-[520px] w-[520px] rounded-full bg-primary-500/15 blur-[150px]"></div>
  <div class="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-secondary-500/15 blur-[140px]"></div>

  <div class="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
    <div class="max-w-2xl">
      <Reveal>
        <div class="mb-7 inline-flex items-center gap-2 rounded-full border border-primary-500/25 bg-primary-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-300">
          <span class="h-2 w-2 rounded-full bg-primary-500"></span>
          Independent digital product studio
        </div>
      </Reveal>
      <Reveal>
        <h1 class="font-display text-5xl font-bold leading-[1.04] tracking-tight text-ink dark:text-white sm:text-6xl lg:text-7xl">
          Make your next
          <span class="text-gradient block">big idea</span>
          work beautifully.
        </h1>
      </Reveal>
      <Reveal>
        <p class="mt-7 max-w-xl text-lg leading-8 text-ink-light dark:text-slate-400 md:text-xl">
          We design and engineer thoughtful digital products — from high-performing websites to powerful web and mobile applications.
        </p>
      </Reveal>
      <Reveal>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="/portfolio" class="btn-gradient px-8 py-4 text-base">Explore our work <span aria-hidden="true">↗</span></a>
          <a href="/contact" class="btn-outline px-8 py-4 text-base !text-ink dark:!text-slate-200">Tell us what you’re building</a>
        </div>
      </Reveal>
      <Reveal>
        <div class="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-slate-200/70 pt-6 text-sm text-ink-light dark:border-white/10 dark:text-slate-400">
          <span>Web applications</span><span>Mobile products</span><span>Product engineering</span>
        </div>
      </Reveal>
    </div>

    <Reveal>
      <div class="relative mx-auto w-full max-w-xl">
        <div class="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-primary-500/20 via-secondary-500/10 to-accent-400/20 blur-2xl"></div>
        <div class="glass-strong relative overflow-hidden rounded-[1.7rem] border border-white/60 p-4 shadow-2xl shadow-primary-950/10 dark:border-white/10 sm:p-6">
          <div class="flex items-center justify-between border-b border-slate-200/70 pb-4 dark:border-white/10">
            <div class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-rose-400"></span><span class="h-2.5 w-2.5 rounded-full bg-amber-400"></span><span class="h-2.5 w-2.5 rounded-full bg-emerald-400"></span></div>
            <span class="text-xs font-medium tracking-wide text-ink-light dark:text-slate-400">DIGITAL EXPERIENCES</span>
            <span class="text-xs text-primary-500">● Live concept</span>
          </div>
          <div class="grid gap-4 py-6 sm:grid-cols-[1fr_0.8fr]">
            <div class="flex min-h-56 flex-col justify-between rounded-2xl bg-gradient-to-br from-[#17112e] via-[#382b78] to-[#7966ee] p-6 text-white">
              <div class="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">Built for what’s next</div>
              <div><div class="font-display text-3xl font-bold leading-tight">Ideas into<br/>impact.</div><p class="mt-3 text-sm text-violet-100/80">Clear thinking. Beautiful interfaces. Reliable technology.</p></div>
              <div class="flex items-center gap-2 text-xs font-semibold">Explore possibilities <span>↗</span></div>
            </div>
            <div class="grid gap-4">
              <div class="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                <div class="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/15 text-lg text-primary-600">⌘</div>
                <p class="font-display text-lg font-bold text-ink dark:text-white">Web platforms</p><p class="mt-1 text-xs leading-5 text-ink-light dark:text-slate-400">Fast, accessible and ready to scale.</p>
              </div>
              <div class="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                <div class="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-accent-400/15 text-lg text-accent-600">◈</div>
                <p class="font-display text-lg font-bold text-ink dark:text-white">Mobile apps</p><p class="mt-1 text-xs leading-5 text-ink-light dark:text-slate-400">Useful experiences, made for people.</p>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-100/80 px-4 py-3 dark:bg-white/5">
            <span class="text-xs font-medium text-ink-light dark:text-slate-400">DESIGN · ENGINEERING · DELIVERY</span>
            <span class="text-xs font-semibold text-primary-600 dark:text-primary-300">Elevate Media Productions</span>
          </div>
        </div>
        <div class="absolute -bottom-6 -left-5 hidden rounded-2xl border border-white/70 bg-white/90 px-5 py-3 shadow-xl dark:border-white/10 dark:bg-night-lighter sm:block">
          <p class="text-xs text-ink-light dark:text-slate-400">Our focus</p><p class="font-display font-bold text-ink dark:text-white">Quality in every detail.</p>
        </div>
      </div>
    </Reveal>
  </div>
</section>