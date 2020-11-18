import {IStoreUserList, IStoreFindAllWithStoreId, IStoreDelete} from '../interfaces/storeUser'
import {StoreUser} from '../models'

async function findAllWithStoreId(options: IStoreFindAllWithStoreId): Promise<IStoreUserList> {
  try {
    return await StoreUser.findAllWithStoreId(options)
  } catch (e) {
    throw e
  }
}

async function deleteOne(options: IStoreDelete): Promise<void> {
  try {
    await StoreUser.deleteOne(options)
  } catch (e) {
    throw e
  }
}

export {findAllWithStoreId, deleteOne}
