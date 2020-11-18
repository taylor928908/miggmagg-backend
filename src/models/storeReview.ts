import {escape} from 'mysql'
import {IStoreReviewList, IStoreReviewFindAll, IStoreReviewCreate} from '../interfaces/storeReview'
import {db} from '../loaders'
import {User, Store} from './'

const tableName = 'StoresReviews'

async function create(options: IStoreReviewCreate): Promise<void> {
  try {
    await db.query({
      sql: `INSERT INTO ?? SET ?`,
      values: [tableName, options]
    })
  } catch (e) {
    throw e
  }
}

async function findAllWithStoreId(options: IStoreReviewFindAll): Promise<IStoreReviewList> {
  try {
    const {storeId, start, perPage} = options
    const where = [`t.id = ${escape(storeId)}`]
    const rows = await db.query({
      sql: `SELECT t.*, u.nickname FROM ?? t
            JOIN ?? u ON u.id = t.userId
            JOIN ?? s ON s.id = t.storeId
            ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
            ORDER BY IF(ISNULL(t.parentId), t.id, t.parentId)
            LIMIT ${start}, ${perPage}`,
      values: [tableName, User.tableName, Store.tableName]
    })
    const [rowTotal] = await db.query({
      sql: `SELECT COUNT(t.id) as total FROM ?? t
      ${where.length ? `WHERE ${where.join(' AND ')}` : ''}`,
      values: [tableName]
    })
    return {data: rows, total: rowTotal ? rowTotal.total : 0}
  } catch (e) {
    throw e
  }
}

// async function findOne(options: ICategory): Promise<IStoreMenu> {
//   try {
//     const [row]: [Dictionary] = await db.query({
//       sql: `SELECT * FROM ?? t WHERE ?`,
//       values: [tableName, options]
//     })
//     return row
//   } catch (e) {
//     throw e
//   }
// }

export {tableName, create, findAllWithStoreId}
