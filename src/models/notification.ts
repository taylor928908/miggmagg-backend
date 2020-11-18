import {escape} from 'mysql'
import {INotificationList, INotificationFindAll} from '../interfaces/notification'
import {db} from '../loaders'

const tableName = 'Notifications'

async function findAll(options: INotificationFindAll): Promise<INotificationList> {
  try {
    const {start, perPage, userId} = options
    const rows = await db.query({
      sql: `SELECT * FROM ??
            WHERE userId = ${userId}
            LIMIT ${escape(start)}, ${escape(perPage)}`,
      values: [tableName]
    })
    const [rowTotal] = await db.query({
      sql: `SELECT COUNT(id) as total FROM ??`,
      values: [tableName]
    })
    return {data: rows, total: rowTotal ? rowTotal.total : 0}
  } catch (e) {
    throw e
  }
}

async function findUnread(userId: number): Promise<{unread: boolean}> {
  try {
    const [row] = await db.query({
      sql: `SELECT * FROM ??
            WHERE userId = ${userId} AND ?
            LIMIT 1`,
      values: [tableName, {read: false}]
    })
    return {unread: !!row}
  } catch (e) {
    throw e
  }
}

async function updateRead(id: number): Promise<void> {
  try {
    await db.query({
      sql: `UPDATE ?? SET ?
            WHERE id = ${id}
            `,
      values: [tableName, {read: true}]
    })
  } catch (e) {
    throw e
  }
}

async function deleteAll(userId: number): Promise<void> {
  try {
    await db.query({
      sql: `DELETE FROM ??
            WHERE userId = ${userId}
            `,
      values: [tableName]
    })
  } catch (e) {
    throw e
  }
}

export {tableName, findAll, findUnread, updateRead, deleteAll}
