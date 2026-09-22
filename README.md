<p align="center">
  <img src="apps/web/static/favicon.svg" width="96" alt="Elevate Media Productions logo" />
</p>

<h1 align="center">Elevate Media Productions</h1>

<p align="center">
  <strong>A digital studio building web apps, mobile apps and brand platforms.</strong>
  <br />
  This monorepo holds our open-source flagships: the official brand platform, reusable starters,
  and developer tooling — free to use, fork and learn from.
</p>

<p align="center">
  <a href="https://elevate-media-productions.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-vercel.app-111?style=for-the-badge&logo=vercel" alt="Live demo" /></a>
  <a href="https://github.com/em757896-alt/elevate-media-productions/stargazers"><img src="https://img.shields.io/github/stars/em757896-alt/elevate-media-productions?style=for-the-badge&logo=github&color=ffd166" alt="Stars" /></a>
  <a href="https://github.com/em757896-alt/elevate-media-productions/releases"><img src="https://img.shields.io/github/v/release/em757896-alt/elevate-media-productions?style=for-the-badge&color=06d6a0" alt="Release" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge&color=118ab2" alt="License" /></a>
</p>

---

## Why this exists

Most developer portfolios are a gallery of screenshots. **This repo is the opposite** — it ships real,
working software you can run, remix and ship:

- 🔍 **Curious how we build fast, animated, accessible product sites?** — read the source of our own brand platform.
- 🚀 **Need a landing page / marketing site starter?** — grab `starters/elevate-web-starter` and deploy in minutes.
- 🧱 **Looking for production patterns** (theme system, auth, forms, Supabase sync)? — every piece here is battle-tested in production.

**The problem it solves:** starting a polished, conversion-focused website today still means stitching
together Tailwind config, fonts, dark mode, animations and a CMS manually. This repo removes that boilerplate.
**The solution:** a design-system-first SvelteKit stack, documented and reusable.

## What's inside

```
elevate-media-productions/
├── apps/
│   └── web/                        # Official brand platform (this website)
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/     # UI primitives, layout, sections
│       │   │   ├── data/           # Seed content (projects, blog, forum)
│       │   │   └── config.ts       # Site-wide defaults & socials
│       │   └── routes/             # Home, about, services, portfolio, blog, forum, auth, dashboard
│       ├── supabase/schema.sql     # Auth + forum schema (idempotent)
│       └── tools/video/            # Local brand-video generator (ffmpeg zoompan + voiceover)
├── starters/
│   └── elevate-web-starter/        # 🌱 Reusable SvelteKit + Tailwind 4 landing-page starter
├── docs/                           # Guides (starter usage, deploying, extending)
├── CONTRIBUTING.md                 # How to contribute
├── ROADMAP.md                      # Where this is heading
└── CHANGELOG.md                    # Releases and notable changes
```

## ⚡ The starter

`starters/elevate-web-starter` is a complete, production-ready SvelteKit 2 + Svelte 5 + Tailwind CSS 4
landing template with:

- 🌗 Dark / light theme with a glass-morphism design system
- ✨ Motion primitives (scroll reveals, floats) — no heavy animation libs
- 🎯 SEO-ready meta + Open Graph boilerplate
- 📱 Truly responsive layout
- 🔤 Font loading (Inter, Space Grotesk, Poppins)

Run it:

```bash
cd starters/elevate-web-starter
npm install
npm run dev          # → http://localhost:5173
npm run build        # production build
```

See [`docs/STARTER.md`](docs/STARTER.md) for setup, customization and deployment.

## Running the brand platform

```bash
cd apps/web
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The site runs on seeded data with no external
services, so every page is browsable immediately. To connect Supabase auth + forum, copy
`.env.example` to `.env`, add your keys and run `supabase/schema.sql`. See
[`apps/web/README.md`](apps/web/README.md).

## Tech stack

| Layer          | Choice                                   |
| -------------- | ---------------------------------------- |
| Framework      | SvelteKit 2 / Svelte 5 (runes)           |
| Styling        | Tailwind CSS 4 (CSS-first config)        |
| Database / Auth| Supabase (PostgreSQL + Auth, optional)   |
| Icons          | lucide-svelte                            |
| Deployment     | Vercel (`@sveltejs/adapter-auto`)        |

## Roadmap (highlights)

- `elevate-web-starter` v1.0 — theme tokens, components, docs (in progress)
- UI component library + `svelte` re-exports for drop-in usage
- More starters: auth boilerplate, blog template
- CI/CD for every starter (build + check on push)

See [ROADMAP.md](ROADMAP.md) and [CHANGELOG.md](CHANGELOG.md).

## Contributing

Found a bug, want a feature, or built something cool on top of this? Contributions are welcome.
Please read [CONTRIBUTING.md](CONTRIBUTING.md), open an [issue](https://github.com/em757896-alt/elevate-media-productions/issues)
or start a [discussion](https://github.com/em757896-alt/elevate-media-productions/discussions).

## Community

- 🌐 Website: [elevate-media-productions.vercel.app](https://elevate-media-productions.vercel.app)
- 👾 Reddit: [u/ElevateMediaProd](https://www.reddit.com/user/ElevateMediaProd/)
- 📧 Email: **[elevatemediaproductions1@gmail.com](mailto:elevatemediaproductions1@gmail.com)**
- 💬 WhatsApp: `+254 775 333 673`
- 📞 Call: `+254 111 275 630`

## License

Released under the [MIT License](LICENSE). Use it, learn from it, ship with it — just keep the license
file and give credit where it's due.