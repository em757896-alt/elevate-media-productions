import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';

export function createSupabaseServerClient(cookies: Cookies) {
  const url =
    env.SUPABASE_URL ??
    (import.meta.env.VITE_SUPABASE_URL as string | undefined);
  const anonKey =
    env.SUPABASE_ANON_KEY ??
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);
  if (!url || !anonKey) return null;

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookies.get(name) ?? null;
      },
      set(name: string, value: string, options: CookieOptions) {
        // Note: not HttpOnly — the browser client must read auth cookies to keep
        // client-side RLS queries working. XSS hardening comes via strict CSP,
        // Svelte auto-escaping and SameSite/Secure attributes.
        cookies.set(name, value, {
          ...options,
          secure: true,
          sameSite: 'lax',
          httpOnly: false,
          path: '/'
        });
      },
      remove(name: string, options: CookieOptions) {
        cookies.delete(name, {
          ...options,
          secure: true,
          sameSite: 'lax',
          httpOnly: false,
          path: '/'
        });
      }
    }
  });
}

export type SupabaseServerClient = NonNullable<ReturnType<typeof createSupabaseServerClient>>;