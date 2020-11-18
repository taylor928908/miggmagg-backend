import {escape} from 'mysql'
import {IStoreUserList, IStoreFindAllWithStoreId, IStoreDelete} from '../interfaces/storeUser'
import {db} from '../loaders'

const tableName = 'StoresMissionsSettings'

async function findAllWithStoreId(options: IStoreFindAllWithStoreId): Promise<IStoreUserList> {
  const {storeId} = options
  try {
    return await db.query({
      sql: `SELECT * FROM ?? WHERE storeId = ${escape(storeId)}`,
      values: [tableName]
    })
  } catch (e) {
    throw e
  }
}

async function deleteOne(options: IStoreDelete): Promise<void> {
  const {storeId, userId} = options
  try {
    await db.query({
      sql: `DELETE FROM ?? WHERE storeId = ${escape(storeId)} AND userId = ${escape(userId)}`,
      values: [tableName]
    })
  } catch (e) {
    throw e
  }
}

export {tableName, findAllWithStoreId, deleteOne}
