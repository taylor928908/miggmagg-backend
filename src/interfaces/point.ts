export interface IPoint {
  id?: number
  userId?: number
  type?: string
  info?: string
  description?: string
  point?: number
  createdAt?: string
}

export interface IPointCreateOne {
  id?: number
  userId: number
  type: string
  info?: string
  description?: string
  point: number
}
