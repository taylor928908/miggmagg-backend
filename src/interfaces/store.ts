export type Weekday = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'

export interface IStore {
  id: number
  name: string
  type?: 'brand' | 'operator'
  images: string[]
  brandId?: number
  operatorId?: number
  categoryId?: number
  address: {address: string; detail: string}
  location: {x: number; y: number}
  tel: string
  phone?: string
  operationTime: string[]
  readyTime: string[]
  holiday: Weekday[]
  description: string
  status?: string
  owner: string
  businessNumber: string
  createdAt?: string
}

export type IStoreList = IResponseList<{
  id: number
  name: string
  address: {address: string; detail: string}
  images: string[]
  createdAt: string
  distance: number
  missionCount: number
  obtainablePoint: number
  isLike: false
  star: number
  isMission: boolean
  reviewCount?: number
}>

export type IStoreLikeList = IResponseList<{
  id: number
  name: string
  address: {address: string; detail: string}
  images: string[]
  createdAt: string
  distance: number
  missionCount: number
  obtainablePoint: number
  isLike: false
  star: number
  reviewCount?: number
}>

export type IStoreVisitList = IResponseList<{
  id: number
  name: string
  address: {address: string; detail: string}
  images: string[]
  createdAt: string
  distance: number
  missionCount: number
  obtainablePoint: number
  isLike: false
  star: number
  visitedAt: string
  reviewCount?: number
}>

export interface IStoreDetail extends Partial<IStore> {
  distance: number
  obtainablePoint: number
  isLike: boolean
}

export interface IStoreFindAll {
  lon: number
  lat: number
  categoryId?: number
  userId: number
  start: number
  perPage: number
  search: string
  type?: 'keyword' | 'star' | 'like'
}

export interface IStoreFindAllMap {
  lon: number
  lat: number
  distance: number
  categoryId?: number
  orderBy: 'distance' | 'point' | 'register' | 'review'
  userId: number
}

export interface IStoreFindAllLike {
  lon: number
  lat: number
  start: number
  perPage: number
  userId: number
}

export interface IStoreFindAllVisit {
  lon: number
  lat: number
  start: number
  perPage: number
  userId: number
}

export interface IStoreFindOne {
  id: number
  lon: number
  lat: number
  userId: number
}
