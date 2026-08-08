import { relations } from 'drizzle-orm'
import { users, tools, yarn, patterns, refreshTokens } from './schema'

//1 user -> many tools, yarn, patterns, refreshTokens
export const userRelations = relations(users, ({ many }) => ({
	tools: many(tools),
	yarn: many(yarn),
	patterns: many(patterns),
	refreshTokens: many(refreshTokens)
}));

//1 tool to 1 user, 1 tool many patterns
export const toolsRelations = relations(tools, ({one, many}) => ({
	user: one(users, {
		fields: [tools.userId],
		references: [users.id]
	}),
	patterns: many(patterns)
}))

// yarns → belongs to one user; yarn to many patterns
export const yarnRelations = relations(yarn, ({one, many}) => ({
	user: one(users, {
		fields: [yarn.userId],
		references: [users.id]
	}),
	patterns: many(patterns)
}))

// patterns → belongs to one user, optionally one tool, optionally one yarn
export const patternRelations = relations(patterns, ({one}) => ({
	user: one(users, {
		fields: [patterns.userId],
		references: [users.id],
	}),
	tool: one(tools, {
		fields: [patterns.toolId],
		references: [tools.id],
	}),
	yarn: one(yarn, {
		fields: [patterns.yarnId],
		references: [yarn.id]
	})
}))
// refreshTokens → belongs to one user