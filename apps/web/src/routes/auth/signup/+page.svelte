<script lang="ts">
  import { ArrowLeft, Hammer, Shield } from 'lucide-svelte';
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import Logo from '$lib/components/ui/Logo.svelte';
</script>

<svelte:head>
  <title>Create account — Elevate Media Productions</title>
</svelte:head>

<div class="flex min-h-[100dvh] items-center justify-center px-6 pb-14 pt-24 md:pt-28">
  <div class="absolute inset-0 -z-10 bg-grid opacity-30"></div>
  <div class="absolute -top-32 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-primary-500/20 blur-[160px] pointer-events-none"></div>

  <Reveal>
    <div class="glass w-full max-w-md rounded-2xl p-8">
      <div class="flex flex-col items-center mb-7">
        <Logo size="md" />
        <h1 class="mt-5 font-display text-2xl font-bold text-ink dark:text-white">Member accounts coming soon</h1>
        <p class="mt-1 text-sm text-ink-light dark:text-slate-400">Join the Elevate Media community</p>
      </div>

      <div class="rounded-2xl border border-primary-500/20 bg-primary-500/5 p-6 text-center">
        <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-glow">
          <Hammer size={22} />
        </div>
        <p class="text-sm leading-relaxed text-ink-light dark:text-slate-300">
          We are working on member dashboards and the full community experience.
        </p>
        <p class="mt-3 text-sm leading-relaxed text-ink-light dark:text-slate-400">
          Account creation is temporarily disabled. Sign-ups will reopen as soon as the dashboards are ready.
        </p>
      </div>

      <div class="mt-6 rounded-xl border border-slate-200/70 bg-fog-light px-4 py-3 text-center text-sm text-ink-light dark:border-white/10 dark:bg-night-lighter dark:text-slate-400">
        <Shield size={15} class="mx-auto mb-1 text-primary-500" />
        In the meantime, explore our <a href="/portfolio" class="font-medium text-primary-500 hover:underline">projects</a>, read the
        <a href="/blog" class="font-medium text-primary-500 hover:underline"> blog</a>, or
        <a href="/contact" class="font-medium text-primary-500 hover:underline">get in touch</a>.
      </div>

      <a href="/" class="btn-outline mt-6 w-full !py-3 !text-ink dark:!text-slate-200">
        <ArrowLeft size={16} /> Back to home
      </a>
    </div>
  </Reveal>
</div>