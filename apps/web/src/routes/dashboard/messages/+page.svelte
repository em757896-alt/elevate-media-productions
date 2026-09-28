<script lang="ts">
  import { Send, MessageCircle, Users, Search, RefreshCw } from 'lucide-svelte';
  import { avatarColor, timeAgo } from '$lib/utils';

  let { data } = $props();

  const me = $derived(data.me);
  const members = $derived(data.members);
  const configured = $derived(data.configured);

  type ChatMessage = {
    id: string;
    sender_id: string;
    recipient_id: string;
    content: string;
    read_at: string | null;
    created_at: string;
  };

  let search = $state('');
  let partnerId = $state('');
  let messages = $state<ChatMessage[]>([]);
  let text = $state('');
  let loading = $state(false);
  let error = $state('');
  let polling = $state(false);

  const filteredMembers = $derived(
    search.trim()
      ? members.filter((m) =>
          `${m.full_name ?? ''} ${m.username ?? ''}`.toLowerCase().includes(search.toLowerCase())
        )
      : members
  );

  function partnerName(id: string) {
    return members.find((m) => m.id === id)?.full_name ?? members.find((m) => m.id === id)?.username ?? 'Member';
  }

  async function openPartner(id: string) {
    partnerId = id;
    error = '';
    await loadMessages();
    startPolling();
  }

  async function loadMessages() {
    if (!partnerId) return;
    loading = true;
    try {
      const res = await fetch(`/api/messages?with=${encodeURIComponent(partnerId)}`);
      if (res.ok) {
        const json = await res.json();
        messages = json.messages ?? [];
      } else {
        const body = await res.json().catch(() => ({}));
        error = body.message ?? 'Could not load messages.';
      }
    } catch {
      error = 'Could not load messages.';
    } finally {
      loading = false;
    }
  }

  let timer: ReturnType<typeof setInterval> | null = null;
  function startPolling() {
    if (timer) clearInterval(timer);
    polling = true;
    timer = setInterval(async () => {
      if (!partnerId) return;
      const res = await fetch(`/api/messages?with=${encodeURIComponent(partnerId)}`);
      if (res.ok) {
        const json = await res.json();
        messages = json.messages ?? [];
      }
    }, 8000);
  }

  async function sendMessage(e: Event) {
    e.preventDefault();
    const content = text.trim();
    if (!content || !partnerId) return;
    text = '';
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient_id: partnerId, content })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        error = body.message ?? 'Could not send message.';
        return;
      }
      await loadMessages();
    } catch {
      error = 'Could not send message.';
    }
  }
</script>

