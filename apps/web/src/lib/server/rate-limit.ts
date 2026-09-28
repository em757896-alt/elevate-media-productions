import { env } from '$env/dynamic/private';

type WindowKey = string;
interface Bucket {
  count: number;
  resetAt: number;
}

// In-memory fallback when Upstash is not configured. Not shared across
// serverless instances — fine for light traffic, upgraded to Upstash when keys exist.
const memory = new Map<WindowKey, Bucket>();

function memCheck(key: WindowKey, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = memory.get(key);
  if (!bucket || now >= bucket.resetAt) {
    memory.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  bucket.count += 1;
  if (bucket.count > limit) {
    return { allowed: false, retryAfter: bucket.resetAt - now };
  }
  return { allowed: true, retryAfter: 0 };
}

async function upstashCheck(key: WindowKey, limit: number, windowSec: number) {
  const url = env.UPSTASH_REDIS_REST_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/window`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ key, limit, window: windowSec * 1000 })
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { success: boolean; allowed: boolean; retryAfter?: number };
    if (!data.success) return null;
    return { allowed: data.allowed, retryAfter: Math.max(0, (data.retryAfter ?? 0) * 1000) };
  } catch {
    return null;
  }
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfter: number;
}

export async function consumeRateLimit(
  key: string,
  limit = 20,
  windowSec = 60
): Promise<RateLimitResult> {
  const fromUpstash = await upstashCheck(key, limit, windowSec);
  if (fromUpstash) return fromUpstash;
  return memCheck(key, limit, windowSec * 1000);
}

export async function isRateLimited(key: string, limit = 20, windowSec = 60): Promise<boolean> {
  const r = await consumeRateLimit(key, limit, windowSec);
  return !r.allowed;
}