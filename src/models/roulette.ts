import {db} from '../loaders'
import {IRoulette} from '../interfaces/roulette'

const tableName = 'Roulette'

async function findAll(): Promise<IRoulette[]> {
  try {
    return await db.query({
      sql: `SELECT * FROM ?? WHERE status = true ORDER BY percentage`,
      values: [tableName]
    })
  } catch (e) {
    throw e
  }
}

export {findAll}
