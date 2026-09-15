# Changelog

All notable changes to this repository are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-09-15

### Added

- **Official brand platform** (`apps/web/`) — SvelteKit 2 + Svelte 5 + Tailwind CSS 4
  - Animated landing page with glass-morphism design system
  - Authentication (login, signup, password reset) — Supabase-ready
  - Developer forum with categories, threads, replies and voting
  - Portfolio gallery with live demos and source links
  - Blog with markdown-style articles
  - Admin dashboard (projects, blog, forum moderation, users)
  - Dark / light theme with responsive layout
- **`elevate-web-starter`** (`starters/elevate-web-starter/`) — reusable SvelteKit + Tailwind 4 landing template
- **Brand video generator** (`apps/web/tools/video/`) — local ffmpeg zoompan + edge-tts voiceover pipeline
- **Idempotent Supabase schema** — `apps/web/supabase/schema.sql` ready for re-runs
- **CI/CD pipeline** — `svelte-check` + production build on every push (GitHub Actions)
- **Docs** — getting started, starter usage, deployment guides

---

_Prior to v1.0 this repo contained only internal development artifacts. This is the first public release._