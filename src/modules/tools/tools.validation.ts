import { z } from 'zod'
import { TOOL_TYPES } from './tool-types'

const mmToString = (val: number | undefined) => val !== undefined ? val.toString() : undefined;

export const createToolSchema = z.object({
	toolType: z.enum((TOOL_TYPES)),
	otherToolType: z.string().max(255).optional(),
	sizeMm: z.number().min(0).max(99.99).optional().transform(mmToString),
	needleLengthCm: z.number().min(0).max(99.99).optional().transform(mmToString),
	material: z.string().max(100).optional(),
	photoUrl: z.url().max(500).optional()
}).refine(
	(data) => data.toolType !== 'other' || !!data.otherToolType,
	{ message: "otherToolType is required when tool type is 'other", path: ['otherToolType']}

);

export type CreateToolInput = z.infer<typeof createToolSchema>