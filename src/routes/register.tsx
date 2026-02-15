import { createFileRoute, Link } from '@tanstack/react-router';
import { RegisterForm } from '@/features/auth/components/register-form';

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-foreground text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Get started with your free account today
          </p>
        </div>

        <div className="border-border bg-card rounded-lg border p-6 shadow-sm">
          <RegisterForm />
        </div>

        <p className="text-muted-foreground text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
