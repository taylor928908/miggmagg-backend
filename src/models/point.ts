import {PoolConnection} from 'mysql'
import {db} from '../loaders'
import {IPoint, IPointCreateOne} from '../interfaces/point'

const tableName = 'Points'

async function create(options: IPointCreateOne, connection?: PoolConnection): Promise<IPoint> {
  try {
    const {insertId} = await db.query({
      connection,
      sql: `INSERT INTO ?? SET ?`,
      values: [tableName, options]
    })
    options.id = insertId
    return options
  } catch (e) {
    throw e
  }
}

async function findAll(): Promise<IPoint> {
  try {
    return await db.query({
      sql: `SELECT * FROM ??`,
      values: [tableName]
    })
  } catch (e) {
    throw e
  }
}

async function findOne(options: IPoint): Promise<IPoint> {
  try {
    const [row]: [Dictionary] = await db.query({
      sql: `SELECT * FROM ?? t WHERE ?`,
      values: [tableName, options]
    })
    return row
  } catch (e) {
    throw e
  }
}

export {tableName, create, findAll, findOne}
