import {PoolConnection} from 'mysql'
import {IPointCreateOne, IPoint} from '../interfaces/point'
import {Point} from '../models'

async function create(options: IPointCreateOne, connection?: PoolConnection): Promise<IPoint> {
  try {
    return await Point.create(options, connection)
  } catch (e) {
    throw e
  }
}

export {create}
