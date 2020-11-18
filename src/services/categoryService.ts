import {ICategory} from '../interfaces/category'
import {Category} from '../models'

async function findAll(type: string): Promise<ICategory> {
  try {
    return await Category.findAll(type)
  } catch (e) {
    throw e
  }
}

export {findAll}
