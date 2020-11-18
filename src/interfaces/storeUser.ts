export interface IStoreUser {
  storeId: number
  userId: number
  isMission: boolean
  obtainablePoint: number
}

export interface IStoreFindAllWithStoreId {
  storeId: number
}

export interface IStoreDelete {
  storeId: number
  userId: number
}

export type IStoreUserList = IResponseList<IStoreUser>
