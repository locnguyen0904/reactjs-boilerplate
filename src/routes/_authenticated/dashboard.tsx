import { createFileRoute } from '@tanstack/react-router';
import { useUser, useLogout } from '@/features/auth/hooks/use-auth';
import { Skeleton } from '@/components/common/loading';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const { data: user, isLoading } = useUser();
  const logout = useLogout();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-foreground text-3xl font-bold">
          {isLoading ? (
            <Skeleton className="h-9 w-48" />
          ) : (
            <>Welcome back, {user?.name || 'User'} 👋</>
          )}
        </h1>
        <p className="text-muted-foreground mt-2">
          Here&apos;s what&apos;s happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: 'Total Revenue',
            value: '$45,231',
            change: '+20.1%',
            trend: 'up',
          },
          {
            label: 'Subscriptions',
            value: '2,350',
            change: '+180',
            trend: 'up',
          },
          {
            label: 'Active Users',
            value: '12,234',
            change: '+19%',
            trend: 'up',
          },
          {
            label: 'Bounce Rate',
            value: '24.3%',
            change: '-4.5%',
            trend: 'down',
          },
        ].map((stat) => (
          <div key={stat.label} className="border-border bg-card rounded-lg border p-6 shadow-sm">
            <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-foreground text-2xl font-bold">{stat.value}</span>
              <span
                className={`text-xs font-medium ${
                  stat.trend === 'up' ? 'text-emerald-600' : 'text-destructive'
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Section */}
      <div className="border-border bg-card rounded-lg border p-6 shadow-sm">
        <h2 className="text-foreground text-lg font-semibold">Getting Started</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          This is a demo dashboard page. It demonstrates the boilerplate patterns:
        </p>
        <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="bg-primary inline-block h-1.5 w-1.5 rounded-full" />
            Protected route (redirects to /login if not authenticated)
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-primary inline-block h-1.5 w-1.5 rounded-full" />
            Data fetching with TanStack Query (useUser hook)
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-primary inline-block h-1.5 w-1.5 rounded-full" />
            Loading states with Skeleton components
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-primary inline-block h-1.5 w-1.5 rounded-full" />
            Zustand store for auth state management
          </li>
        </ul>
        <div className="mt-6">
          <button
            onClick={() => logout.mutate()}
            className="border-border text-foreground hover:bg-accent inline-flex h-9 items-center rounded-md border px-4 text-sm font-medium transition-colors"
          >
            Test Logout Flow
          </button>
        </div>
      </div>
    </div>
  );
}
