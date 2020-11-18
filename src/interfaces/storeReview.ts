import {IAdministrator} from './administrator'

export interface IStoreReview {
  id: number
  contents: string
  images: string[]
  videos: string[]
  userId: number
  storeId: number
  star: number
  nickname?: string
  createdAt: string
}

export interface IStoreReviewFindAll {
  storeId: number
  start: number
  perPage: number
}

export interface IStoreReviewCreate {
  contents: string
  images?: string[]
  videos?: string[]
  userId: number
  storeId: number
  star: number
}

export type IStoreReviewList = IResponseList<IStoreReview>
