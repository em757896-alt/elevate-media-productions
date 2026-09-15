# Starter Guide

A practical walkthrough for using `starters/elevate-web-starter` and the video tooling.

## elevate-web-starter

A self-contained SvelteKit 2 + Tailwind 4 landing template with dark mode, motion and a glass design system.

### Quick start

```bash
cd starters/elevate-web-starter
npm install
npm run dev
# → http://localhost:5173
```

### Structure

```
src/
├── app.html            # HTML shell
├── app.css             # Tailwind v4 theme (design tokens)
└── routes/
    ├── +layout.svelte  # Theme provider + global styles
    └── +page.svelte    # Hero + Features + CTA — edit or replace these sections
```

### Customising

**Colours** — open `src/app.css` and edit the `@theme` block. Every colour is a Tailwind token so changing `--color-primary-500` changes it everywhere.

**Fonts** — Inter and Space Grotesk are loaded via `@fontsource-variable`. To use a different font, swap the imports in `+layout.svelte` and update the `--font-display` / `--font-sans` tokens.

**Sections** — `+page.svelte` is the only route. It ships with a hero, features grid, social proof and a CTA. Replace, rearrange or add sections to match your brand. Motion is built-in (`Reveal` component) so add `Reveal` to any new section for free scroll-triggered animation.

**Theme toggle** — the dark/light switch is a global store wired to `localStorage`. Theme is respected on first load (no flash).

**SEO** — set `<title>` and `<meta>` in `+page.svelte` or extend with `svelte:head` in a layout wrapper.

### Deploying

Works with any static hosting. Examples:

```bash
npm run build          # → dist/ — upload anywhere

# Vercel (recommended):
npm i -g vercel
vercel --cwd .         # or vercel --prod

# Netlify:
npm i -g netlify-cli
netlify deploy
```

`@sveltejs/adapter-auto` auto-detects Vercel/Netlify/Cloudflare.

---

## Brand video generator (`tools/video/`)

Generates promotional videos with Ken Burns motion and edge-tts narration — runs locally, no AI API needed.

### Requirements

- Python 3.11+ (use the Microsoft Store version or download from python.org)
- Pip packages: `imageio-ffmpeg Pillow edge-tts`

### Generate a video

```bash
cd apps/web/tools/video

# 1. Generate narration audio (edge-tts)
python make_narration.py

# 2. Build slides + timed config
python make_welcome_assets.py

# 3. Render
python make_brand_video.py --config welcome_scenes.json --out elevate_welcome.mp4
```

Output: `elevate_welcome.mp4` — a 1080p/30fps video with per-scene voiceover.