<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { supabase, supabaseConfigured } from '$lib/supabase';
  import { onMount } from 'svelte';

  let isAdmin = $state(false);
  let photo = $state('/founder.jpg');
  let uploadMsg = $state('');
  let uploading = $state(false);
  const bio = {
    name: 'Emmanuel Michael',
    role: 'Founder & Lead Developer',
    email: 'elevatemediaproductions1@gmail.com',
    location: 'Mombasa, Kenya',
    intro: 'I lead the product thinking and engineering behind Elevate Media Productions.',
    paragraphs: [
      'My work brings together interface design, application development and the systems that support useful digital products. I focus on making complex workflows feel clear and dependable.',
      'At Elevate, I work across web applications, Android products, backend services and product experiences — choosing the tools around the needs of each project rather than following a single framework.'
    ],
    disciplines: ['Product strategy', 'Interface design', 'Web engineering', 'Android development', 'Backend systems', 'Performance and security']
  };

  onMount(async () => {
    if (!supabaseConfigured || !supabase) return;
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    const { data: profileRow } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
    isAdmin = profileRow?.role === 'admin';
    const { data: signedUrl } = await supabase.storage.from('founder-photos').createSignedUrl('founder.jpg', 3600);
    if (signedUrl?.signedUrl) photo = signedUrl.signedUrl;
  });

  async function onUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !supabase) return;
    uploading = true; uploadMsg = '';
    try {
      const { error } = await supabase.storage.from('founder-photos').upload('founder.jpg', file, { cacheControl: '3600', upsert: true });
      if (error) throw error;
      const { data } = await supabase.storage.from('founder-photos').createSignedUrl('founder.jpg', 3600);
      if (data?.signedUrl) photo = data.signedUrl;
      uploadMsg = 'Photo updated.';
    } catch (err) {
      uploadMsg = `Upload failed: ${(err as { message?: string }).message ?? 'unknown error'}`;
    } finally { uploading = false; input.value = ''; }
  }
</script>

<svelte:head><title>Founder — Elevate Media Productions</title><meta name="description" content="Meet Emmanuel Michael, founder and lead developer at Elevate Media Productions."/></svelte:head>
<div class="pt-28 md:pt-36">
  <section class="section-padding"><div class="container-x">
    <SectionHeading badge="Founder" title="The person behind the work." subtitle="A little about the thinking, craft and engineering behind Elevate Media Productions."/>
    <div class="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
      <Reveal><div class="max-w-sm"><div class="project-visual aspect-[4/5]"><img src={photo} alt={bio.name} class="object-cover"/></div><h2 class="mt-6 font-display text-2xl font-semibold text-ink dark:text-white">{bio.name}</h2><p class="mt-1 text-xs font-bold uppercase tracking-[.18em] text-primary-700 dark:text-primary-300">{bio.role}</p><p class="mt-3 text-sm text-ink-light dark:text-slate-400">{bio.location}</p>
      {#if isAdmin}<div class="mt-6 border-t border-ink/15 pt-5 dark:border-white/15"><label class="text-xs font-semibold uppercase tracking-wider text-ink-light dark:text-slate-400">Update profile photo</label><input type="file" accept="image/*" disabled={uploading} onchange={onUpload} class="mt-3 w-full text-xs file:mr-3 file:border-0 file:bg-primary-400 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-ink"/>{#if uploadMsg}<p class="mt-2 text-xs text-ink-light">{uploadMsg}</p>{/if}</div>{/if}</div></Reveal>
      <Reveal><div class="border-t border-ink/20 pt-7 dark:border-white/15"><p class="max-w-3xl font-display text-3xl font-medium leading-[1.18] tracking-[-.045em] text-ink dark:text-white md:text-4xl">{bio.intro}</p><div class="mt-8 max-w-2xl space-y-5">{#each bio.paragraphs as p}<p class="text-base leading-7 text-ink-light dark:text-slate-400">{p}</p>{/each}</div><div class="mt-12 border-t border-ink/15 pt-7 dark:border-white/15"><p class="text-[11px] font-bold uppercase tracking-[.2em] text-primary-700 dark:text-primary-300">Areas of focus</p><div class="mt-5 grid gap-4 sm:grid-cols-2">{#each bio.disciplines as item,i}<div class="flex gap-4 border-b border-ink/10 pb-4 dark:border-white/10"><span class="font-display text-xs text-primary-700 dark:text-primary-300">0{i+1}</span><span class="text-sm font-medium text-ink dark:text-white">{item}</span></div>{/each}</div></div><div class="mt-10 flex flex-wrap items-center gap-5"><a href="/contact" class="btn-gradient px-6 py-3">Start a conversation ↗</a><a href={`mailto:${bio.email}`} class="text-sm font-semibold text-ink-light hover:text-primary-700 dark:text-slate-400 dark:hover:text-primary-300">{bio.email}</a></div></div></Reveal>
    </div>
  </div></section>
</div>