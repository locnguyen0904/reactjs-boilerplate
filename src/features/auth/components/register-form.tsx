import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegister } from '@/features/auth/hooks/use-auth';
import { cn } from '@/lib/utils';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="register-name" className="text-foreground text-sm font-medium">
          Full name
        </label>
        <input
          id="register-name"
          type="text"
          autoComplete="name"
          placeholder="John Doe"
          className={cn(
            'border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm',
            'placeholder:text-muted-foreground',
            'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
            errors.name && 'border-destructive focus-visible:ring-destructive',
          )}
          {...register('name')}
        />
        {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="register-email" className="text-foreground text-sm font-medium">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={cn(
            'border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm',
            'placeholder:text-muted-foreground',
            'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
            errors.email && 'border-destructive focus-visible:ring-destructive',
          )}
          {...register('email')}
        />
        {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="register-password" className="text-foreground text-sm font-medium">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          className={cn(
            'border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm',
            'placeholder:text-muted-foreground',
            'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
            errors.password && 'border-destructive focus-visible:ring-destructive',
          )}
          {...register('password')}
        />
        {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="register-confirm" className="text-foreground text-sm font-medium">
          Confirm password
        </label>
        <input
          id="register-confirm"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          className={cn(
            'border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm',
            'placeholder:text-muted-foreground',
            'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
            errors.confirmPassword && 'border-destructive focus-visible:ring-destructive',
          )}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      {registerMutation.error && (
        <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
          {(registerMutation.error as { message?: string })?.message || 'Registration failed.'}
        </div>
      )}

      <button
        type="submit"
        disabled={registerMutation.isPending}
        className={cn(
          'bg-primary inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2',
          'text-primary-foreground text-sm font-medium',
          'hover:bg-primary/90 transition-colors',
          'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          'disabled:pointer-events-none disabled:opacity-50',
        )}
      >
        {registerMutation.isPending ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Creating account...
          </span>
        ) : (
          'Create account'
        )}
      </button>
    </form>
  );
}
