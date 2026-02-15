import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.url().default('http://localhost:8000/api'),
  VITE_APP_NAME: z.string().default('React Boilerplate'),
  VITE_APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  VITE_TOKEN_REFRESH_THRESHOLD: z.coerce.number().default(300),
});

type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const parsed = envSchema.safeParse(import.meta.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', z.flattenError(parsed.error).fieldErrors);
    throw new Error('Invalid environment variables. Check console for details.');
  }

  return parsed.data;
}

export const env = validateEnv();
