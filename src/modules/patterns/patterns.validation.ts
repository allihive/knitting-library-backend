import { z } from 'zod'
import { TOOL_TYPES } from '../tools/tool-types';

const mmToString = (val: number | undefined) => val !== undefined ? val.toString() : undefined;
export const patternToolSchema = z.object ({
	toolType: z.enum((TOOL_TYPES)),
	otherToolType: z.string().max(255).optional(),
	sizeMm: z.number().min(0).max(99.99).optional().transform(mmToString),
	needleLengthCm: z.number().min(0).max(999.99).optional().transform(mmToString),
	note: z.string().max(100).optional()
}).refine(
	(data) => data.toolType !== 'other' || !!data.otherToolType,
	{ message: "otherToolType is required when tool type is 'other", path: ['otherToolType']}
)

export const patternYarnSchema = z.object ({
	material: z.string().max(100).optional(),
	recommendedNeedleMm: z.number().min(0).max(99.99).optional().transform(mmToString),
	minLengthM: z.number().int().positive().optional(),
	minGrams: z.number().int().positive().optional(),
	note: z.string().max(100).optional(),
})

export const createPatternSchema = z.object ({
	patternName: z.string().min(1).max(255),
	fileUrl: z.url().max(500).optional(),
	tools: z.array(patternToolSchema).optional(),
	yarn: z.array(patternYarnSchema).optional(),
	difficulty: z.enum(['beginner', 'advanced beginner', 'intermediate', 'advanced']).optional(),
	status: z.enum(['In queue', 'In progress', 'Finished']).optional(),
	sourceUrl: z.url().max(500).optional(),
	notes: z.string().optional(),
})