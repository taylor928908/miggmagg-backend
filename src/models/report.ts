import {PoolConnection} from 'mysql'
import {db} from '../loaders'
import {IReportCreate} from '../interfaces/report'

const tableName = 'Reports'

async function create(options: IReportCreate, connection?: PoolConnection): Promise<void> {
  try {
    await db.query({
      connection,
      sql: `INSERT INTO ?? SET ?`,
      values: [tableName, options]
    })
  } catch (e) {
    throw e
  }
}

export {create}
