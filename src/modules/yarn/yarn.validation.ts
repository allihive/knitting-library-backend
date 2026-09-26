import { z } from 'zod'
import { createYarn } from './yarn.controller';

const mmToString = (val: number | undefined) => val !== undefined ? val.toString() : undefined;

export const createYarnSchema = z.object({
	yarnName: z.string().min(1).max(255),
	brand: z.string().max(255).optional(),
	material: z.string().max(100).optional(),
	color: z.string().max(100).optional(),
	gauge: z.string().max(100).optional(),
	weight: z.string().max(20).optional(),
	recommendedNeeldeMm: z.number().min(0).max(99.99).optional().transform(mmToString),
	yardage: z.number().int().positive().optional(),
	grams: z.number().int().positive().optional(),
	skeinCount: z.number().int().positive().optional(),
	photoUrl: z.url().max(500).optional(),
	careInstruction: z.string().optional(),
	comments: z.string().optional()
})

export const updateYarnSchema = createYarnSchema.partial();
// {
//   "yarnName": "Malabrigo Rios",
//   "brand": "Malabrigo",
//   "material": "100% Merino Wool",
//   "color": "Ravelry Red",
//   "weight": "worsted",
//   "needleSize": 4.5,
//   "yardage": 210,
//   "grams": 100,
//   "skeinCount": 3
// }
export type CreateYarnInput = z.infer<typeof createYarnSchema>