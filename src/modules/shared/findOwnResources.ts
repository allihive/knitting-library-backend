import { eq, and } from 'drizzle-orm'
import type { PgTableWithColumns, TableConfig} from 'drizzle-orm/pg-core'
import { db } from '../../db/index'
import { NotFoundError } from './errors'

export async function findOwnedResource<T extends TableConfig>(
	table: PgTableWithColumns<T> & { id: any, userId: any };
	resource
)