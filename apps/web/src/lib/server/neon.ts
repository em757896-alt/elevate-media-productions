import { env } from '$env/dynamic/private';
import { neon } from '@neondatabase/serverless';

let client: ReturnType<typeof neon> | null = null;

export function database() {
  const url = (env.DATABASE_URL ?? '').trim();
  if (!url) throw new Error('DATABASE_URL is not configured');
  if (!client) client = neon(url);
  return client;
}
