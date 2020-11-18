export interface INotification {
  id: number
  userId: number
  type: 'notice'
  message: string
  content: string
  read: boolean
  createdAt: string
}

export interface INotificationFindAll {
  userId: number
  start: number
  perPage: number
}

export type INotificationList = IResponseList<INotification>
