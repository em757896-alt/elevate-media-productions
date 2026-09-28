<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { supabase, supabaseConfigured } from '$lib/supabase';
  import { onMount } from 'svelte';

  let profile: { role: string; username?: string; full_name?: string } | null = null;
  let isAdmin = $state(false);
  let photo = $state('/founder.jpg');
  let uploadMsg = $state('');
  let uploading = $state(false);

  const bio = $state({
    name: 'Emmanuel Michael',
    role: 'Founder & Lead Developer',
    tagline: 'I build digital products that turn ideas into results.',
    email: 'elevatemediaproductions1@gmail.com',
    location: 'Mombasa, Kenya',
    paragraphs: [
      'I founded Elevate Media Productions in 2026 to help brands, startups and creators ship web applications, mobile apps and community platforms that feel premium and just work.',
      'I have designed and built full-stack products across SvelteKit, React, Kotlin and Supabase — from client dashboards to editorial platforms — and I care deeply about performance, security and the details most people never notice but everyone feels.',
      'When I am not shipping, I write about engineering, share behind-the-scenes lessons, and stay curious about what is next on the web.'
    ],
    skills: ['Web Applications', 'Mobile Apps', 'Brand Platforms', 'Frontend Engineering', 'Backend & APIs', 'Product Design'],
    education: [
      'Coursework in software development and database systems — with hands-on skills in SvelteKit, React, TypeScript, Kotlin, Supabase and PostgreSQL gained through building real products.',
      'I continue to learn every day: exploring other languages and frameworks beyond my core stack so the tools I choose are driven by the problem, never by habit.'
    ],
    stats: [
      { value: '2026', label: 'Studio founded' },
      { value: '5', label: 'Products shipped' },
      { value: '100%', label: 'Client satisfaction' }
    ]
  });

  onMount(async () => {
    if (!supabaseConfigured || !supabase) return;
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    const { data: profileRow } = await supabase
      .from('profiles')
      .select('role, username, full_name')
      .eq('id', data.user.id)
      .single();
    if (profileRow) {
      profile = profileRow;
      isAdmin = profileRow.role === 'admin';
    }
    const { data: signedUrl } = await supabase.storage
      .from('founder-photos')
      .createSignedUrl('founder.jpg', 3600);
    if (signedUrl?.signedUrl) photo = signedUrl.signedUrl;
  });

  async function onUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!supabase) return;
    uploading = true;
    uploadMsg = '';
    try {
      const { error: upError } = await supabase.storage
        .from('founder-photos')
        .upload('founder.jpg', file, { cacheControl: '3600', upsert: true });
      if (upError) throw upError;
      const { data: signedUrl } = await supabase.storage
        .from('founder-photos')
        .createSignedUrl('founder.jpg', 3600);
      if (signedUrl?.signedUrl) {
        photo = signedUrl.signedUrl;
      }
      uploadMsg = 'Photo updated. Please refresh to see it.';
    } catch (err) {
      uploadMsg = `Upload failed: ${(err as { message?: string }).message ?? 'unknown error'}`;
    } finally {
      uploading = false;
      input.value = '';
    }
  }
</script>

<svelte:head>
  <title>About Me — Elevate Media Productions</title>
  <meta name="description" content="Meet the founder behind Elevate Media Productions." />
</svelte:head>

<div class="pt-28 md:pt-36">
  <section class="section-padding relative overflow-hidden">
    <div class="absolute -top-32 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-primary-500/20 blur-[160px] pointer-events-none"></div>
    <div class="container-x relative">
      <SectionHeading badge="Founder" title="About me" subtitle="The person behind the builds." />

      <div class="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-[280px_1fr]">
        <Reveal>
          <div class="glass rounded-2xl p-6 text-center">
            <div class="relative mx-auto h-44 w-44 overflow-hidden rounded-2xl">
              {#if photo}
                <img src={photo} alt="{bio.name}, {bio.role}" class="h-full w-full object-cover" width="176" height="176" />
              {:else}
                <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500 font-display text-5xl font-bold text-white">
                  E
                </div>
              {/if}
            </div>
            <h1 class="mt-5 font-display text-xl font-bold text-ink dark:text-white">{bio.name}</h1>
            <p class="mt-1 text-sm text-primary-500 dark:text-primary-400">{bio.role}</p>
            <p class="mt-3 text-sm text-ink-light dark:text-slate-400">{bio.location}</p>

            {#if isAdmin}
              <div class="mt-5 rounded-xl border border-dashed border-slate-300 p-4 text-left dark:border-white/15">
                <p class="mb-2 text-xs font-medium uppercase tracking-wide text-ink-light dark:text-slate-400">Update photo (admin)</p>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  onchange={onUpload}
                  class="w-full text-xs text-ink-light file:mr-3 file:rounded-lg file:border-0 file:bg-primary-500/10 file:px-3 file:py-2 file:text-xs file:font-medium file:text-primary-500 dark:text-slate-400"
                />
                {#if uploadMsg}
                  <p class="mt-2 text-xs text-ink-light dark:text-slate-400">{uploadMsg}</p>
                {/if}
              </div>
            {/if}

            <div class="mt-6 grid grid-cols-3 gap-2 border-t border-slate-200/60 pt-5 dark:border-white/10">
              {#each bio.stats as stat (stat.label)}
                <div>
                  <p class="font-display text-lg font-bold text-ink dark:text-white">{stat.value}</p>
                  <p class="text-[11px] text-ink-light dark:text-slate-400">{stat.label}</p>
                </div>
              {/each}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div class="glass rounded-2xl p-7 md:p-9">
            <h2 class="font-display text-lg font-bold text-ink dark:text-white">{bio.tagline}</h2>
            <div class="mt-5 space-y-4">
              {#each bio.paragraphs as p (p)}
                <p class="text-sm leading-relaxed text-ink-light dark:text-slate-400">{p}</p>
              {/each}
            </div>

            <div class="mt-7">
              <h3 class="font-display text-sm font-semibold uppercase tracking-widest text-ink dark:text-white">What I do</h3>
              <div class="mt-3 flex flex-wrap gap-2">
                {#each bio.skills as skill (skill)}
                  <span class="rounded-full border border-slate-200/80 bg-fog-light px-3 py-1 text-xs font-medium text-ink-light dark:border-white/10 dark:bg-night-lighter dark:text-slate-300">
                    {skill}
                  </span>
                {/each}
              </div>
            </div>

            <div class="mt-7">
              <h3 class="font-display text-sm font-semibold uppercase tracking-widest text-ink dark:text-white">Education & growth</h3>
              <div class="mt-3 space-y-3">
                {#each bio.education as item (item)}
                  <p class="text-sm leading-relaxed text-ink-light dark:text-slate-400">{item}</p>
                {/each}
              </div>
            </div>

            <div class="mt-8 border-t border-slate-200/60 pt-6 dark:border-white/10">
              <p class="text-sm text-ink-light dark:text-slate-400">
                Want to work together or say hello?
                <a class="font-medium text-primary-500 hover:text-primary-400 dark:text-primary-400" href="/contact">Get in touch</a> or email
                <a class="font-medium text-primary-500 hover:text-primary-400 dark:text-primary-400" href="mailto:{bio.email}">{bio.email}</a>.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</div>