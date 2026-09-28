<script lang="ts">
  import { Download, Trash2 } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  let status = $state<'idle' | 'exporting' | 'deleting' | 'error'>('idle');
  let message = $state('');

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
      a.download = `elevate-data-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      status = 'idle';
    } catch (err) {
      status = 'error';
      message = (err as { message?: string }).message ?? 'Something went wrong.';
    }
  }

  async function onDelete() {
    const confirmed = window.confirm(
      'This permanently deletes your account, profile and all content you authored. This cannot be undone. Continue?'
    );
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
  <title>Settings — Dashboard — Elevate Media Productions</title>
</svelte:head>

<div class="mx-auto max-w-2xl">
  <header class="mb-8">
    <h1 class="font-display text-2xl font-bold text-ink dark:text-white">Settings</h1>
    <p class="mt-1 text-sm text-ink-light dark:text-slate-400">
      Your data rights under the Kenya Data Protection Act and GDPR.
    </p>
  </header>

  {#if message}
    <p class="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400" role="alert">
      {message}
    </p>
  {/if}

  <div class="glass rounded-2xl">
    <div class="flex items-start justify-between gap-4 border-b border-slate-200/60 p-6 dark:border-white/10">
      <div>
        <h2 class="font-display text-base font-bold text-ink dark:text-white">Download your data</h2>
        <p class="mt-1 text-sm text-ink-light dark:text-slate-400">
          Get a machine-readable copy of your profile and contributions (right of access / data portability).
        </p>
      </div>
      <button
        class="btn-gradient flex flex-shrink-0 items-center gap-2 !px-4 !py-2 !text-sm"
        onclick={onExport}
        disabled={status === 'exporting'}
      >
        <Download size={15} />
        {status === 'exporting' ? 'Preparing...' : 'Export'}
      </button>
    </div>

    <div class="p-6">
      <h2 class="font-display text-base font-bold text-ink dark:text-white">Delete your account</h2>
      <p class="mt-1 text-sm text-ink-light dark:text-slate-400">
        Permanently remove your account and all associated data (right to erasure / "right to be forgotten").
      </p>
      <button
        class="mt-4 flex items-center gap-2 rounded-xl border border-red-300/70 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
        onclick={onDelete}
        disabled={status === 'deleting'}
      >
        <Trash2 size={15} />
        {status === 'deleting' ? 'Deleting...' : 'Delete account'}
      </button>
    </div>
  </div>
</div>