import {IStoreMenu} from '../interfaces/storeMenu'
import {db} from '../loaders'

const tableName = 'StoresMenus'

async function findAllWithStoreId(storeId: number): Promise<IStoreMenu> {
  try {
    return await db.query({
      sql: `SELECT * FROM ?? WHERE storeId = ?`,
      values: [tableName, storeId]
    })
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

export {tableName, findAllWithStoreId}
