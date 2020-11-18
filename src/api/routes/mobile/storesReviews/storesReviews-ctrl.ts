import {Response} from 'express'
import {StoreReviewService} from '../../../../services'

async function postStoresReviews(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {contents, images, videos, storeId, star} = req.options
    await StoreReviewService.create({contents, images, videos, userId: req.userId, storeId, star})
    res.status(201).json()
  } catch (e) {
    if (e.message === 'already_in_use') e.status = 409
    next(e)
  }
}

async function getStoresReviews(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {storeId, start, perPage} = req.options
    const reviews = await StoreReviewService.findAll({storeId, start, perPage})
    res.status(200).json(reviews)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

export {postStoresReviews, getStoresReviews}
