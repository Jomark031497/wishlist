import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { nanoid } from 'nanoid'

export const users = pgTable('users', {
  id: varchar('id')
    .$defaultFn(() => nanoid())
    .primaryKey()
    .notNull(),
  email: varchar('email', { length: 255 }).unique(),
  password: varchar('password', { length: 150 }),
  fullName: varchar('full_name', { length: 255 }),
  googleId: varchar('google_id').unique(),
  githubId: varchar('github_id').unique(),
  discordId: varchar('discord_id').unique(),
  microsoftId: varchar('microsoft_id').unique(),
})

export type User = typeof users.$inferSelect // return type when queried
export type NewUser = typeof users.$inferInsert // insert type

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(users)

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users)
