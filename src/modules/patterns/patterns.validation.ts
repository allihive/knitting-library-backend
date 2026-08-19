import { z } from 'zod'

export const createPatternSchema = z.object ({
	patternName: z.string().min(1).max(255),
	fileUrl: z.url().max(500).optional(),
	toolId: z.uuid().optional(),
	toolNote: z.string().max(100).optional(),
	yarnId: z.uuid().optional(),
	yarnNote: z.string().max(100).optional(),
	difficulty: z.enum(['beginner', 'advanced beginner', 'intermediate', 'advanced']).optional(),
	status: z.enum(['In queue', 'In progress', 'Finished']).optional(),
	sourceUrl: z.url().max(500).optional(),
	notes: z.string().optional(),
})