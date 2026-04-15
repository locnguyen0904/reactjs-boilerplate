import type { FallbackProps } from 'react-error-boundary';

export function GlobalErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const err = error as Error;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <div className="bg-destructive/10 rounded-full p-4">
        <svg
          className="text-destructive h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>
      <div className="text-center">
        <h2 className="text-foreground text-lg font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {err?.message || 'An unexpected error occurred'}
        </p>
      </div>
      <button
        onClick={resetErrorBoundary}
        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center rounded-md px-4 text-sm font-medium transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
