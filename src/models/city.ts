import {ICity} from '../interfaces/city'
import {db} from '../loaders'

const tableName = 'Cities'

async function findAll(): Promise<ICity> {
  try {
    return await db.query({
      sql: `SELECT * FROM ??
            WHERE parentId is null`,
      values: [tableName]
    })
  } catch (e) {
    throw e
  }
}

export {tableName, findAll}
