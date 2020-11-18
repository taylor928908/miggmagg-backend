import {escape} from 'mysql'
import {IStoreMissionSettingList, IStoreFindAll} from '../interfaces/storeMissionSetting'
import {db} from '../loaders'

const tableName = 'StoresMissionsSettings'

async function findAll(options: IStoreFindAll): Promise<IStoreMissionSettingList> {
  const {start, perPage} = options
  try {
    return await db.query({
      sql: `SELECT * FROM ?? 
            LIMIT ${escape(start)}, ${escape(perPage)}`,
      values: [tableName]
    })
  } catch (e) {
    throw e
  }
}

export {tableName, findAll}
