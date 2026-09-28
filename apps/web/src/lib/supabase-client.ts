import { createBrowserClient, isBrowser } from '@supabase/ssr';
import type { CookieMethodsBrowser } from '@supabase/ssr/dist/main/types';
import type { Session, SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const cookies: CookieMethodsBrowser = {
  getAll() {
    if (!isBrowser()) return null;
    const out: { name: string; value: string }[] = [];
    for (const part of document.cookie.split(';')) {
      const idx = part.indexOf('=');
      if (idx === -1) continue;
      out.push({
        name: part.slice(0, idx).trim(),
        value: part.slice(idx + 1).trim()
      });
    }
    return out;
  },
  setAll(items) {
    if (!isBrowser()) return;
    for (const { name, value, options } of items) {
      const maxAge = options?.maxAge ?? 60 * 60 * 24 * 60;
      document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; samesite=lax; secure`;
    }
  }
};

function createPublicClient(): SupabaseClient | null {
  if (!url || !anonKey) return null;

  return createBrowserClient(url, anonKey, { cookies });
}

export const clientSupabase = createPublicClient();

export type BrowserSupabase = typeof clientSupabase;

export function getClientSession(): Promise<{ data: { session: Session | null } }> {
  if (!clientSupabase) return Promise.resolve({ data: { session: null } });
  return clientSupabase.auth.getSession();
}