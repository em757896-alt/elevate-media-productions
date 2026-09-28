<script lang="ts">
  import { onMount } from 'svelte';
  import Hero from '$lib/components/sections/Hero.svelte';
  import FeaturedProjects from '$lib/components/sections/FeaturedProjects.svelte';
  import Services from '$lib/components/sections/Services.svelte';
  import Testimonials from '$lib/components/sections/Testimonials.svelte';
  import Workflow from '$lib/components/sections/Workflow.svelte';
  import ForumPreview from '$lib/components/sections/ForumPreview.svelte';
  import BlogPreview from '$lib/components/sections/BlogPreview.svelte';
  import CTA from '$lib/components/sections/CTA.svelte';

  let toast = $state('');
  let toastTone = $state<'success' | 'error'>('success');

  onMount(() => {
    const param = new URLSearchParams(window.location.search).get('subscribe');
    if (!param) return;
    const map: Record<string, { text: string; tone: 'success' | 'error' }> = {
      confirmed: { text: 'You are subscribed. Welcome aboard!', tone: 'success' },
      unsubscribed: { text: 'You have been unsubscribed. Sorry to see you go.', tone: 'success' },
      error: { text: 'Something went wrong. Please try again.', tone: 'error' },
      invalid: { text: 'That confirmation link is invalid or has expired.', tone: 'error' }
    };
    const entry = map[param];
    if (!entry) return;
    toast = entry.text;
    toastTone = entry.tone;
    history.replaceState(null, '', window.location.pathname);
    setTimeout(() => { toast = ''; }, 6000);
  });
</script>

<svelte:head>
  <title>Elevate Media Productions — We craft digital experiences that elevate brands.</title>
  <meta
    name="description"
    content="Elevate Media Productions builds web applications, mobile apps and community platforms that help organizations launch, grow and engage their audiences."
  />
  <meta property="og:title" content="Elevate Media Productions" />
  <meta property="og:description" content="Web applications, mobile apps and brand platforms — crafted to elevate." />
</svelte:head>

{#if toast}
  <div
    class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl px-5 py-3 text-sm font-medium text-white shadow-lg shadow-black/10"
    class:bg-emerald-600={toastTone === 'success'}
    class:bg-rose-600={toastTone === 'error'}
    role="status"
  >
    {toast}
  </div>
{/if}

<Hero />
<FeaturedProjects />
<Services />
<Workflow />
<ForumPreview />
<Testimonials />
<BlogPreview />
<CTA />