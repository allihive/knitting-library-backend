import { relations } from 'drizzle-orm'
import { users, tools, yarn, patterns, refreshTokens, patternTools, patternYarns } from './schema'

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
export const patternRelations = relations(patterns, ({ one, many }) => ({
	user: one(users, {
		fields: [patterns.userId],
		references: [users.id],
	}),
	patternTools: many(patternTools),
	patternYarn: many(patternYarns),
}))

// patternTools → belongs to one pattern
export const patternToolsRelations = relations(patternTools, ({ one }) => ({
	pattern: one(patterns, {
		fields: [patternTools.patternId],
		references: [patterns.id],
	}),
}));

// patternYarns → belongs to one pattern
export const patternYarnsRelations = relations(patternYarns, ({ one }) => ({
	pattern: one(patterns, {
		fields: [patternYarns.patternId],
		references: [patterns.id],
	}),
}));
// refreshTokens → belongs to one user

export const refreshTokensRelations = relations(refreshTokens, ({one}) => ({
	user: one(users, {
		fields: [refreshTokens.userId],
		references: [users.id]
	})
}))