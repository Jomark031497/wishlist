import type { Config } from 'drizzle-kit'

export default {
  out: './src/db/migrations',
  schema: './src/domains/**/*.schema.{ts,js}',
  breakpoints: false,
  driver: 'pg',
  dbCredentials: {
    connectionString: <string>process.env.DATABASE_URL,
  },
} satisfies Config
