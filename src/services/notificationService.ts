import {INotificationList, INotificationFindAll} from '../interfaces/notification'
import {Notification} from '../models'

async function findAll(options: INotificationFindAll): Promise<INotificationList> {
  try {
    return await Notification.findAll(options)
  } catch (e) {
    throw e
  }
}

async function findUnread(userId: number): Promise<{unread: boolean}> {
  try {
    return await Notification.findUnread(userId)
  } catch (e) {
    throw e
  }
}

async function updateRead(id: number): Promise<void> {
  try {
    return await Notification.updateRead(id)
  } catch (e) {
    throw e
  }
}

async function deleteAll(userId: number): Promise<void> {
  try {
    await Notification.deleteAll(userId)
  } catch (e) {
    throw e
  }
}

export {findAll, findUnread, updateRead, deleteAll}
