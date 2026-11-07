<script lang="ts">
  import { onMount } from 'svelte';
  import { Download, Trash2, UserRound, Save, LoaderCircle, Check, ExternalLink } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';
  import { session } from '$lib/stores/session';

  let status = $state<'idle' | 'exporting' | 'deleting' | 'saving' | 'error'>('idle');
  let message = $state('');
  let profileLoaded = $state(false);
  let authorProfile = $state({
    full_name: '', bio: '', avatar_url: '', author_headline: '',
    website_url: '', expertise: '', is_author: false
  });

  onMount(async () => {
    if (!supabase || !$session.user?.id) { profileLoaded = true; return; }
    const { data, error } = await supabase.from('profiles')
      .select('full_name,bio,avatar_url,author_headline,website_url,expertise,is_author')
      .eq('id', $session.user.id).maybeSingle();
    if (data) {
      authorProfile = {
        full_name: data.full_name ?? '',
        bio: data.bio ?? '',
        avatar_url: data.avatar_url ?? '',
        author_headline: data.author_headline ?? '',
        website_url: data.website_url ?? '',
        expertise: (data.expertise ?? []).join(', '),
        is_author: data.is_author ?? false
      };
    } else if (error) message = error.message;
    profileLoaded = true;
  });

  async function saveAuthorProfile(event: SubmitEvent) {
    event.preventDefault();
    if (!supabase || !$session.user?.id) return;
    status = 'saving';
    message = '';
    const { error } = await supabase.from('profiles').update({
      full_name: authorProfile.full_name.trim(),
      bio: authorProfile.bio.trim(),
      avatar_url: authorProfile.avatar_url.trim() || null,
      author_headline: authorProfile.author_headline.trim() || null,
      website_url: authorProfile.website_url.trim() || null,
      expertise: authorProfile.expertise.split(',').map((item) => item.trim()).filter(Boolean),
      is_author: authorProfile.is_author
    }).eq('id', $session.user.id);
    if (error) {
      status = 'error';
      message = error.message.includes('author_headline') || error.message.includes('is_author')
        ? 'Apply the Phase 2 editorial database migration before saving author profile fields.'
        : error.message;
    } else {
      status = 'idle';
      message = 'Profile saved successfully.';
    }
  }

  async function onExport() {
    status = 'exporting';
    message = '';
    try {
      const res = await fetch('/api/account/export', { method: 'POST' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? 'Export failed.');
      }
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'elevate-data-export-' + new Date().toISOString().slice(0, 10) + '.json';
      a.click();
      URL.revokeObjectURL(url);
      status = 'idle';
    } catch (err) {
      status = 'error';
      message = (err as { message?: string }).message ?? 'Something went wrong.';
    }
  }

  async function onDelete() {
    const confirmed = window.confirm('This permanently deletes your account, profile and all content you authored. This cannot be undone. Continue?');
    if (!confirmed) return;
    status = 'deleting';
    message = '';
    try {
      const res = await fetch('/api/account/delete', { method: 'POST' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? 'Deletion failed.');
      }
      goto('/');
    } catch (err) {
      status = 'error';
      message = (err as { message?: string }).message ?? 'Something went wrong.';
    }
  }
</script>

<svelte:head>
  <title>Settings — Elevate Media Workspace</title>
  <meta name="description" content="Manage your member and editorial author profile and data rights." />
</svelte:head>

<div class="mx-auto max-w-3xl space-y-7">
  <header>
    <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600 dark:text-rose-300">Workspace settings</p>
    <h1 class="mt-2 font-display text-3xl font-bold text-ink dark:text-white">Your profile & settings</h1>
    <p class="mt-2 text-sm text-ink-light dark:text-slate-400">Manage how you appear in the community and, if you write for us, the newsroom author directory.</p>
  </header>

  {#if message}
    <p class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300" role="status">{message}</p>
  {/if}

  <section class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#101827]">
    <div class="border-b border-slate-100 p-6 dark:border-white/10">
      <div class="flex items-center gap-3"><span class="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300"><UserRound size={18} /></span><div><h2 class="font-display text-lg font-bold">Author profile</h2><p class="mt-1 text-xs text-slate-500">Opt in to be listed as an Elevate Media newsroom contributor.</p></div></div>
    </div>
    {#if !profileLoaded}
      <div class="p-8 text-center text-sm text-slate-500">Loading profile…</div>
    {:else}
      <form onsubmit={saveAuthorProfile} class="space-y-4 p-6">
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="block"><span class="mb-2 block text-xs font-semibold text-slate-500">Display name</span><input bind:value={authorProfile.full_name} required class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" /></label>
          <label class="block"><span class="mb-2 block text-xs font-semibold text-slate-500">Professional headline</span><input bind:value={authorProfile.author_headline} maxlength="120" placeholder="e.g. Technology journalist" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" /></label>
          <label class="block sm:col-span-2"><span class="mb-2 block text-xs font-semibold text-slate-500">Short biography</span><textarea bind:value={authorProfile.bio} rows="3" maxlength="500" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" placeholder="Introduce your background and the topics you cover." /></label>
          <label class="block"><span class="mb-2 block text-xs font-semibold text-slate-500">Profile photo URL</span><input bind:value={authorProfile.avatar_url} type="url" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" placeholder="https://…" /></label>
          <label class="block"><span class="mb-2 block text-xs font-semibold text-slate-500">Website</span><input bind:value={authorProfile.website_url} type="url" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" placeholder="https://…" /></label>
          <label class="block sm:col-span-2"><span class="mb-2 block text-xs font-semibold text-slate-500">Areas of expertise (comma separated)</span><input bind:value={authorProfile.expertise} class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" placeholder="AI, cybersecurity, public policy" /></label>
        </div>
        <label class="flex items-start gap-3 rounded-xl bg-slate-50 p-4 dark:bg-white/[0.04]"><input type="checkbox" bind:checked={authorProfile.is_author} class="mt-0.5 h-4 w-4 accent-rose-600" /><span><span class="block text-sm font-semibold">Show my profile in the newsroom author directory</span><span class="mt-1 block text-xs leading-5 text-slate-500">Your name, biography, photo and expertise will be publicly visible when enabled.</span></span></label>
        <div class="flex flex-wrap items-center justify-between gap-3"><a href="/authors" class="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-300">View author directory <ExternalLink size={13} /></a><button disabled={status === 'saving'} class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-500 disabled:opacity-50">{#if status === 'saving'}<LoaderCircle size={15} class="animate-spin" /> Saving…{:else}<Save size={15} /> Save profile{/if}</button></div>
      </form>
    {/if}
  </section>

  <section class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#101827]">
    <div class="border-b border-slate-100 p-6 dark:border-white/10"><h2 class="font-display text-base font-bold">Download your data</h2><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Get a machine-readable copy of your profile and contributions (right of access / data portability).</p><button class="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-slate-900" onclick={onExport} disabled={status === 'exporting'}><Download size={15} />{status === 'exporting' ? 'Preparing…' : 'Export data'}</button></div>
    <div class="p-6"><h2 class="font-display text-base font-bold text-ink dark:text-white">Delete your account</h2><p class="mt-1 text-sm text-ink-light dark:text-slate-400">Permanently remove your account and all associated data (right to erasure).</p><button class="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-300/70 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-400" onclick={onDelete} disabled={status === 'deleting'}><Trash2 size={15} />{status === 'deleting' ? 'Deleting…' : 'Delete account'}</button></div>
  </section>
</div>
