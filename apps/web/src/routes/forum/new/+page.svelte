<script lang="ts">
  import { Send, ArrowLeft } from 'lucide-svelte';
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import { enhance } from '$app/forms';

  let { data, form } = $props();

  const categories = $derived(data.categories);

  let title = $state('');
  let content = $state('');
  let categoryId = $state('');
  let error = $state(form?.error ?? '');
</script>

<svelte:head>
  <title>New Thread — Elevate Media Forum</title>
</svelte:head>

<div class="pt-28 md:pt-36">
  <section class="section-padding relative overflow-hidden">
    <div class="absolute -top-32 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-primary-500/20 blur-[160px] pointer-events-none"></div>
    <div class="container-x relative mx-auto max-w-2xl">
      <Reveal>
        <a href="/forum" class="group mb-10 inline-flex items-center gap-2 text-sm text-ink-light transition-colors hover:text-ink dark:text-slate-400 dark:hover:text-white">
          <ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
          Back to forum
        </a>
      </Reveal>

      <Reveal>
        <h1 class="font-display text-2xl font-bold text-ink dark:text-white sm:text-3xl">Start a new discussion</h1>
        <p class="mt-2 text-sm text-ink-light dark:text-slate-400">Choose a category, write a clear title and share your question, idea or project.</p>
      </Reveal>

      <Reveal>
        <form
          class="glass mt-8 rounded-2xl p-7"
          method="POST"
          action="?/create"
          use:enhance={() => {
            return async ({ update }) => {
              error = '';
              const res = (await update({ reset: false })) as {
                status: number;
                data?: { error?: string };
              } | undefined;
              if (res && res.status === 400 && res.data?.error) error = res.data.error;
            };
          }}
        >
          <div class="space-y-5">
            <div>
              <label for="category" class="mb-1.5 block text-sm font-medium text-ink dark:text-slate-200">Category</label>
              <select
                id="category"
                name="category_id"
                bind:value={categoryId}
                required
                class="w-full rounded-xl border border-slate-200/80 bg-fog-light px-4 py-3 text-sm text-ink outline-none focus:border-primary-500 dark:border-white/10 dark:bg-night-lighter dark:text-white"
              >
                <option value="" disabled>Select a category</option>
                {#each categories as cat (cat.id)}
                  <option value={cat.id}>{cat.name}</option>
                {/each}
              </select>
            </div>
            <div>
              <label for="title" class="mb-1.5 block text-sm font-medium text-ink dark:text-slate-200">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                bind:value={title}
                required
                maxlength="120"
                placeholder="What is this about?"
                class="w-full rounded-xl border border-slate-200/80 bg-fog-light px-4 py-3 text-sm text-ink outline-none focus:border-primary-500 dark:border-white/10 dark:bg-night-lighter dark:text-white"
              />
            </div>
            <div>
              <label for="content" class="mb-1.5 block text-sm font-medium text-ink dark:text-slate-200">Your post</label>
              <textarea
                id="content"
                name="content"
                bind:value={content}
                required
                rows={8}
                placeholder="Write your thoughts..."
                class="w-full rounded-xl border border-slate-200/80 bg-fog-light px-4 py-3 text-sm text-ink outline-none focus:border-primary-500 dark:border-white/10 dark:bg-night-lighter dark:text-white resize-y"
              ></textarea>
            </div>
          </div>
          {#if error}
            <p class="mt-4 text-sm font-medium text-secondary-500">{error}</p>
          {/if}
          <div class="mt-6 flex justify-end">
            <button type="submit" class="btn-gradient !px-6 !py-3">
              <Send size={15} /> Post thread
            </button>
          </div>
        </form>
      </Reveal>
    </div>
  </section>
</div>