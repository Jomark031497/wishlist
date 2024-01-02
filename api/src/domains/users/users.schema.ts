import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const users = pgTable('users', {
  id: varchar('id').notNull().primaryKey().$defaultFn(nanoid),
  name: varchar('name', { length: 255 }),
  email: varchar('email').unique(),
  accessToken: varchar('access_token'),
  profileId: varchar('profile_id').unique(),
  googleId: varchar('google_id').unique(),
  googleAccessToken: varchar('google_access_token'),
  googleEmail: varchar('google_email'),
  discordId: varchar('discord_id').unique(),
  discordAccessToken: varchar('discord_access_token'),
  discordEmail: varchar('discord_email'),
  githubId: varchar('github_id').unique(),
  githubAccessToken: varchar('github_access_token'),
  githubEmail: varchar('github_email'),
  azureId: varchar('azure_id'),
  azureAccessToken: varchar('azure_access_token'),
  azureEmail: varchar('azure_email'),
})

export type User = typeof users.$inferSelect // return type when queried
export type NewUser = typeof users.$inferInsert // insert type
