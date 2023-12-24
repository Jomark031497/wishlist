import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

const client = postgres(<string>process.env.DATABASE_URL)
export const db = drizzle(client)
