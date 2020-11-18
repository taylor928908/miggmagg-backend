import {
  IStoreDetail,
  IStoreFindAll,
  IStoreFindAllLike,
  IStoreFindAllMap,
  IStoreFindAllVisit,
  IStoreFindOne,
  IStoreList,
  IStoreLikeList,
  IStoreVisitList
} from '../interfaces/store'
import {IStoreMenu} from '../interfaces/storeMenu'
import {IStoreReviewList} from '../interfaces/storeReview'
import {IStoreMission} from '../interfaces/storeMission'
import {Store, StoreMenu, StoreReview, StoresMission} from '../models'

export interface IStoreDetailService extends Partial<IStoreDetail> {
  distance: number
  isLike: boolean
  obtainablePoint: number
  menus: IStoreMenu
  missions: IStoreMission
  reviews: IStoreReviewList
}

async function findAll(options: IStoreFindAll): Promise<IStoreList> {
  try {
    return await Store.findAll(options)
  } catch (e) {
    throw e
  }
}

async function findAllMap(options: IStoreFindAllMap): Promise<IStoreList> {
  try {
    return await Store.findAllMap(options)
  } catch (e) {
    throw e
  }
}

async function findAllLike(options: IStoreFindAllLike): Promise<IStoreLikeList> {
  try {
    return await Store.findAllLike(options)
  } catch (e) {
    throw e
  }
}

async function findAllVisit(options: IStoreFindAllVisit): Promise<IStoreVisitList> {
  try {
    return await Store.findAllVisit(options)
  } catch (e) {
    throw e
  }
}

async function findOne(options: IStoreFindOne): Promise<IStoreDetailService> {
  try {
    const store = await Store.findOne(options)
    const menus = await StoreMenu.findAllWithStoreId(options.id)
    const reviews = await StoreReview.findAllWithStoreId({storeId: options.id, start: 0, perPage: 20})
    const missions = await StoresMission.findAllWithStoreId(options.id)
    return {menus, reviews, missions, ...store}
  } catch (e) {
    throw e
  }
}

export {findAll, findAllMap, findAllLike, findAllVisit, findOne}
