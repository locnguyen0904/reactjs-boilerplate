import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-primary/10 text-primary mb-8 inline-flex rounded-full px-4 py-1.5 text-sm font-medium">
        Production-Ready Boilerplate
      </div>

      <h1 className="text-foreground max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        Build faster with <span className="text-primary">React + TypeScript</span>
      </h1>

      <p className="text-muted-foreground mt-6 max-w-2xl text-lg">
        A modern, scalable boilerplate featuring TanStack Router, TanStack Query, Zustand, Tailwind
        CSS v4, and shadcn/ui. Best practices baked in.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/register"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center rounded-lg px-6 text-sm font-medium transition-colors"
        >
          Get Started
        </Link>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="border-border bg-background text-foreground hover:bg-accent inline-flex h-11 items-center rounded-lg border px-6 text-sm font-medium transition-colors"
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>

      {/* Tech Stack */}
      <div className="mt-20 w-full max-w-3xl">
        <h2 className="text-muted-foreground mb-8 text-sm font-semibold tracking-wider uppercase">
          Powered by
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[
            { name: 'Vite', desc: 'Build tool' },
            { name: 'TypeScript', desc: 'Type safety' },
            { name: 'TanStack Router', desc: 'Routing' },
            { name: 'TanStack Query', desc: 'Server state' },
            { name: 'Zustand', desc: 'Client state' },
            { name: 'Tailwind CSS', desc: 'Styling' },
            { name: 'shadcn/ui', desc: 'Components' },
            { name: 'React Hook Form', desc: 'Forms' },
          ].map((tech) => (
            <div
              key={tech.name}
              className="border-border bg-card hover:border-primary/50 rounded-lg border p-4 text-left transition-colors"
            >
              <span className="text-foreground text-sm font-medium">{tech.name}</span>
              <span className="text-muted-foreground mt-0.5 block text-xs">{tech.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
