import { z } from 'zod'

const envVariables = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string().url(),
  AUTH_TOKEN: z.string().optional(),
})

const shouldSkipValidation =
  !!process.env.SKIP_ENV_VALIDATION &&
  process.env.SKIP_ENV_VALIDATION !== 'false' &&
  process.env.SKIP_ENV_VALIDATION !== '0'

if (!shouldSkipValidation) {
  const parsed = envVariables.safeParse(process.env)
  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors
    )
    throw new Error('Invalid environment variables')
  }
  console.log('✅ Valid environment variables 🚀')
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
