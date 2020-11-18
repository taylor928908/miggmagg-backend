import {Response} from 'express'
import {CategoryService} from '../../../../services'

async function getCategories(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {type} = req.options
    const categories = await CategoryService.findAll(type)
    res.status(200).json(categories)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

export {getCategories}
