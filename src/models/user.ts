import {v4 as uuid} from 'uuid'
import {escape, PoolConnection} from 'mysql'
import {db} from '../loaders'
import {IUser, IUserCreateOne, IUserFindOne, IUserFindOneByIdentity, IUserUpdatePassword} from '../interfaces/user'
import {tableName as IdentityTableName} from './identity'

const tableName = 'Users'

async function create(options: IUserCreateOne, connection?: PoolConnection): Promise<IUser> {
  try {
    options.deviceId = uuid()
    const {accountInfo, ...data} = options
    const {insertId} = await db.query({
      connection,
      sql: `INSERT INTO ?? SET ?`,
      values: [
        tableName,
        {
          accountInfo: JSON.stringify(accountInfo),
          ...data
        }
      ]
    })
    options.id = insertId
    options.point = 0
    return options
  } catch (e) {
    throw e
  }
}

//
// async function findAll(options: IAdministratorFindAll): Promise<IAdministratorList> {
//   try {
//     const {search, sort = 'id', order = 'DESC', start, perPage} = options
//     const where = []
//     if (search) where.push(`(t.name like '%${search}%' OR t.nickname like '%${search}%')`)
//
//     const rows: IAdministrator[] = await db.query({
//       sql: `SELECT t.id, t.name, t.nickname, t.createdAt, t.updatedAt FROM ?? t
//       ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
//       ORDER BY t.${sort} ${order}
//       LIMIT ${start}, ${perPage}`,
//       values: [tableName]
//     })
//     const [rowTotal] = await db.query({
//       sql: `SELECT COUNT(1) as total FROM ?? t
//       ${where.length ? `WHERE ${where.join(' AND ')}` : ''}`,
//       values: [tableName]
//     })
//     return {data: rows, total: rowTotal ? rowTotal.total : 0}
//   } catch (e) {
//     throw e
//   }
// }

async function findOne(options: IUserFindOne): Promise<IUser> {
  try {
    const [row]: [Dictionary] = await db.query({
      sql: `SELECT t.*,
            i.gender, DATE_FORMAT(i.birth, '%Y-%m-%d') as birth, i.phone
            FROM ?? t
            JOIN ?? i ON i.uniqueKey = t.uniqueKey 
            WHERE ?`,
      values: [tableName, IdentityTableName, options]
    })
    return row
  } catch (e) {
    throw e
  }
}

async function findOneByIdentity(options: IUserFindOneByIdentity): Promise<IUser> {
  try {
    const {phone, email} = options
    const where = [`t.type = 'general'`]
    if (email) where.push(`t.email = ${escape(email)}`)
    const [row]: [Dictionary] = await db.query({
      sql: `SELECT t.* FROM ?? t 
            JOIN ?? t1 ON t1.uniqueKey = t.uniqueKey AND t1.phone = ${phone}
            ${where.length ? `WHERE ${where.join(' AND ')}` : ''}`,
      values: [tableName, IdentityTableName, options]
    })
    return row
  } catch (e) {
    throw e
  }
}

async function updatePassword(options: IUserUpdatePassword, connection?: PoolConnection): Promise<void> {
  try {
    const {id, accountInfo} = options
    await db.query({
      connection,
      sql: `UPDATE ?? SET ? WHERE ?`,
      values: [tableName, {accountInfo: JSON.stringify(accountInfo)}, {id}]
    })
  } catch (e) {
    throw e
  }
}

async function updateOne(options: IUser, connection?: PoolConnection): Promise<IUser> {
  const {id, ...data} = options
  try {
    if (!data.nickname) delete data.nickname
    if (!data.cityId) delete data.cityId
    if (data.isMarried === undefined || data.isMarried === null) delete data.isMarried
    const {affectedRows} = await db.query({
      connection,
      sql: `UPDATE ?? SET ? WHERE ? `,
      values: [tableName, data, {id}]
    })
    if (affectedRows > 0) return options
  } catch (e) {
    throw e
  }
}

async function updatePoint(
  options: {userId?: number; referralCode?: string; point: number},
  connection?: PoolConnection
): Promise<any> {
  try {
    const {referralCode, point, userId} = options
    const where = []
    if (userId) where.push(`id = ${escape(userId)}`)
    if (referralCode) where.push(`referralCode = ${escape(referralCode)}`)
    await db.query({
      connection,
      sql: `UPDATE ?? SET point = point + ${escape(point)} 
            ${where.length ? `WHERE ${where.join(' AND ')}` : ''}`,
      values: [tableName]
    })
  } catch (e) {
    throw e
  }
}

// async function deleteOne(options: IAdministratorDelete, connection?: PoolConnection): Promise<IAdministratorDelete> {
//   const {id} = options
//   try {
//     const {affectedRows} = await db.query({
//       connection,
//       sql: `DELETE FROM ?? WHERE ? `,
//       values: [tableName, {id}]
//     })
//     if (affectedRows > 0) return options
//   } catch (e) {
//     throw e
//   }
// }

export {tableName, create, findOne, updateOne, updatePoint, findOneByIdentity, updatePassword}
