import {ApiRouter} from '../../default'
import * as ctrl from './notifications-ctrl'

const getNotifications = new ApiRouter({
  name: '',
  method: 'get',
  summary: '알림 조회',
  schema: 'requests/mobile/notifications/GetNotifications',
  tags: ['Notification'],
  responses: {
    200: {schema: 'responses/mobile/notifications/GetNotifications'},
    404: {description: 'Not found'}
  },
  handler: ctrl.getNotifications
})

const getNotificationsUnread = new ApiRouter({
  name: 'unread',
  method: 'get',
  summary: '알림 새로운 알림 유무 조회',
  tags: ['Notification'],
  responses: {
    200: {schema: 'responses/mobile/notifications/GetNotificationsUnread'},
    404: {description: 'Not found'}
  },
  handler: ctrl.getNotificationsUnread
})

const putNotificationsWithId = new ApiRouter({
  name: ':id',
  paths: ['common/IdPath'],
  method: 'put',
  summary: '알림 읽음 처리',
  tags: ['Notification'],
  responses: {
    200: {description: 'Success'},
    404: {description: 'Not found'}
  },
  handler: ctrl.putNotificationsWithId
})

const deleteNotifications = new ApiRouter({
  name: '',
  method: 'delete',
  summary: '알림 전체 삭제',
  tags: ['Notification'],
  responses: {
    200: {description: 'Success'},
    404: {description: 'Not found'}
  },
  handler: ctrl.deleteNotifications
})

export {getNotifications, getNotificationsUnread, putNotificationsWithId, deleteNotifications}
