<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowUpRight, BookOpenCheck, Check, CircleHelp, ClipboardList, ExternalLink, LoaderCircle, Plus, RefreshCw, Search, Sparkles, Trash2 } from 'lucide-svelte';
  import { supabase } from '$lib/supabase';
  import { session } from '$lib/stores/session';

  type Category = { id: string; name: string; slug: string; description: string };
  type Idea = {
    id: string; title: string; summary: string; category_id: string | null; status: string;
    target_keywords: string[]; source_urls: string[]; research_notes: string;
    suggested_angle: string; created_at: string; updated_at: string; post_id: string | null;
  };

  const stages = [
    { value: 'idea', label: 'New idea' },
    { value: 'researching', label: 'Researching' },
    { value: 'ready', label: 'Ready to assign' },
    { value: 'drafting', label: 'Drafting' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' }
  ];
  let categories = $state<Category[]>([]);
  let ideas = $state<Idea[]>([]);
  let loading = $state(true);
  let saving = $state(false);
  let errorMessage = $state('');
  let successMessage = $state('');
  let query = $state('');
  let showForm = $state(false);
  let form = $state({ title: '', summary: '', category_id: '', keywords: '', source_urls: '', research_notes: '', suggested_angle: '' });
  const isAdmin = $derived($session.user?.role === 'admin');
  const filtered = $derived(ideas.filter((idea) => {
    const term = query.trim().toLowerCase();
    return !term || idea.title.toLowerCase().includes(term) || idea.summary.toLowerCase().includes(term) || idea.target_keywords.some((word) => word.toLowerCase().includes(term));
  }));

  onMount(() => { void loadDesk(); });

  async function loadDesk() {
    if (!supabase) { errorMessage = 'The editorial database is not configured.'; loading = false; return; }
    loading = true;
    const [categoryResult, ideaResult] = await Promise.all([
      supabase.from('editorial_categories').select('id,name,slug,description').order('sort_order'),
      supabase.from('editorial_ideas').select('*').order('updated_at', { ascending: false })
    ]);
    if (categoryResult.error || ideaResult.error) {
      errorMessage = 'The Phase 2 editorial database migration has not been applied yet. Apply apps/web/supabase/editorial_phase2.sql in the Supabase SQL Editor, then refresh this page.';
    } else {
      categories = categoryResult.data ?? [];
      ideas = (ideaResult.data ?? []) as Idea[];
      if (!form.category_id && categories.length) form.category_id = categories[0].id;
    }
    loading = false;
  }

  async function createIdea(event: SubmitEvent) {
    event.preventDefault();
    if (!supabase || !$session.user?.id || !isAdmin) return;
    if (!form.title.trim()) { errorMessage = 'Give the story idea a working headline.'; return; }
    saving = true;
    errorMessage = '';
    successMessage = '';
    const { error } = await supabase.from('editorial_ideas').insert({
      title: form.title.trim(),
      summary: form.summary.trim(),
      category_id: form.category_id || null,
      target_keywords: form.keywords.split(',').map((item) => item.trim()).filter(Boolean),
      source_urls: form.source_urls.split('\n').map((item) => item.trim()).filter((item) => /^https?:\/\//i.test(item)),
      research_notes: form.research_notes.trim(),
      suggested_angle: form.suggested_angle.trim(),
      status: 'idea',
      created_by: $session.user.id
    });
    if (error) errorMessage = error.message;
    else {
      successMessage = 'Story idea added to the research pipeline.';
      form = { title: '', summary: '', category_id: categories[0]?.id ?? '', keywords: '', source_urls: '', research_notes: '', suggested_angle: '' };
      showForm = false;
      await loadDesk();
    }
    saving = false;
  }

  async function updateStatus(id: string, status: string) {
    if (!supabase || !isAdmin) return;
    const { error } = await supabase.from('editorial_ideas').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) errorMessage = error.message;
    else await loadDesk();
  }

  async function removeIdea(id: string) {
    if (!supabase || !isAdmin || !confirm('Delete this editorial idea and its research notes?')) return;
    const { error } = await supabase.from('editorial_ideas').delete().eq('id', id);
    if (error) errorMessage = error.message;
    else { successMessage = 'Idea removed.'; await loadDesk(); }
  }
</script>

<svelte:head>
  <title>Editorial Desk — Elevate Media Workspace</title>
  <meta name="description" content="Research and plan technology newsroom coverage." />
</svelte:head>

<div class="space-y-7">
  <section class="relative overflow-hidden rounded-3xl bg-[#111b2b] p-6 text-white sm:p-8">
    <div class="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl"></div>
    <div class="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div class="max-w-2xl">
        <p class="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-200"><Sparkles size={13} /> Phase 2 / Research & planning</p>
        <h1 class="mt-3 font-display text-3xl font-bold">Editorial desk</h1>
        <p class="mt-2 text-sm leading-7 text-slate-300">Turn technology signals into researched stories. Track the angle, evidence, keywords and production stage before an idea becomes an article.</p>
      </div>
      {#if isAdmin}<button onclick={() => showForm = !showForm} class="inline-flex w-fit items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-500"><Plus size={16} /> Add story idea</button>{/if}
    </div>
  </section>

  {#if successMessage}<p class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">{successMessage}</p>{/if}
  {#if errorMessage}<div role="alert" class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-800 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">{errorMessage}</div>{/if}

  {#if showForm}
    <form onsubmit={createIdea} class="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101827] sm:p-7">
      <div><h2 class="font-display text-lg font-bold">New story brief</h2><p class="mt-1 text-xs text-slate-500">Capture the question, evidence and editorial direction. Do not treat a trend as fact until sources are checked.</p></div>
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block sm:col-span-2"><span class="mb-2 block text-xs font-semibold text-slate-500">Working headline *</span><input bind:value={form.title} required maxlength="180" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-rose-400 dark:border-white/10 dark:bg-white/5" placeholder="What is the story?" /></label>
        <label class="block"><span class="mb-2 block text-xs font-semibold text-slate-500">Editorial category</span><select bind:value={form.category_id} class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-[#172235]">{#each categories as category}<option value={category.id}>{category.name}</option>{/each}</select></label>
        <label class="block"><span class="mb-2 block text-xs font-semibold text-slate-500">Target keywords</span><input bind:value={form.keywords} class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" placeholder="AI agents, regulation, Kenya" /></label>
        <label class="block sm:col-span-2"><span class="mb-2 block text-xs font-semibold text-slate-500">Story summary</span><textarea bind:value={form.summary} rows="2" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" placeholder="What happened, why it matters, who is affected?" /></label>
        <label class="block sm:col-span-2"><span class="mb-2 block text-xs font-semibold text-slate-500">Proposed editorial angle</span><textarea bind:value={form.suggested_angle} rows="2" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" placeholder="What distinct, useful perspective will Elevate add?" /></label>
        <label class="block sm:col-span-2"><span class="mb-2 block text-xs font-semibold text-slate-500">Research sources (one URL per line)</span><textarea bind:value={form.source_urls} rows="3" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-xs dark:border-white/10 dark:bg-white/5" placeholder="https://primary-source.example/report&#10;https://official-announcement.example" /></label>
        <label class="block sm:col-span-2"><span class="mb-2 block text-xs font-semibold text-slate-500">Research notes & fact checks</span><textarea bind:value={form.research_notes} rows="4" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" placeholder="Record confirmed facts, dates, conflicting claims, questions to verify and interview leads." /></label>
      </div>
      <div class="flex justify-end gap-3"><button type="button" onclick={() => showForm = false} class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold dark:border-white/10">Cancel</button><button disabled={saving || !categories.length} class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{#if saving}<LoaderCircle size={15} class="animate-spin" /> Saving{:else}<Check size={15} /> Add to pipeline{/if}</button></div>
    </form>
  {/if}

  <section class="grid gap-4 sm:grid-cols-3 xl:grid-cols-6">
    {#each stages as stage}
      <div class="rounded-xl border border-slate-200/80 bg-white p-4 dark:border-white/10 dark:bg-[#101827]">
        <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stage.label}</p>
        <p class="mt-2 font-display text-2xl font-bold">{ideas.filter((idea) => idea.status === stage.value).length}</p>
      </div>
    {/each}
  </section>

  <section class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white dark:border-white/10 dark:bg-[#101827]">
    <div class="flex flex-col gap-3 border-b border-slate-100 p-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
      <div><h2 class="font-display text-lg font-bold">Research pipeline</h2><p class="mt-1 text-xs text-slate-500">Track every story from signal to publication.</p></div>
      <div class="flex gap-2"><label class="relative"><Search size={14} class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input bind:value={query} placeholder="Find an idea" class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm dark:border-white/10 dark:bg-white/5 sm:w-56" /></label><button aria-label="Refresh research pipeline" onclick={loadDesk} class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 dark:border-white/10"><RefreshCw size={15} /></button></div>
    </div>
    {#if loading}
      <div class="flex items-center justify-center gap-2 p-12 text-sm text-slate-500"><LoaderCircle size={18} class="animate-spin" /> Loading pipeline…</div>
    {:else if filtered.length}
      <div class="grid gap-4 p-4 md:grid-cols-2">
        {#each filtered as idea (idea.id)}
          <article class="rounded-2xl border border-slate-200 p-5 dark:border-white/10">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0"><p class="text-[10px] font-bold uppercase tracking-[0.16em] text-rose-600 dark:text-rose-300">{categories.find((category) => category.id === idea.category_id)?.name ?? 'Uncategorised'}</p><h3 class="mt-2 font-display text-lg font-bold">{idea.title}</h3></div>
              {#if isAdmin}<button aria-label="Delete idea" onclick={() => removeIdea(idea.id)} class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"><Trash2 size={15} /></button>{/if}
            </div>
            {#if idea.summary}<p class="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{idea.summary}</p>{/if}
            {#if idea.suggested_angle}<div class="mt-4 rounded-xl bg-slate-50 p-3 dark:bg-white/[0.04]"><p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Editorial angle</p><p class="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{idea.suggested_angle}</p></div>{/if}
            {#if idea.target_keywords?.length}<div class="mt-3 flex flex-wrap gap-1.5">{#each idea.target_keywords as keyword}<span class="rounded-full bg-primary-500/10 px-2.5 py-1 text-[10px] font-medium text-primary-600 dark:text-primary-300">{keyword}</span>{/each}</div>{/if}
            <div class="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span class="inline-flex items-center gap-1"><ClipboardList size={13} /> {idea.source_urls?.length ?? 0} sources</span>
              {#if idea.source_urls?.length}<a href={idea.source_urls[0]} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 font-semibold text-primary-500">Open source <ExternalLink size={12} /></a>{/if}
            </div>
            {#if idea.research_notes}<details class="mt-4 rounded-xl border border-slate-100 p-3 dark:border-white/10"><summary class="cursor-pointer text-xs font-semibold">Research notes</summary><p class="mt-2 whitespace-pre-wrap text-xs leading-5 text-slate-500 dark:text-slate-400">{idea.research_notes}</p></details>{/if}
            <div class="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-white/10">
              {#if isAdmin}
                <select value={idea.status} onchange={(event) => updateStatus(idea.id, (event.currentTarget as HTMLSelectElement).value)} class="max-w-[190px] rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-white/10 dark:bg-white/5">{#each stages as stage}<option value={stage.value}>{stage.label}</option>{/each}</select>
              {:else}<span class="text-xs font-semibold text-slate-500">{stages.find((stage) => stage.value === idea.status)?.label}</span>{/if}
              <span class="text-[10px] text-slate-400">{new Date(idea.updated_at).toLocaleDateString()}</span>
            </div>
          </article>
        {/each}
      </div>
    {:else}
      <div class="p-12 text-center"><CircleHelp size={28} class="mx-auto text-slate-300" /><h3 class="mt-4 font-display font-bold">No story ideas yet</h3><p class="mt-1 text-sm text-slate-500">Add a lead or emerging topic to start the research pipeline.</p></div>
    {/if}
  </section>
</div>
