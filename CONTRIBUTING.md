```
# Contributing

Hey, welcome to the project. Read this before you start pushing stuff so we're all on the same page.

---

## Project Structure

Our project is a frontend-only Astro application with TypeScript and SCSS.

```
frontend/
├── public/               # Static assets (images, favicon, etc.)
│   ├── backgrounds/      # Background images
│   ├── cards/            # Card images (generated)
│   ├── icons/            # Icon assets
│   └── keypages/         # Page-specific assets
├── src/
│   ├── assets/           # Source assets (SVGs, etc.)
│   ├── components/       # Astro components (.astro)
│   ├── data/             # Static data (cards.json)
│   ├── layouts/          # Astro layout components
│   ├── pages/            # Route pages (index.astro, etc.)
│   ├── scripts/          # Client-side TypeScript
│   │   └── ts/           # TypeScript source files
│   ├── styles/           # Styles
│   │   └── scss/         # SCSS partials and main entry
│   └── types/            # TypeScript type definitions
├── astro.config.mjs      # Astro configuration
├── eslint.config.ts      # ESLint configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── ...                   # Other config files
```

- **`src/components/`** – Reusable Astro components (e.g., `cardGenerator.astro`). Keep them small and focused.
- **`src/pages/`** – Each `.astro` file here becomes a route. Keep routing logic minimal.
- **`src/scripts/ts/`** – All client‑side TypeScript logic. Use ES modules, import/export.
- **`src/styles/scss/`** – SCSS files; use partials (`_variables.scss`, `_fonts.scss`) and a main entry (`main.scss`).
- **`src/types/`** – Shared TypeScript interfaces/types used across the project.
- **`src/data/`** – Static JSON data (e.g., card definitions). Treat as read‑only.

> **Important**: Do not put client‑side logic inside `.astro` components. Use the `scripts/` folder and import them via `<script>` tags when needed.

---

## Tooling

We use the following tools:

- **Node.js** (version 20 or later) – runtime environment.
- **npm** – package manager (we use `package-lock.json`).
- **Astro** – framework for building the site.
- **TypeScript** – typed JavaScript superset.
- **SCSS** – CSS preprocessor.
- **ESLint** – code linting (configuration in `eslint.config.ts`).
- **VS Code** (recommended) – with extensions:
  - Astro (`astro-build.astro-vscode`)
  - ESLint (`dbaeumer.vscode-eslint`)
  - Prettier (optional, but we don't enforce a formatter yet)

**Development workflow**:

```bash
cd frontend
npm install          # install dependencies
npm run dev          # start dev server with hot reload
npm run build        # build for production
npm run preview      # preview production build locally
npm run lint         # run ESLint
npm run typecheck    # run TypeScript type checking
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
> Always run `npm run lint` and `npm run typecheck` before committing.

---

## Branching

We work off `dev`, not `main`.

- `main` – stable, production‑ready code only. Don't push directly here.
- `dev` – integration branch. Features land here after review.
- `feature/your-thing` – your working branch. Branch off `dev`, work here, PR back into `dev`.

```bash
# start a new feature
git checkout dev
git pull origin dev
git checkout -b feature/drag-improvements

# when you're done
git push origin feature/drag-improvements
# then open a PR into dev on GitHub
```

> When `dev` is stable and tested, we merge it into `main` together (usually after a release).

---

## Commit Messages

We follow **Conventional Commits** with a scope. This makes our history readable and helps with automated changelog generation.

Format:

```
<type>(<scope>): <subject>
```

- `type`: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
- `scope`: the module/area affected (e.g., `drag`, `imex`, `search`, `card`, `styles`, `config`)
- `subject`: present tense, lowercase, no period at the end

Examples:

```
feat(drag): implement pointer drag system
fix(imex): correct slot assignment on import
refactor(styles): migrate card styling to SCSS modules
docs(contrib): update CONTRIBUTING.md
chore(deps): bump astro to v4.5.0
```

If you need to provide more context, leave a blank line and write a short paragraph below.

---

## Pull Requests

- No pushing directly to `main` or `dev` – everything goes through a PR.
- Keep PRs small and focused. One feature/bug per PR.
- Write a clear description:
  - What does it do?
  - Why is it needed?
  - Any specific points to review (edge cases, performance, etc.)
- Link any related issue if applicable.
- Ensure CI passes (lint, typecheck, build).
- At least one approval from another team member is required before merging.

---

## Code Style

We have a dedicated [STYLE.md](./STYLE.md) for formatting and naming conventions. Please read it.

Key points:

- 2‑space indentation, no tabs.
- Same‑line braces.
- Use `const` and `let`, never `var`.
- Explicit types, avoid `any`.
- Use ES modules (`import`/`export`).
- Write comments for *why*, not *what*.
- No `console.log` in production code; use `console.debug` or remove before PR.

---

## Testing

Currently we don't have a formal test suite, but we aim to:

- Manually test all new features in the browser (check console for errors).
- Test across at least Chrome and Firefox.
- For drag‑and‑drop, test touch events as well (if applicable).

> If you add a feature that changes state (like slot assignments), test the import/export flow too.

---

## What Not To Do

- Don't commit `node_modules/` or any generated build output (`.astro/`, `dist/`).
- Don't push large binary files (images) – if necessary, use a CDN or commit only small assets.
- Don't leave debugging code (`console.log`, `debugger`) in your PR.
- Don't use magic numbers/strings – define them as `const` at the top of the file or in a `constants.ts`.
- Don't ignore TypeScript errors – fix them or use `// @ts-expect-error` with a comment.
- Don't commit directly to `main` or `dev` – always use feature branches.

---

## CI / CD (Continuous Integration / Deployment)

We use GitHub Actions (or similar) to:

- Run ESLint on every PR.
- Run TypeScript type checking.
- Build the project to ensure no build failures.
- (Optional) Deploy to production when merged to `main`.

> If you add a new npm script, make sure it's included in the CI workflow.

---

## Code of Conduct

We aim to maintain a respectful and collaborative environment. Be kind, give constructive feedback, and assume good intentions.

---

## Questions?

If anything is unclear, open an issue or ask in the team chat. This document is a living guide – if you think something should be added or changed, propose an update.



