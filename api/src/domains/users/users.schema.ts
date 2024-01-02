import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const users = pgTable('users', {
  id: varchar('id').notNull().primaryKey().$defaultFn(nanoid),
  name: varchar('name', { length: 255 }),
  email: varchar('email').unique(),
  accessToken: varchar('access_token'),
  googleId: varchar('google_id').unique(),
  discordId: varchar('discord_id').unique(),
  githubId: varchar('github_id').unique(),
  azureId: varchar('azure_id'),
})

export type User = typeof users.$inferSelect // return type when queried
export type NewUser = typeof users.$inferInsert // insert type
