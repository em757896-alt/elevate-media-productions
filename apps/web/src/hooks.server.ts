import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createSupabaseServerClient } from '$lib/server/supabase';
import { consumeRateLimit } from '$lib/server/rate-limit';
import { isBotUserAgent } from '$lib/server/bot';
import { env } from '$env/dynamic/private';

const ALLOWED_ORIGINS = new Set<string>(['https://elevate-media-productions.vercel.app']);
if (env.VERCEL_URL) ALLOWED_ORIGINS.add(`https://${env.VERCEL_URL}`);
for (const key of Object.keys(env)) {
  if (key.startsWith('ORIGIN_')) ALLOWED_ORIGINS.add((env[key] ?? '').trim());
}

const SECURITY_HEADERS: Record<string, string> = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Content-Security-Policy':
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: blob: https://*.supabase.co; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https://*.supabase.co https://challenges.cloudflare.com https://api.brevo.com; " +
    "frame-src 'self' https://challenges.cloudflare.com; " +
    "frame-ancestors 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "object-src 'none'"
};

const RATE_LIMITED_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

async function security({ event, resolve }: Parameters<Handle>[0]) {
  const url = event.url;
  const apiRoute = url.pathname.startsWith('/api/');

  // Bot user-agent blocking for write endpoints (form spam / scraping),
  // but never blocks plain page views — search engine crawlers must index freely.
  if (apiRoute && event.request.method === 'POST') {
    const ua = event.request.headers.get('user-agent') ?? '';
    if (isBotUserAgent(ua)) {
      return new Response('Forbidden', { status: 403 });
    }
  }

  // Origin check on state-changing requests (CSRF defence).
  if (RATE_LIMITED_METHODS.has(event.request.method) && url.pathname.startsWith('/api/')) {
    const origin = event.request.headers.get('origin');
    const secFetchSite = event.request.headers.get('sec-fetch-site');
    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return new Response('Forbidden', { status: 403 });
    }
    if (secFetchSite && secFetchSite === 'cross-site') {
      return new Response('Forbidden', { status: 403 });
    }
  }

  // Global rate limiting on the write-heavy API routes (DDoS / abuse protection).
  if (RATE_LIMITED_METHODS.has(event.request.method) && url.pathname.startsWith('/api/')) {
    const ip = event.getClientAddress();
    const limit = await consumeRateLimit(`api:${url.pathname}:${ip}`, 20, 60);
    if (!limit.allowed) {
      return new Response('Too many requests. Please slow down.', {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil(limit.retryAfter / 1000)) }
      });
    }
  }

  const response = await resolve(event);

  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(name, value);
  }

  return response;
}

async function session({ event, resolve }: Parameters<Handle>[0]) {
  event.locals.supabase = createSupabaseServerClient(event.cookies);
  event.locals.safeGetSession = async () => {
    if (!event.locals.supabase) return { user: null };
    const { data } = await event.locals.supabase.auth.getUser();
    return { user: data?.user ?? null };
  };

  return resolve(event);
}

export const handle: Handle = sequence(security, session);