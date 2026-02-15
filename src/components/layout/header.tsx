import { Link, useRouter } from '@tanstack/react-router';
import { useLogout } from '@/features/auth/hooks/use-auth';
import { useAuthStore } from '@/features/auth/stores/auth-store';
import { useThemeStore } from '@/stores/theme-store';
import { cn } from '@/lib/utils';

export function Header() {
  const { isAuthenticated, user } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const logout = useLogout();
  const router = useRouter();

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : theme === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-foreground hover:text-primary flex items-center gap-2 text-lg font-semibold transition-colors"
        >
          <svg className="text-primary h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span>Boilerplate</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-md',
              'text-muted-foreground hover:text-foreground hover:bg-accent',
              'transition-colors',
            )}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={cn(
                  'inline-flex h-9 items-center rounded-md px-3 text-sm font-medium',
                  'text-muted-foreground hover:text-foreground hover:bg-accent transition-colors',
                  router.state.location.pathname === '/dashboard' && 'text-foreground bg-accent',
                )}
              >
                Dashboard
              </Link>
              <Link
                to="/settings"
                className={cn(
                  'inline-flex h-9 items-center rounded-md px-3 text-sm font-medium',
                  'text-muted-foreground hover:text-foreground hover:bg-accent transition-colors',
                  router.state.location.pathname === '/settings' && 'text-foreground bg-accent',
                )}
              >
                Settings
              </Link>

              <div className="ml-2 flex items-center gap-2">
                <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <button
                  onClick={() => logout.mutate()}
                  disabled={logout.isPending}
                  className={cn(
                    'inline-flex h-9 items-center rounded-md px-3 text-sm font-medium',
                    'text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors',
                  )}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={cn(
                  'inline-flex h-9 items-center rounded-md px-3 text-sm font-medium',
                  'text-muted-foreground hover:text-foreground hover:bg-accent transition-colors',
                )}
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className={cn(
                  'bg-primary inline-flex h-9 items-center rounded-md px-4 text-sm font-medium',
                  'text-primary-foreground hover:bg-primary/90 transition-colors',
                )}
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
