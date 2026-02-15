# ⚡ React TypeScript Boilerplate

A **production-ready** React SPA boilerplate with the best community libraries (2025/2026). Type-safe, scalable, and developer-friendly.

## 🚀 Tech Stack

| Category         | Technology                       | Purpose                                  |
| ---------------- | -------------------------------- | ---------------------------------------- |
| **Build**        | Vite 7                           | Lightning-fast HMR & builds              |
| **Language**     | TypeScript 5 (strict)            | Type safety                              |
| **Routing**      | TanStack Router                  | 100% type-safe file-based routing        |
| **Server State** | TanStack Query v5                | Data fetching, caching, background sync  |
| **Client State** | Zustand v5                       | Minimal, performant global state         |
| **Forms**        | React Hook Form + Zod            | Performant forms with schema validation  |
| **Styling**      | Tailwind CSS v4                  | Utility-first CSS with CSS-first config  |
| **Components**   | shadcn/ui (Radix primitives)     | Accessible, customizable UI components   |
| **HTTP**         | Axios + axios-auth-refresh       | HTTP client with auto token refresh      |
| **Animations**   | Framer Motion                    | Production-grade animations              |
| **Testing**      | Vitest + React Testing Library   | Fast unit & component testing            |
| **Linting**      | ESLint v9 + Prettier             | Code quality & formatting                |
| **Git Hooks**    | Husky + lint-staged + commitlint | Pre-commit checks & conventional commits |

## 📦 Quick Start

```bash
# Clone the repository
git clone <repo-url> my-app
cd my-app

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

## 📜 Available Scripts

| Script               | Description                          |
| -------------------- | ------------------------------------ |
| `pnpm dev`           | Start development server (port 3000) |
| `pnpm build`         | TypeScript check + production build  |
| `pnpm preview`       | Preview production build locally     |
| `pnpm lint`          | Run ESLint with zero-warning policy  |
| `pnpm format`        | Format all files with Prettier       |
| `pnpm format:check`  | Check formatting without writing     |
| `pnpm test`          | Run tests once                       |
| `pnpm test:watch`    | Run tests in watch mode              |
| `pnpm test:coverage` | Run tests with coverage report       |

## 📂 Project Structure

```
src/
├── app/                        # App shell & providers
│   └── providers/              # QueryProvider, etc.
├── routes/                     # TanStack Router file-based routes
│   ├── __root.tsx              # Root layout (Header + ErrorBoundary)
│   ├── index.tsx               # Home page "/"
│   ├── login.tsx               # Login page "/login"
│   ├── register.tsx            # Register page "/register"
│   ├── _authenticated.tsx      # Auth guard layout
│   └── _authenticated/
│       ├── dashboard.tsx       # Protected dashboard "/dashboard"
│       └── settings.tsx        # Protected settings "/settings"
├── components/                 # Shared components
│   ├── ui/                     # shadcn/ui components
│   ├── layout/                 # Header, Sidebar, Footer
│   └── common/                 # ErrorBoundary, Loading, Skeleton
├── features/                   # Feature modules (domain-driven)
│   └── auth/                   # Auth feature
│       ├── components/         # LoginForm, RegisterForm
│       ├── hooks/              # useAuth, useUser, useLogin, useLogout
│       ├── services/           # API calls (loginService, etc.)
│       ├── stores/             # Zustand auth store
│       ├── types/              # Auth TypeScript types
│       └── index.ts            # Public API barrel export
├── hooks/                      # Shared custom hooks
├── lib/                        # Third-party configs & wrappers
│   ├── axios.ts                # Axios instance + interceptors + refresh
│   ├── query-client.ts         # TanStack Query client config
│   └── utils.ts                # cn(), formatDate(), truncate()
├── stores/                     # Global Zustand stores
│   └── theme-store.ts          # Theme (light/dark/system) with persist
├── config/
│   └── env.ts                  # Typed environment variables (Zod validated)
├── test/
│   └── setup.ts                # Vitest + jest-dom setup
└── styles/
    └── globals.css             # Tailwind directives + theme tokens
```

## 🏗️ Architecture Decisions

### Feature-Based Architecture

Code is organized by **business domain** (features), not by file type. Each feature is self-contained:

```
features/auth/
├── components/     # UI specific to this feature
├── hooks/          # React hooks for this feature
├── services/       # API calls
├── stores/         # Zustand stores
├── types/          # TypeScript types
└── index.ts        # Public API (only these exports are used outside)
```

### State Management Strategy

| State Type        | Tool              | Example                       |
| ----------------- | ----------------- | ----------------------------- |
| **Server State**  | TanStack Query    | User data, API responses      |
| **Global Client** | Zustand (persist) | Auth tokens, theme preference |
| **Local/Form**    | React Hook Form   | Login form, search filters    |

### Auth Flow

1. User submits login form → `useLogin()` mutation
2. On success → Zustand store updated with tokens + user
3. Axios interceptor auto-attaches Bearer token to requests
4. On 401 → `axios-auth-refresh` auto-refreshes token + retries request
5. Protected routes check `isAuthenticated` via `beforeLoad` guard
6. On logout → Clear Zustand store + Query cache + redirect to `/login`

## 🔧 Configuration

### Environment Variables

All env vars are **validated at startup** with Zod. Invalid values throw immediately.

```bash
# .env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=React Boilerplate
VITE_APP_ENV=development
VITE_TOKEN_REFRESH_THRESHOLD=300
```

### Path Aliases

Import with `@/` prefix:

```typescript
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/features/auth/stores/auth-store';
```

### Theme Support

Built-in light/dark/system theme with OS-level change detection:

```typescript
import { useThemeStore } from '@/stores/theme-store';

const { theme, setTheme } = useThemeStore();
setTheme('dark'); // 'light' | 'dark' | 'system'
```

## 🧪 Testing

Tests use **Vitest** with **React Testing Library** and **jest-dom** matchers:

```bash
pnpm test              # Run once
pnpm test:watch        # Watch mode
pnpm test:coverage     # With coverage
```

## 📝 Adding a New Feature

1. Create folder: `src/features/my-feature/`
2. Add subdirectories: `components/`, `hooks/`, `services/`, `stores/`, `types/`
3. Create `index.ts` barrel export for public API
4. Add route in `src/routes/` (auto-detected by TanStack Router plugin)
5. Import from feature barrel: `import { MyComponent } from '@/features/my-feature'`

## 🤝 Git Conventions

- **Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat: add search feature`
  - `fix: resolve token refresh race condition`
  - `chore: update dependencies`
- **Pre-commit**: ESLint + Prettier run on staged files automatically
- **Commit-msg**: Validated by commitlint

## 📄 License

MIT
