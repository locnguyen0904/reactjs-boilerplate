# ReactJS TypeScript Boilerplate — Implementation Plan

## Goal

Build a production-ready ReactJS TypeScript SPA boilerplate using the best community libraries (2025/2026). Includes: Vite, TanStack Router + Query, Zustand, Tailwind v4, shadcn/ui, full JWT auth flow, error boundaries, and feature-based architecture.

---

## Final Tech Stack

| Category            | Library                             | Version      |
| ------------------- | ----------------------------------- | ------------ |
| **Build**           | Vite                                | 6.x          |
| **Language**        | TypeScript                          | 5.x (strict) |
| **Package Manager** | pnpm                                | 9.x          |
| **Routing**         | TanStack Router                     | latest       |
| **Server State**    | TanStack Query v5                   | latest       |
| **Client State**    | Zustand v5                          | latest       |
| **Forms**           | React Hook Form + Zod               | latest       |
| **Styling**         | Tailwind CSS v4                     | latest       |
| **UI Components**   | shadcn/ui (Radix primitives)        | latest       |
| **HTTP**            | Axios + axios-auth-refresh          | latest       |
| **Animations**      | Framer Motion                       | latest       |
| **Testing**         | Vitest + React Testing Library      | latest       |
| **E2E**             | Playwright                          | latest       |
| **API Mocking**     | MSW v2                              | latest       |
| **Linting**         | ESLint v9 (flat config)             | latest       |
| **Formatting**      | Prettier                            | latest       |
| **Git Hooks**       | Husky + lint-staged                 | latest       |
| **Commits**         | commitlint                          | latest       |
| **Utilities**       | dayjs, nanoid, clsx, tailwind-merge | latest       |

---

## Folder Structure

```
src/
├── app/                        # App shell & providers
│   ├── providers/              # QueryProvider, ThemeProvider, etc.
│   ├── App.tsx                 # Root component
│   └── main.tsx                # Entry point
├── routes/                     # TanStack Router file-based routes
│   ├── __root.tsx              # Root layout
│   ├── index.tsx               # Home "/"
│   ├── _authenticated.tsx      # Auth layout guard
│   ├── _authenticated/
│   │   ├── dashboard.tsx       # "/dashboard"
│   │   └── settings.tsx        # "/settings"
│   ├── login.tsx               # "/login"
│   └── register.tsx            # "/register"
├── components/                 # Shared components
│   ├── ui/                     # shadcn/ui components
│   ├── layout/                 # Header, Sidebar, Footer
│   └── common/                 # ErrorBoundary, Loading, etc.
├── features/                   # Feature modules (domain-driven)
│   └── auth/
│       ├── components/         # Login/Register forms
│       ├── hooks/              # useAuth, useUser
│       ├── services/           # auth API calls
│       ├── stores/             # auth Zustand store
│       ├── types/              # Auth types
│       └── index.ts            # Public API barrel
├── hooks/                      # Shared custom hooks
├── lib/                        # Third-party configs
│   ├── axios.ts                # Axios instance + interceptors + refresh
│   ├── query-client.ts         # TanStack Query config
│   └── utils.ts                # cn(), helpers
├── services/                   # Shared API functions
├── stores/                     # Global Zustand stores (theme, app)
├── types/                      # Shared TypeScript types
├── config/                     # App config
│   └── env.ts                  # Typed env (Zod validated)
└── styles/
    └── globals.css             # Tailwind directives + custom
```

---

## Tasks

### Phase 1: Project Initialization

- [x] **Task 1**: Scaffold Vite + React + TypeScript project
      → Verified: `pnpm dev` starts on http://localhost:3000

- [x] **Task 2**: Configure TypeScript strict mode + path aliases (`@/`)
      → Verified: `tsc -b --noEmit` passes with zero errors

- [x] **Task 3**: Install & configure Tailwind CSS v4
      → Verified: Tailwind classes render in browser

- [x] **Task 4**: Initialize shadcn/ui-style setup (cn utility, theme tokens)
      → Verified: `cn()` utility works, theme tokens in globals.css

