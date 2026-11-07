-- Phase 2: editorial newsroom
-- Run once in Supabase SQL Editor after the base schema.sql.
-- Safe to re-run.

create table if not exists public.editorial_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.editorial_categories enable row level security;

drop policy if exists "Editorial categories are public" on public.editorial_categories;
create policy "Editorial categories are public"
  on public.editorial_categories for select using (true);

drop policy if exists "Admins manage editorial categories" on public.editorial_categories;
create policy "Admins manage editorial categories"
  on public.editorial_categories for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

insert into public.editorial_categories (name, slug, description, sort_order) values
  ('Artificial Intelligence', 'artificial-intelligence', 'AI research, models, tools and responsible deployment.', 1),
  ('Web & Software', 'web-software', 'Web platforms, software engineering and developer tools.', 2),
  ('Cybersecurity', 'cybersecurity', 'Security research, privacy, threats and practical defence.', 3),
  ('Mobile & Devices', 'mobile-devices', 'Mobile applications, operating systems and connected devices.', 4),
  ('Business & Innovation', 'business-innovation', 'Technology strategy, startups, digital business and innovation.', 5),
  ('Science & Emerging Tech', 'science-emerging-tech', 'Research, infrastructure and emerging technologies.', 6),
  ('Digital Culture', 'digital-culture', 'How technology affects work, education, society and culture.', 7)
on conflict (slug) do nothing;

alter table public.posts
  add column if not exists category_id uuid references public.editorial_categories(id) on delete set null,
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists canonical_url text,
  add column if not exists source_urls text[] not null default '{}';

alter table public.profiles
  add column if not exists author_headline text,
  add column if not exists expertise text[] not null default '{}',
  add column if not exists website_url text,
  add column if not exists social_links jsonb not null default '{}'::jsonb,
  add column if not exists is_author boolean not null default false;

create index if not exists posts_published_date_idx
  on public.posts (published, published_at desc);
create index if not exists posts_category_id_idx
  on public.posts (category_id);
create index if not exists posts_author_id_idx
  on public.posts (author_id);

create table if not exists public.editorial_ideas (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null default '',
  category_id uuid references public.editorial_categories(id) on delete set null,
  status text not null default 'idea'
    check (status in ('idea', 'researching', 'ready', 'drafting', 'published', 'archived')),
  target_keywords text[] not null default '{}',
  source_urls text[] not null default '{}',
  research_notes text not null default '',
  suggested_angle text not null default '',
  assigned_to uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  post_id uuid references public.posts(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.editorial_ideas enable row level security;

drop policy if exists "Admins manage editorial ideas" on public.editorial_ideas;
create policy "Admins manage editorial ideas"
  on public.editorial_ideas for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create index if not exists editorial_ideas_status_idx
  on public.editorial_ideas (status, updated_at desc);

-- Existing posts retain their current category text; link matching categories.
update public.posts p
set category_id = c.id
from public.editorial_categories c
where p.category_id is null
  and lower(regexp_replace(p.category, '[^a-zA-Z0-9]+', '-', 'g')) = c.slug;

-- Supabase Data API exposure is separate from RLS; grant only the operations needed.
GRANT SELECT ON public.editorial_categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.editorial_categories TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.editorial_ideas TO authenticated;
