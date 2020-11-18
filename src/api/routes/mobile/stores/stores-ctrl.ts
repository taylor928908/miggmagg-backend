import {Response} from 'express'
import {StoreService} from '../../../../services'

async function getStores(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {lat, lon, type, search, categoryId, start, perPage} = req.options
    const stores = await StoreService.findAll({
      lat,
      lon,
      type,
      search,
      categoryId,
      userId: req.userId,
      start,
      perPage
    })
    res.status(200).json(stores)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

async function getStoresMap(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {lat, lon, distance, categoryId, orderBy} = req.options
    const stores = await StoreService.findAllMap({
      lat,
      lon,
      distance,
      categoryId,
      orderBy,
      userId: req.userId
    })
    res.status(200).json(stores)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

async function getStoresLike(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {lat, lon, start, perPage} = req.options
    const stores = await StoreService.findAllLike({
      lat,
      lon,
      userId: req.userId,
      start,
      perPage
    })
    res.status(200).json(stores)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

async function getStoresVisit(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {lat, lon, start, perPage} = req.options
    const stores = await StoreService.findAllVisit({
      lat,
      lon,
      userId: req.userId,
      start,
      perPage
    })
    res.status(200).json(stores)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

async function getStoresWithId(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {id, lat, lon} = req.options
    const store = await StoreService.findOne({
      id,
      lat,
      lon,
      userId: req.userId
    })
    res.status(200).json(store)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

export {getStores, getStoresMap, getStoresLike, getStoresVisit, getStoresWithId}
