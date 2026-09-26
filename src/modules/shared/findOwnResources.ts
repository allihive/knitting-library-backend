import { eq, and } from 'drizzle-orm'
import type { PgTableWithColumns, TableConfig} from 'drizzle-orm/pg-core'
import { db } from '../../db/index'
import { NotFoundError } from './errors'

export async function findOwnedResource<T extends TableConfig>( //able to return many types
	table: PgTableWithColumns<T> & { id: any, userId: any },
	resourceId: string,
	userId: string,
) {
	const [row] = await db
		.select()
		.from(table as any)
		.where(and(eq((table as any).id, resourceId), eq((table as any).userId,userId)));
	if (!row) {
		throw new NotFoundError();
	}
	return row;
}