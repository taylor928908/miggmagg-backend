import {Response} from 'express'
import {CityService} from '../../../../services'

async function getCities(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const categories = await CityService.findAll()
    res.status(200).json(categories)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

export {getCities}
