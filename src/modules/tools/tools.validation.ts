import { z } from 'zod'
import { TOOL_TYPES } from './tool-types'

const mmToString = (val: number | undefined) => val !== undefined ? val.toString() : undefined;

export const toolBaseSchema = z.object({
	toolType: z.enum((TOOL_TYPES)),
	otherToolType: z.string().max(255).optional(),
	sizeMm: z.number().min(0).max(99.99).optional().transform(mmToString),
	needleLengthCm: z.number().min(0).max(999.99).optional().transform(mmToString),
	material: z.string().max(100).optional(),
	photoUrl: z.url().max(500).optional()
});

const otherTypeRule = (data: { toolType?: string | undefined; otherToolType?: string | undefined }) =>
	data.toolType !== 'other' || !!data.otherToolType;

const otherTypeError = {
	message: "otherToolType is required when toolType is 'other'",
	path: ['otherToolType'],
};

export const createToolSchema = toolBaseSchema.refine(otherTypeRule, otherTypeError);
export const updateToolSchema = toolBaseSchema.partial().refine(otherTypeRule, otherTypeError)

export type CreateToolInput = z.infer<typeof createToolSchema>
export type UpdateToolInput = z.infer<typeof updateToolSchema>

// {
//     "toolType": "circular needles",
//     "sizeMm": 4.5,
//     "needleLengthCm": 80,
//     "material": "bamboo"
// }
