export interface IReport {
  id: number
  target: 'store' | 'user'
  type: 'inappropriate'
  userId: number
  content: {storeId?: number, userId?: number}
  createdAt: string
}

export interface IReportCreate {
  target: 'store' | 'user'
  type: 'inappropriate'
  userId: number
  content: string
}
