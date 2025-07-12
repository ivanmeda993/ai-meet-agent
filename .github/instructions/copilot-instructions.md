---
applyTo: '**'
---

# Copilot Instructions for ai-meet-agent

## Project Overview

- **Framework:** Next.js (App Router, TypeScript)
- **UI:** Custom component library in `src/components/ui/` (Radix UI + Tailwind)
- **Database:** PostgreSQL via Drizzle ORM, schema in `src/db/schema.ts`
- **Env Management:** Zod-validated, see `src/lib/env.ts`

## Key Patterns & Conventions

- **UI Components:**
  - All reusable UI is in `src/components/ui/`.
  - Components use Tailwind, Radix primitives, and utility `cn()` from `src/lib/utils.ts`.
  - Props and slots are preferred for composition (see `button.tsx`, `accordion.tsx`).
- **Database:**
  - Use Drizzle ORM, schema defined in `src/db/schema.ts`.
  - DB connection via `src/db/index.ts` using env var `DATABASE_URL`.
  - Migrations/config: see `drizzle.config.ts` and `db:push` script.
- **Environment:**
  - All env vars are validated at runtime with Zod (`src/lib/env.ts`).
  - Add new envs to the schema and use `ENV` export.
- **Styling:**
  - Tailwind CSS is used throughout, with `twMerge` for class merging.
  - Prettier and ESLint are enforced (see configs for rules and formatting).
- **Imports:**
  - Use `@/` alias for `src/` (see `tsconfig.json`).
  - Import sorting and unused removal are enforced by ESLint.

## Developer Workflows

- **Start Dev Server:** `npm run dev` (uses Turbopack)
- **Build:** `npm run build`
- **Lint & Format:**
  - Lint: `npm run lint` or `npm run lint:fix`
  - Format: `npm run format` or `npm run lint:format`
- **DB Migration:** `npm run db:push` (uses Drizzle Kit)

## Integration Points

- **Radix UI:** All interactive UI is built on Radix primitives.
- **Drizzle ORM:** All DB access via Drizzle; do not use raw SQL.
- **Zod:** All runtime validation (env, forms) uses Zod schemas.

## Examples

- **Add a UI component:** Place in `src/components/ui/`, use Tailwind, export as named export.
- **Add a DB table:** Edit `src/db/schema.ts`, run `npm run db:push`.
- **Add env var:** Update Zod schema in `src/lib/env.ts` and use `ENV`.

## References

- `README.md`: Basic project info and Next.js links
- `src/components/ui/`: UI patterns
- `src/db/`: DB schema and connection
- `src/lib/env.ts`: Env validation
- `eslint.config.mjs`, `prettier.config.js`: Lint/format rules

---

If a pattern or workflow is unclear, ask for clarification or check the referenced files.
