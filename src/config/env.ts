// src/config/env.ts
import { z } from 'zod';

// 1. Define the mapping from internal clean names to Next.js process variables
const envMapping = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
} as const;

// 2. Build the strict schema validation layout using Zod
export const envSchema = z.object({
  API_URL: z.string().url('API_URL must be a valid URL'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Infer types based on the schema evaluation matrix
export type EnvType = z.infer<typeof envSchema>;

const parseEnv = (): EnvType => {
  // Pass the actual mapped system strings to the parser
  const parsed = envSchema.safeParse(envMapping);

  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables configuration:',
      JSON.stringify(parsed.error.format(), null, 2),
    );

    // Throw an explicit error to halt runtime initialization or builds immediately if critical parameters are broken
    throw new Error('Invalid project environment structure configuration.');
  }

  return parsed.data;
};

// Export a single frozen runtime environment instantiation object
export const env = parseEnv();
