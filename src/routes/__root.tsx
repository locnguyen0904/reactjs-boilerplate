import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Header } from '@/components/layout/header';
import { ErrorBoundary } from '@/components/common/error-boundary';
import { AppProviders } from '@/app/providers';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <AppProviders>
      <ErrorBoundary>
        <div className="bg-background relative min-h-screen">
          <Header />
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </ErrorBoundary>
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </AppProviders>
  );
}
