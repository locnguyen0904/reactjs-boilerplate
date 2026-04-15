# ReactJS Boilerplate Development Standards

You are working in a production-ready ReactJS SPA boilerplate project. ALWAYS strictly adhere to the following principles before writing any code or making modifications.

## 1. Mandatory Tech Stack

- **Core:** React 19, TypeScript 5 (Strict Mode), Vite, pnpm.
- **Routing:** TanStack Router (File-based routing, auto-generated types).
- **State Management:**
  - Server State: Use `@tanstack/react-query` v5.
  - Global Client State: Use `zustand` v5 (prefer persist middleware if storage is needed).
  - Form/Local State: Use `react-hook-form` + `@hookform/resolvers/zod`.
- **Styling & UI:** Tailwind CSS v4 and shadcn/ui.
- **Data Fetching:** Axios (interceptor already configured in `src/lib/axios.ts`).
- **Testing:** Vitest + React Testing Library.

## 2. Feature-Based (Domain-Driven) Architecture

NEW code must be organized by feature modules within `src/features/`. Absolutely do not put everything into `src/components` or `src/hooks`.
Standard feature structure:

```text
src/features/my-feature/
├── components/     # Internal UI components for the feature
├── hooks/          # React hooks containing logic
├── services/       # API call files (axios)
├── stores/         # Zustand stores (if needed)
├── types/          # TypeScript types / Zod schemas
└── index.ts        # Barrel export (Public API)
```

## 3. Coding & Import Rules

- **Strictly adhere to TypeScript Strict:** Do not use `any`, avoid arbitrary type casting. All data must have clear interfaces/types or be inferred from Zod.
- **Import Paths:** Always use the `@/` alias for internal project imports (e.g., `import { cn } from '@/lib/utils'`).
- **Barrel Rule (`index.ts`):** Only export necessary files outside the feature via `src/features/[feature]/index.ts`. Components or logic from other features MUST ONLY import through this index file. Do not abuse barrel imports in other directories to avoid bloating the bundle.

## 4. UI and Styling

- Use the `cn()` utility from `@/lib/utils` to merge Tailwind classes.
- **Color Rules:** FORBIDDEN to use `purple-*` or `violet-*` color classes. The project uses the `teal`/`emerald` color palette.
- Adhere to Tailwind's mobile-first responsive design.

## 5. API & Environment Handling

- All Environment variables must be defined and validated using Zod in the `src/config/env.ts` file.
- Any request requiring authentication must use the Axios instance from `@/lib/axios` (already configured to automatically send tokens and refresh tokens on 401 errors).

## 6. Testing & Code Quality

- When adding complex Utils or Hooks, it is MANDATORY to write corresponding unit tests using Vitest.
- Generated code must not violate any ESLint rules (Zero-warning policy).
