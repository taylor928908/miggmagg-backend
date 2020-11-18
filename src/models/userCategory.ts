import {PoolConnection} from 'mysql'
import {db} from '../loaders'

const tableName = 'Users-Categories'

async function create(options: {userId: number; categoryIds: []}, connection?: PoolConnection) {
  try {
    const {userId, categoryIds} = options
    const values = categoryIds.map((categoryId) => [userId, categoryId])
    await db.query({
      connection,
      sql: `INSERT INTO ?? (??) VALUES ?`,
      values: [tableName, ['userId', 'categoryId'], values]
    })
  } catch (e) {
    throw e
  }
}

export {create}