### Phase 2: Core Infrastructure

- [x] **Task 5**: Set up TanStack Router (file-based routing) + `routeTree.gen.ts`
      → Verified: Navigate between `/`, `/login`, `/register` works

- [x] **Task 6**: Set up TanStack Query provider + query client config
      → Verified: QueryClientProvider wraps app, DevTools visible

- [x] **Task 7**: Set up Zustand stores (theme store with persist)
      → Verified: Toggle theme persists, system theme change detection

- [x] **Task 8**: Set up Axios instance + interceptors + `axios-auth-refresh`
      → Verified: Auto-attach token, 401 refresh, error normalization

- [x] **Task 9**: Create typed environment config with Zod validation (`config/env.ts`)
      → Verified: Env validated at startup

### Phase 3: Auth Feature (Full JWT Flow)

- [x] **Task 10**: Create auth Zustand store (token, user, isAuthenticated)
      → Verified: Store with persist + partialize

- [x] **Task 11**: Create auth services (login, register, refreshToken, logout API calls)
      → Verified: Pure service functions calling correct endpoints

- [x] **Task 12**: Create auth hooks (useLogin, useRegister, useLogout, useUser)
      → Verified: TanStack Query hooks with auto-redirect

- [x] **Task 13**: Create authenticated route layout (`_authenticated.tsx`) with redirect guard
      → Verified: beforeLoad checks isAuthenticated, redirects to /login

- [x] **Task 14**: Create Login + Register pages with React Hook Form + Zod validation
      → Verified: Forms with validation, error states, loading indicators

### Phase 4: Shared Components & Layout

- [x] **Task 15**: shadcn/ui-style components ready (theme tokens, Radix-compatible)
      → Verified: Theme system supports light/dark/system

- [x] **Task 16**: Create app layout (Header with auth-aware nav)
      → Verified: Header shows sign-in/get-started for guests, dashboard/settings/logout for users

- [x] **Task 17**: Create ErrorBoundary component with fallback UI
      → Verified: ErrorBoundary catches errors, shows retry button

- [x] **Task 18**: Create Loading/Spinner/Skeleton components
      → Verified: 3 sizes spinner, full-page loading, skeleton shimmer

### Phase 5: Code Quality & DX

- [x] **Task 19**: Configure ESLint v9 flat config + React + TypeScript rules
      → Verified: Flat config with consistent-type-imports rule

- [x] **Task 20**: Configure Prettier + `.prettierrc` + tailwindcss plugin
      → Verified: Auto class sorting

- [x] **Task 21**: Set up Husky + lint-staged + commitlint
      → Verified: pre-commit + commit-msg hooks configured

- [x] **Task 22**: Set up Vitest + React Testing Library + sample test
      → Verified: `pnpm test` — 6/6 tests pass

### Phase 6: Final Polish

- [x] **Task 23**: Create comprehensive README.md
      → Verified: Full docs with tech stack, structure, architecture, conventions

- [x] **Task 24**: Create sample Dashboard + Settings pages demonstrating all patterns
      → Verified: Protected routes, data fetching, state, theme toggle

- [x] **Task 25**: Full smoke test — build + test
      → Verified: `pnpm build` ✅ + `pnpm test` ✅ (6/6 pass)

---

## Done When

- [x] `pnpm dev` starts clean (no warnings)
- [x] `pnpm build` produces optimized bundle
- [x] `pnpm test` passes all tests (6/6)
- [x] Auth flow structure works (login → dashboard → logout → redirect)
- [x] Feature-based folder structure in place
- [x] README.md documents everything
- [x] Ready to clone and start a new project immediately

---

## Notes

- **No purple/violet colors** (per frontend-design PURPLE BAN) — uses teal/emerald palette
- **No barrel imports in app code** (per react-best-practices — bundle optimization)
- Feature barrel exports (`index.ts`) only at feature boundary for public API
- Path aliases via `@/` for clean imports
- All env vars validated at startup via Zod
- Auth tokens stored in Zustand with persist middleware
- Axios interceptors handle 401 → auto refresh → retry original request
