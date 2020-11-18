import {Response} from 'express'
import {NotificationService} from '../../../../services'

async function getNotifications(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {start, perPage} = req.options
    const notifications = await NotificationService.findAll({userId: req.userId, start, perPage})
    res.status(200).json(notifications)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

async function getNotificationsUnread(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const notifications = await NotificationService.findUnread(req.userId)
    res.status(200).json(notifications)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

async function putNotificationsWithId(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    await NotificationService.updateRead(req.options.id)
    res.status(200).json()
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

async function deleteNotifications(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    await NotificationService.deleteAll(req.userId)
    res.status(204).json()
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

export {getNotifications, getNotificationsUnread, putNotificationsWithId, deleteNotifications}
