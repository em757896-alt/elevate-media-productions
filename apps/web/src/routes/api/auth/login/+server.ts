import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
  throw error(503, 'Sign in is temporarily disabled while we finish the member dashboards. Please check back soon.');
};