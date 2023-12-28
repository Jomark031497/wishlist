import { pgTable, bigint, varchar } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const user = pgTable('auth_user', {
  id: varchar('id')
    .$defaultFn(() => nanoid())
    .primaryKey()
    .notNull(),
  email: varchar('email', { length: 150 }).unique().notNull(),
  password: varchar('password', { length: 150 }).notNull(),
})

export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(user)

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(user, {
  email: (schema) => schema.email.email('Please enter a valid email address'),
})

export const session = pgTable('user_session', {
  id: varchar('id', {
    length: 128,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  activeExpires: bigint('active_expires', {
    mode: 'number',
  }).notNull(),
  idleExpires: bigint('idle_expires', {
    mode: 'number',
  }).notNull(),
})

export const key = pgTable('user_key', {
  id: varchar('id', {
    length: 255,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  hashedPassword: varchar('hashed_password', {
    length: 255,
  }),
})
