import {PoolConnection} from 'mysql'
import {db} from '../loaders'
import {IIdentity, IIdentityCreate, IIdentityFindOne} from '../interfaces/identity'
import {IUser, IUserFindOne} from '../interfaces/user'

const tableName = 'Identities'

async function create(options: IIdentityCreate, connection?: PoolConnection): Promise<any> {
  try {
    await db.query({
      connection,
      sql: `INSERT INTO ?? SET ?`,
      values: [tableName, options]
    })
  } catch (e) {
    throw e
  }
}

async function findOne(options: IIdentityFindOne): Promise<IIdentity> {
  try {
    const [row]: [Dictionary] = await db.query({
      sql: `SELECT * FROM ?? t WHERE ?`,
      values: [tableName, options]
    })
    return row
  } catch (e) {
    throw e
  }
}

async function update(options: IUser, connection?: PoolConnection): Promise<IUser> {
  const {uniqueKey, ...data} = options
  try {
    if (!data.gender) delete data.gender
    if (!data.birth) delete data.birth
    if (!data.phone) delete data.phone
    const {affectedRows} = await db.query({
      connection,
      sql: `UPDATE ?? SET ? WHERE ? `,
      values: [tableName, data, {uniqueKey}]
    })
    if (affectedRows > 0) return options
  } catch (e) {
    throw e
  }
}

export {tableName, create, findOne, update}
