
import { pgTable, uuid, varchar, timestamp, boolean, text, numeric, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 255 }),
  email: varchar("email", {length: 255}).unique().notNull(),
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
	userId: uuid("user_id").notNull().references(() => users.id),
	patternName: varchar("pattern_name", {length: 255}).notNull(),
	fileUrl: varchar('file_url', {length: 500}),
	toolId: uuid('tool_id').references(() => tools.id),
	toolNote: varchar("tool_note", {length: 100}),
	yarnId: uuid('yarn_id').references(() => yarn.id),
	yarnNote: varchar("yarn_note", {length: 100}),
	difficulty: varchar("difficulty", {length: 255}),
	status: varchar("status", {length: 255}),
	sourceUrl: varchar("source_url", {length: 500}),
	notes: text('notes'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const tools = pgTable("tools", {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid("user_id").notNull().references(() => users.id),
	toolType: varchar("tool_type", {length: 255}).notNull(),
	sizeMm: numeric('size_mm', {precision: 4, scale: 2}),
	material: varchar("material", {length: 100}),
	photoUrl: varchar("photo_url", {length: 500}),
	createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const yarn = pgTable("yarn", {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('id').notNull().references(() => users.id),
	yarnName: varchar("yarn_name", {length: 255}).notNull(),
	brand: varchar("brand", {length: 255}),
	material: varchar("material", {length: 100}),
	color: varchar("color", {length: 100}),
	gauge: varchar('gauge', {length: 100}),
	weight: varchar('weight', {length: 20}),
	needleSize: varchar('needle_size', {length: 20}),
	yardage: integer('yardage'),
	grams: integer('grams'),
	skeinCount: integer('skein_count'),
	photoUrl: varchar('photo_url', {length: 500}),
	careInstruction: text('care_instructions'),
	comments: text('comments'),
	createdAt: timestamp('created_at').defaultNow().notNull(),

})