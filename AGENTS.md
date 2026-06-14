# AGENTS.md

## Cursor Cloud specific instructions

Devosfera Blog is a single, self-contained **Astro static site** (no backend, no
database, no auxiliary services). Standard commands live in `package.json` and
`README.md`; prefer those. Package manager is **pnpm** (the canonical/documented
path; a `bun.lock` also exists because CI uses bun, but pnpm is primary).

Services / commands (run from repo root):
- `pnpm run dev` — dev server with HMR at http://localhost:4321 (the main dev workflow).
- `pnpm run build` — `astro check` + static build + Pagefind search index. The
  Pagefind (⌘K) search index only exists after a build, so to exercise search
  locally run `pnpm run build` then `pnpm run dev`/`pnpm run preview`.
- `pnpm run lint` — ESLint. Note: there is a **pre-existing** lint error
  (`@typescript-eslint/no-explicit-any` in `src/layouts/Layout.astro`) that fails
  `pnpm run lint`; it is unrelated to environment setup.

Non-obvious gotchas:
- **Single Astro config.** Astro resolves `astro.config.mjs` before
  `astro.config.ts`. The repo previously shipped a stale `astro.config.mjs` that
  shadowed the real `astro.config.ts`, which silently dropped the `fonts` config
  and made env vars required — breaking **every** page with
  `FontFamilyNotFound: "--font-wotfard"` in dev and failing `astro build`/CI. Keep
  `astro.config.ts` as the only Astro config; do not reintroduce `astro.config.mjs`.
- **`.env` is optional.** All `PUBLIC_*` vars are `optional` in `astro.config.ts`;
  unset values simply hide social links. Dev and build both work with no `.env`.
- **Don't delete the `.astro` / cache dirs under a running dev server.** Removing
  `.astro` or `node_modules/.astro` while `pnpm run dev` is running corrupts the
  in-memory content collection (posts start 404ing / "collection is empty"). Fix
  by fully restarting the dev server.
