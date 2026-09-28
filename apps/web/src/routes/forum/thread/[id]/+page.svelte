<script lang="ts">
  import { ArrowLeft, ThumbsUp, MessageCircle, Clock, Lock, Pin, Send, LogIn } from 'lucide-svelte';
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import { timeAgo, avatarColor } from '$lib/utils';
  import { enhance } from '$app/forms';

  let { data, form } = $props();

  const thread = $derived(data.thread);
  const replies = $derived(data.replies);
  const user = $derived(data.user);
  const category = $derived(
    thread ? { name: thread.category_name } : null
  );

  const canInteract = $derived(Boolean(thread));
  const locked = $derived(thread?.locked ?? false);
  const signedIn = $derived(Boolean(user));

  let upvotes = $state(thread?.upvotes ?? 0);
  let submitMsg = $state(form?.message ?? '');
  let submitOk = $state(form?.ok ?? false);

  async function onLike() {
    if (!thread) return;
    if (!signedIn) {
      window.location.href = '/auth/login';
      return;
    }
    const res = await fetch(`/api/forum/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ thread_id: thread.id })
    });
    if (res.ok) {
      const json = await res.json();
      upvotes = json.upvotes;
    }
  }
</script>

<svelte:head>
  <title>{thread?.title ?? 'Thread'} — Elevate Media Forum</title>
</svelte:head>

{#if thread}
  <div class="pt-28 md:pt-36">
    <section class="section-padding relative overflow-hidden">
      <div class="absolute -top-32 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-primary-500/20 blur-[160px] pointer-events-none"></div>
      <div class="container-x relative mx-auto max-w-3xl">
        <Reveal>
          <a
            href="/forum"
            class="group mb-10 inline-flex items-center gap-2 text-sm text-ink-light transition-colors hover:text-ink dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
            Back to forum
          </a>
        </Reveal>

        <Reveal>
          <div class="flex flex-wrap items-center gap-3 mb-4">
            {category}
            {#if thread.pinned}
              <Badge variant="secondary">
                <Pin size={11} /> Pinned
              </Badge>
            {/if}
            {#if thread.locked}
              <Badge variant="ghost">
                <Lock size={11} /> Locked
              </Badge>
            {/if}
          </div>
        </Reveal>

        <Reveal>
          <h1 class="font-display text-2xl font-bold text-ink dark:text-white sm:text-3xl">{thread.title}</h1>
          <div class="mt-3 flex items-center gap-3">
            {#if thread.author_avatar}
            <img
              src={thread.author_avatar}
              alt={thread.author_name}
              width="32"
              height="32"
              loading="lazy"
              class="h-8 w-8 rounded-full object-cover"
            />
          {:else}
            <div class="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white" style="background: {avatarColor(thread.author_name)}">
              {thread.author_name.split(' ').map((n) => n[0]).join('')}
            </div>
          {/if}
            <div class="text-sm">
              <span class="font-medium text-ink dark:text-white">{thread.author_name}</span>
              <span class="mx-2 text-ink-light dark:text-slate-500">·</span>
              <span class="flex items-center gap-1 text-ink-light dark:text-slate-500">
                <Clock size={12} /> {timeAgo(thread.created_at)}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div class="glass mt-8 rounded-2xl p-8 md:p-10">
            <div class="prose-custom">
              {#each thread.content.split('\n\n') as paragraph}
                <p class="text-ink-light dark:text-slate-300 leading-relaxed">{paragraph}</p>
              {/each}
            </div>

            <div class="mt-8 flex items-center gap-6 border-t border-slate-200/50 pt-6 dark:border-white/5">
              <button
                onclick={onLike}
                disabled={!canInteract}
                class="inline-flex items-center gap-2 rounded-lg bg-ink/5 px-3 py-1.5 text-sm text-ink-light transition-colors hover:bg-ink/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 {signedIn ? '' : 'cursor-pointer'}"
              >
                <ThumbsUp size={15} class={upvotes > 0 ? 'text-primary-500' : ''} /> {upvotes}
              </button>
              <span class="flex items-center gap-2 text-sm text-ink-light dark:text-slate-500">
                <MessageCircle size={15} /> {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
              </span>
              {#if !signedIn}
                <a href="/auth/login" class="ml-auto inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400">
                  <LogIn size={15} /> Sign in
                </a>
              {/if}
            </div>
          </div>
        </Reveal>

        {#if replies.length > 0}
          <Reveal>
            <div class="mt-8 glass rounded-2xl p-6">
              <h3 class="mb-5 font-display text-lg font-bold text-ink dark:text-white">Replies</h3>
              <ul class="space-y-4">
                {#each replies as reply (reply.id)}
                  <li class="flex gap-3 rounded-xl p-4 transition-colors hover:bg-ink/5 dark:hover:bg-white/5">
                    {#if reply.author_avatar}
                      <img src={reply.author_avatar} alt={reply.author_name} width="32" height="32" loading="lazy" class="h-8 w-8 flex-shrink-0 rounded-full object-cover" />
                    {:else}
                      <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style="background: {avatarColor(reply.author_name)}">
                        {reply.author_name.split(' ').map((n) => n[0]).join('')}
                      </div>
                    {/if}
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 text-sm">
                        <span class="font-semibold text-ink dark:text-white">{reply.author_name}</span>
                        <span class="text-xs text-ink-light dark:text-slate-500">{timeAgo(reply.created_at)}</span>
                      </div>
                      <p class="mt-1 text-sm text-ink-light dark:text-slate-300">{reply.content}</p>
                    </div>
                  </li>
                {/each}
              </ul>
            </div>
          </Reveal>
        {/if}

        {#if !locked}
          <Reveal>
            <div class="mt-8 glass rounded-2xl p-6">
              <h3 class="mb-4 font-display text-lg font-bold text-ink dark:text-white">Join the discussion</h3>
              {#if signedIn}
                <form method="POST" action="?/reply" use:enhance>
                  <textarea
                    name="content"
                    required
                    rows={4}
                    placeholder="Write your reply…"
                    class="w-full rounded-xl border border-slate-200/80 bg-fog-light px-4 py-3 text-sm text-ink outline-none focus:border-primary-500 dark:border-white/10 dark:bg-night-lighter dark:text-white resize-y"
                  ></textarea>
                  <div class="mt-4 flex items-center gap-3">
                    <button type="submit" class="btn-gradient !px-5 !py-2.5 !text-sm">
                      <Send size={14} /> Post reply
                    </button>
                    {#if submitMsg}
                      {#if submitOk}
                        <p class="text-sm font-medium text-emerald-500">{submitMsg}</p>
                      {:else}
                        <p class="text-sm font-medium text-secondary-500">{submitMsg}</p>
                      {/if}
                    {/if}
                  </div>
                </form>
              {:else}
                <a href="/auth/login?redirect=/forum/thread/{thread.id}" class="btn-gradient !px-5 !py-2.5 !text-sm">
                  <LogIn size={14} /> Sign in to reply
                </a>
              {/if}
            </div>
          </Reveal>
        {/if}
      </div>
    </section>
  </div>
{:else}
  <div class="flex min-h-screen items-center justify-center">
    <p class="text-ink-light dark:text-slate-400">Thread not found.</p>
  </div>
{/if}