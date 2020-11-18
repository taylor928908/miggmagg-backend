import {IStoreReviewFindAll, IStoreReviewList, IStoreReviewCreate} from '../interfaces/storeReview'
import {StoreReview} from '../models'

async function create(options: IStoreReviewCreate): Promise<void> {
  try {
    await StoreReview.create(options)
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      throw new Error('already_in_use')
    }
  }
}

async function findAll(options: IStoreReviewFindAll): Promise<IStoreReviewList> {
  try {
    return await StoreReview.findAllWithStoreId(options)
  } catch (e) {
    throw e
  }
}

export {create, findAll}
