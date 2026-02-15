import { createFileRoute, Link } from '@tanstack/react-router';
import { LoginForm } from '@/features/auth/components/login-form';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-foreground text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2 text-sm">Sign in to your account to continue</p>
        </div>

        <div className="border-border bg-card rounded-lg border p-6 shadow-sm">
          <LoginForm />
        </div>

        <p className="text-muted-foreground text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
