# Contributing to Elevate Media Productions

Thanks for wanting to improve this repo! Every contributor — whether you found a typo,
fixed a bug, or shipped a whole new starter — makes this project stronger.

## Code of conduct

Be kind and professional. Comments, issues and PRs should stay constructive and inclusive.

## How to contribute

1. **Fork** the repository and clone it locally:
   ```bash
   git clone https://github.com/em757896-alt/elevate-media-productions.git
   cd elevate-media-productions
   ```
2. **Create a branch** for your work:
   ```bash
   git checkout -b feat/my-change
   ```
3. Make your changes. Follow the existing code style and conventions (see below).
4. **Test your changes**:
   ```bash
   cd apps/web
   npm install
   npm run check   # svelte-check / type safety
   npm run build   # production build
   ```
5. Commit with a clear, conventional message:
   ```
   feat(web): add pricing section to contact page
   fix(starter): correct theme toggle hydration
   chores: bump svelte-check to 4.x
   ```
6. Push and **open a pull request**. Describe what changed and why, and reference any related issue.

## Reporting issues

- Use the [issue tracker](https://github.com/em757896-alt/elevate-media-productions/issues).
- Include: what happened, what you expected, steps to reproduce, and your environment (OS, Node version).
- For a bug in the website, note the URL and browser.
- Feature requests are welcome as issues labelled `enhancement`.

## Style guide

- **Svelte 5 runes** for state (`$state`, `$derived`, `$props`) — no legacy stores where avoidable.
- **TypeScript** everywhere; avoid `any` unless there is no reasonable alternative.
- Components live in `src/lib/components/` split into `ui/`, `layout/` and `sections/`.
- Design tokens live in `src/app.css` (Tailwind v4 `@theme`). Prefer tokens over magic values.
- Keep components focused; reuse existing primitives (`Reveal`, `SectionHeading`, `Logo`).

## Docs & starters

If you ship code for `starters/`, update the matching guide in `docs/` so the next developer
isn't lost. New starters should keep the same tooling (SvelteKit + Tailwind 4) unless there's
a strong reason not to.

## Licensing

By contributing you agree your work is licensed under the same [MIT License](LICENSE) that
covers this repository.

Questions? Open a discussion — we reply fast.