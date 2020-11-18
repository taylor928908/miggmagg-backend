import {ICategory} from '../interfaces/category'
import {db} from '../loaders'
import {escape} from 'mysql'

const tableName = 'CategoriesAds'
const tableCategoryStore = 'CategoriesStores'

async function findAll(type: string): Promise<ICategory> {
  try {
    return await db.query({
      sql: `SELECT * FROM ?? ${type === escape('store') ? escape(`WHERE parentId is null`) : ``}`,
      values: [type === 'ad' ? tableName : tableCategoryStore]
    })
  } catch (e) {
    throw e
  }
}

async function findOne(options: ICategory): Promise<ICategory> {
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

export {tableName, findAll, findOne}
