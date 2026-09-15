# Elevate Web Starter

A lightweight, production-ready **SvelteKit 2 + Svelte 5 + Tailwind CSS 4** landing template with
dark mode, motion and SEO boilerplate. MIT licensed — use it for anything.

## Features

- SvelteKit 2 / Svelte 5 (runes) — compiled, tiny bundles
- Tailwind CSS 4 — CSS-first, token-based theming
- Dark / light theme with localStorage persistence (no flash)
- `Reveal` scroll-animation component (respects reduced motion)
- Responsive hero, features, steps and CTA sections
- Visitor-visible React-free stack; deploys anywhere via `adapter-auto`

## Get started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Customize

- **Colors**: edit the `@theme` block in `src/app.css`.
- **Fonts**: swap the `@fontsource-variable` imports in `+layout.svelte`.
- **Content**: edit sections in `src/routes/+page.svelte`.

## Deploy

```bash
npm run build
vercel --prod      # or any static host
```

### Note on lockfile

A `package-lock.json` is generated on first `npm install` for reproducible CI builds. Commit it.

## License

MIT — see the repo root `LICENSE`. Built by [Elevate Media Productions](https://elevate-media-productions.vercel.app).