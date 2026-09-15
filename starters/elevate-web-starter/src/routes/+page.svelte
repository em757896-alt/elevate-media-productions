<script lang="ts">
  import '../app.css';
  import Reveal from '$lib/components/ui/Reveal.svelte';

  const brand = 'Elevate Web Starter';
  const tagline = 'Fast, beautiful, open source.';
  const links = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'GitHub', href: 'https://github.com/em757896-alt/elevate-media-productions' }
  ];

  const features = [
    { title: 'SvelteKit 2', body: 'Frontend compiled to vanilla JS — tiny bundles, instant hydration.' },
    { title: 'Tailwind CSS 4', body: 'CSS-first config. No config file needed to start theming.' },
    { title: 'Dark / light', body: 'Theme store wired to localStorage, zero flash on load.' },
    { title: 'Motion built-in', body: 'Scroll-reveal component, tasteful and respectful of reduced motion.' },
    { title: 'SEO-ready', body: 'Meta + Open Graph boilerplate out of the box.' },
    { title: 'Free forever', body: 'MIT licensed. Deploy to Vercel, Netlify or Cloudflare in minutes.' }
  ];

  const steps = [
    { n: '01', title: 'Clone', body: 'Fork or copy the starter folder into your project.' },
    { n: '02', title: 'Theme', body: 'Edit tokens in src/app.css to match your brand.' },
    { n: '03', title: 'Ship', body: 'Replace sections, build, deploy. You are live.' }
  ];
</script>

<!-- HERO -->
<header class="relative overflow-hidden">
  <div class="pointer-events-none absolute inset-0">
    <div class="absolute -top-40 left-1/2 h-[500px] w-[720px] -translate-x-1/2 rounded-full bg-primary-500/20 blur-[140px]"></div>
  </div>

  <nav class="container-x relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
    <a href="/" class="font-display text-lg font-bold tracking-tight text-white">{brand}</a>
    <div class="hidden items-center gap-6 sm:flex">
      {#each links as link (link.href)}
        <a href={link.href} class="text-sm text-slate-300 transition-colors hover:text-white">{link.label}</a>
      {/each}
    </div>
    <a href="#pricing" class="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600">
      Get started
    </a>
  </nav>

  <div class="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-20 text-center md:pt-28">
    <Reveal>
      <span class="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-indigo-200">
        <span class="h-1.5 w-1.5 rounded-full bg-accent-500"></span>
        Lightweight · Production-ready
      </span>
      <h1 class="font-display mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
        Launch a stunning site in
        <span class="bg-gradient-to-r from-indigo-400 via-accent-500 to-secondary-500 bg-clip-text text-transparent">
          one afternoon
        </span>
      </h1>
      <p class="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
        {tagline} A complete SvelteKit + Tailwind landing template with dark mode and motion —
        free to use for anything.
      </p>
    </Reveal>
    <Reveal delay={120}>
      <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a href="#pricing" class="rounded-xl bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.03]">
          Start building
        </a>
        <a href="https://github.com/em757896-alt/elevate-media-productions" class="glass rounded-xl px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
          View source
        </a>
      </div>
    </Reveal>
  </div>
</header>

<!-- FEATURES -->
<section id="features" class="mx-auto max-w-6xl px-6 py-24">
  <Reveal>
    <h2 class="font-display text-center text-3xl font-bold text-white sm:text-4xl">Everything you need to ship</h2>
    <p class="mx-auto mt-4 max-w-2xl text-center text-slate-400">One template, zero boilerplate churn.</p>
  </Reveal>
  <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {#each features as feature (feature.title)}
      <Reveal>
        <div class="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-500/5">
          <h3 class="font-display text-lg font-semibold text-white">{feature.title}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-400">{feature.body}</p>
        </div>
      </Reveal>
    {/each}
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="border-y border-white/5 bg-primary-500/[0.03]">
  <div class="mx-auto max-w-6xl px-6 py-20">
    <div class="grid gap-10 md:grid-cols-3">
      {#each steps as step (step.n)}
        <Reveal>
          <span class="font-display text-sm font-bold text-indigo-400">{step.n}</span>
          <h3 class="font-display mt-3 text-xl font-semibold text-white">{step.title}</h3>
          <p class="mt-2 text-sm text-slate-400">{step.body}</p>
        </Reveal>
      {/each}
    </div>
  </div>
</section>

<!-- PRICING / CTA -->
<section id="pricing" class="mx-auto max-w-6xl px-6 py-24">
  <Reveal>
    <div class="glass mx-auto max-w-lg rounded-3xl p-10 text-center">
      <span class="font-display inline-block rounded-full bg-primary-500/15 px-4 py-1.5 text-xs font-semibold text-indigo-200">Open source</span>
      <h2 class="font-display mt-5 text-3xl font-bold text-white">Free for every project</h2>
      <p class="mt-3 text-slate-400">
        MIT licensed — personal, commercial, client work, anything. Keep the license file and build whatever you want.
      </p>
      <a href="https://github.com/em757896-alt/elevate-media-productions" class="mt-8 inline-flex rounded-xl bg-primary-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600">
        Get the starter →
      </a>
    </div>
  </Reveal>
</section>

<!-- FOOTER -->
<footer class="border-t border-white/5 py-10 text-center text-sm text-slate-500">
  <p>© {new Date().getFullYear()} {brand} — built with SvelteKit + Tailwind CSS 4.</p>
</footer>