import {PoolConnection, escape} from 'mysql'
import {
  IVerification,
  IVerificationCreate,
  IVerificationFindOne,
  IVerificationUpdateOne
} from '../interfaces/verification'
import {db} from '../loaders'
import {generateRandomCode} from '../libs/code'

const tableName = 'Verifications'

async function create(options: IVerificationCreate): Promise<IVerification> {
  const {phone, type} = options
  try {
    const code = await generateRandomCode(6)
    const {insertId} = await db.query({
      sql: `INSERT INTO ?? SET ?
      ON DUPLICATE KEY UPDATE code = VALUES(code), confirmed = false, used = false, createdAt = NOW()`,
      values: [tableName, {phone, code, type}]
    })
    return {id: insertId, phone, code: code.toString(), type}
  } catch (e) {
    throw e
  }
}

async function findOne(options: IVerificationFindOne): Promise<IVerification> {
  try {
    const {id, phone, type, used, confirmed} = options
    const where = []
    if (id) where.push(`id = ${escape(id)}`)
    if (phone) where.push(`phone = ${escape(phone)}`)
    if (type) where.push(`type = ${escape(type)}`)
    if (used) where.push(`used = ${escape(used)}`)
    if (confirmed) where.push(`confirmed = ${escape(confirmed)}`)
    const [row] = await db.query({
      sql: `SELECT * FROM ?? t
       ${where.length ? `WHERE ${where.join(' AND ')}` : ''}`,
      values: [tableName]
    })
    return row
  } catch (e) {
    throw e
  }
}

async function updateOne(options: IVerificationUpdateOne, connection?: PoolConnection): Promise<any> {
  try {
    const {id, ...data} = options
    await db.query({
      connection,
      sql: `UPDATE ?? SET ? WHERE ?`,
      values: [tableName, data, {id}]
    })
  } catch (e) {
    throw e
  }
}

export {tableName, create, findOne, updateOne}
