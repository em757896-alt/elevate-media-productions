import type { RequestHandler } from './$types';
import { projects } from '$lib/data/projects';

const SITE = 'https://elevatemediaproductions.cc';
const xmlEscape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');

export const GET: RequestHandler = async ({ locals }) => {
  const entries = new Map<string, { lastmod?: string; changefreq: string; priority: string }>();
  const add = (path: string, options: { lastmod?: string; changefreq?: string; priority?: string } = {}) => {
    entries.set(path, { lastmod: options.lastmod, changefreq: options.changefreq ?? 'monthly', priority: options.priority ?? '0.6' });
  };
  add('/', { changefreq: 'weekly', priority: '1.0' });
  add('/portfolio', { changefreq: 'weekly', priority: '0.8' });
  add('/blog', { changefreq: 'daily', priority: '0.9' });
  add('/services', { priority: '0.8' });
  add('/about', { priority: '0.7' });
  add('/contact', { priority: '0.6' });
  for (const project of projects) add('/portfolio/' + project.slug, { lastmod: project.updated_at, priority: '0.7' });
  if (locals.supabase) {
    const { data: posts } = await locals.supabase.from('posts').select('slug,updated_at,published_at').eq('published', true);
    for (const post of posts ?? []) add('/blog/' + post.slug, { lastmod: post.updated_at ?? post.published_at, priority: '0.8' });
    const { data: authors } = await locals.supabase.from('profiles').select('username,created_at').eq('is_author', true);
    for (const author of authors ?? []) if (author.username) add('/authors/' + author.username, { lastmod: author.created_at, priority: '0.5' });
  }
  const urls = [...entries.entries()].map(([path, meta]) => {
    const lastmod = meta.lastmod ? '<lastmod>' + xmlEscape(new Date(meta.lastmod).toISOString()) + '</lastmod>' : '';
    return '<url><loc>' + SITE + xmlEscape(path) + '</loc>' + lastmod + '<changefreq>' + meta.changefreq + '</changefreq><priority>' + meta.priority + '</priority></url>';
  }).join('');
  return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls + '</urlset>', {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=300, s-maxage=3600' }
  });
};