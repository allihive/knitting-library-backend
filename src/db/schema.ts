
import { pgTable, uuid, varchar, timestamp, boolean, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 255 }).notNull(),
  displayName: varchar("display_name", {length: 255}),
  avatarUrl: varchar("avatar_url", {length: 255}),
  passwordHash: varchar("password_hash", { length: 255 }),
  googleId: varchar('google_id', {length: 255}).unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const refreshTokens = pgTable("refresh_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
	  userId: uuid("user_id").notNull().references(() => users.id),
  tokenHash: varchar("token", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  revokedAt: timestamp("revoked_at"),
})

export const patterns = pgTable("patterns", {
	id: uuid('id').defaultRandom().primaryKey(),
	patternName: varchar("pattern_name", {length: 255}).notNull(),
	fileUrl: varchar("file_url", {length: 500}),
	tool: varchar("tool", {length: 100}),
	yarn: varchar("yarn", {length: 100}),
	difficulty: varchar("difficulty", {length: 255}),
	status: varchar("status", {length: 255}),
	sourceUrl: varchar("source_url", {length: 500}),
	notes: text('notes')
})