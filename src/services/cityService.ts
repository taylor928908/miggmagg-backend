import {ICity} from '../interfaces/city'
import {City} from '../models'

async function findAll(): Promise<ICity> {
  try {
    return await City.findAll()
  } catch (e) {
    throw e
  }
}

export {findAll}
