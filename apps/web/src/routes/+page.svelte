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
  <title>Web &amp; Mobile App Development in Mombasa | Elevate Media</title>
  <meta
    name="description"
    content="Elevate Media Productions designs and builds websites, Android apps, business platforms and digital experiences for organisations in Mombasa, Nairobi and beyond."
  />
  <meta name="robots" content="index,follow,max-image-preview:large" />
  <meta name="googlebot" content="index,follow,max-image-preview:large" />
  <meta property="og:site_name" content="Elevate Media Productions" />
  <meta property="og:title" content="Web &amp; Mobile App Development in Mombasa | Elevate Media" />
  <meta property="og:description" content="Websites, Android apps and digital platforms for organisations in Mombasa, Nairobi and beyond." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://elevatemediaproductions.cc/" />
  <link rel="canonical" href="https://elevatemediaproductions.cc/" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Elevate Media Productions — Web &amp; App Development" />
  <meta name="twitter:description" content="Websites, Android apps and digital platforms built in Kenya." />
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Elevate Media Productions",
      "url": "https://elevatemediaproductions.cc/",
      "description": "Web and mobile app development, digital product design and community platforms for organisations in Mombasa, Nairobi and beyond.",
      "email": "elevatemediaproductions1@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mombasa",
        "addressRegion": "Mombasa County",
        "addressCountry": "KE"
      },
      "areaServed": [
        { "@type": "City", "name": "Mombasa" },
        { "@type": "City", "name": "Nairobi" },
        { "@type": "Country", "name": "Kenya" }
      ],
      "knowsAbout": [
        "Web application development",
        "Android application development",
        "Digital product design",
        "Community platforms",
        "Website performance optimisation"
      ]
    }
  </script>
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