<svelte:head>
  <title>Messages — Dashboard</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="font-display text-2xl font-bold text-ink dark:text-white">Messages</h1>
      <p class="mt-1 text-sm text-ink-light dark:text-slate-400">Private 1:1 conversations with community members.</p>
    </div>
    {#if polling}
      <span class="inline-flex items-center gap-1.5 text-xs text-ink-light dark:text-slate-500">
        <RefreshCw size={13} class="animate-spin" /> live
      </span>
    {/if}
  </div>

  {#if !configured || !me}
    <div class="glass rounded-2xl p-10 text-center">
      <MessageCircle size={36} class="mx-auto mb-3 text-ink/20 dark:text-white/20" />
      <p class="text-sm text-ink-light dark:text-slate-400">Direct messaging is only available to signed-in members.</p>
    </div>
  {:else}
    <div class="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div class="glass rounded-2xl p-4">
        <div class="mb-4 flex items-center gap-2 px-1">
          <Users size={16} class="text-primary-500" />
          <h3 class="font-display text-sm font-bold text-ink dark:text-white">Members</h3>
        </div>
        <label class="relative mb-3 block">
          <Search size={14} class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-light dark:text-slate-500" />
          <input
            type="text"
            bind:value={search}
            placeholder="Search members…"
            class="w-full rounded-xl border border-slate-200/80 bg-fog-light py-2 pl-9 pr-3 text-sm text-ink outline-none focus:border-primary-500 dark:border-white/10 dark:bg-night-lighter dark:text-white"
          />
        </label>
        <ul class="space-y-1 overflow-y-auto max-h-[520px]">
          {#each filteredMembers as m (m.id)}
            <li>
              <button
                type="button"
                onclick={() => openPartner(m.id)}
                class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-ink/5 dark:hover:bg-white/5 {partnerId === m.id ? 'bg-primary-500/10' : ''}"
              >
                {#if m.avatar_url}
                  <img src={m.avatar_url} alt={m.full_name ?? 'Member'} width="36" height="36" loading="lazy" class="h-9 w-9 flex-shrink-0 rounded-full object-cover" />
                {:else}
                  <span class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style="background: {avatarColor(m.full_name ?? m.username ?? m.id)}">
                    {(m.full_name ?? m.username ?? 'M').slice(0, 1).toUpperCase()}
                  </span>
                {/if}
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-sm font-medium text-ink dark:text-white">{m.full_name ?? m.username ?? 'Member'}</span>
                  <span class="block truncate text-xs text-ink-light dark:text-slate-500">{m.role}</span>
                </span>
              </button>
            </li>
          {/each}
          {#if filteredMembers.length === 0}
            <li class="px-3 py-6 text-center text-xs text-ink-light dark:text-slate-500">No members found.</li>
          {/if}
        </ul>
      </div>

      <div class="glass flex min-h-[440px] flex-col rounded-2xl">
        {#if partnerId}
          <div class="flex items-center gap-3 border-b border-slate-200/50 px-6 py-4 dark:border-white/10">
            <span class="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white" style="background: {avatarColor(partnerName(partnerId))}">
              {partnerName(partnerId).slice(0, 1).toUpperCase()}
            </span>
            <span class="font-display text-sm font-bold text-ink dark:text-white">{partnerName(partnerId)}</span>
          </div>

          <div class="flex-1 space-y-3 overflow-y-auto p-6" style="max-height: 420px;">
            {#if loading}
              <p class="text-center text-xs text-ink-light dark:text-slate-500">Loading messages…</p>
            {:else if messages.length === 0}
              <p class="py-10 text-center text-sm text-ink-light dark:text-slate-500">
                No messages yet. Say hello to {partnerName(partnerId)}!
              </p>
            {:else}
              {#each messages as msg (msg.id)}
                <div class="flex {msg.sender_id === me.id ? 'justify-end' : 'justify-start'}">
                  <div class="max-w-[75%] rounded-2xl px-4 py-2.5 text-sm {msg.sender_id === me.id ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white' : 'bg-ink/5 text-ink dark:bg-white/5 dark:text-slate-200'}">
                    <p class="whitespace-pre-wrap break-words">{msg.content}</p>
                    <p class="mt-1 text-[10px] opacity-60">{timeAgo(msg.created_at)}</p>
                  </div>
                </div>
              {/each}
            {/if}
          </div>

          {#if error}
            <p class="px-6 pb-2 text-xs font-medium text-secondary-500">{error}</p>
          {/if}

          <form onsubmit={sendMessage} class="flex items-center gap-3 border-t border-slate-200/50 px-6 py-4 dark:border-white/10">
            <textarea
              bind:value={text}
              rows={2}
              placeholder="Write a message…"
              class="flex-1 resize-none rounded-xl border border-slate-200/80 bg-fog-light px-4 py-2.5 text-sm text-ink outline-none focus:border-primary-500 dark:border-white/10 dark:bg-night-lighter dark:text-white"
            ></textarea>
            <button type="submit" class="btn-gradient !px-4 !py-2.5">
              <Send size={15} /> Send
            </button>
          </form>
        {:else}
          <div class="flex flex-1 flex-col items-center justify-center p-10 text-center">
            <MessageCircle size={40} class="mb-4 text-ink/20 dark:text-white/20" />
            <h3 class="font-display text-base font-bold text-ink dark:text-white">Select a member to start chatting</h3>
            <p class="mt-1 max-w-sm text-sm text-ink-light dark:text-slate-500">Pick someone from the members list on the left to open your private conversation.</p>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>