import {Response} from 'express'
import {RouletteService} from '../../../../services'

async function postRoulette(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const ret = await RouletteService.calculateRoulette(req.userId)
    res.status(200).json(ret)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

async function getRoulette(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const ret = await RouletteService.findAll()
    res.status(200).json(ret)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

export {postRoulette, getRoulette}
