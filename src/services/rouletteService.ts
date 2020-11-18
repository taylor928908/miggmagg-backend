import {IRoulette} from '../interfaces/roulette'
import {Roulette} from '../models'
import {PointService, UserService} from '../services'
import {db} from '../loaders'

async function calculateRoulette(userId: number): Promise<{id: number}> {
  const connection = await db.beginTransaction()
  try {
    const roulette = await Roulette.findAll()
    const random = Math.random() * 100
    let cumulative = 0
    for (let i = 0; i < roulette.length; i++) {
      const {percentage, id, type, point} = roulette[i]
      cumulative += percentage
      if (random <= cumulative) {
        if (type === 'point') {
          await PointService.create({userId, type: 'roulette', point}, connection)
          await UserService.updatePoint({userId, point}, connection)
        }
        await db.commit(connection)
        return {id}
      }
    }
    throw new Error('roulette_error')
  } catch (e) {
    if (connection) await db.rollback(connection)
    throw e
  }
}

async function findAll(): Promise<IRoulette[]> {
  try {
    return await Roulette.findAll()
  } catch (e) {
    throw e
  }
}

export {calculateRoulette, findAll}
