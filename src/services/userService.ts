import shortId from 'shortid'
import {PoolConnection} from 'mysql'
import {User, Point, UserCategory, Identity} from '../models'
import {IUserFindOne, IUser, IUserFindOneByIdentity, IUserUpdate} from '../interfaces/user'
import {createPasswordHash, passwordIterations, generateRandomCode} from '../libs/code'
import {db} from '../loaders'
import {code as Code} from '../libs'

async function create(options: {
  email: string
  nickname: string
  password: string
  impUid: string
  cityId?: number
  isMarried?: boolean
  categoryIds: []
  referralCode: string
  isMarketing: boolean
}): Promise<IUser> {
  const connection = await db.beginTransaction()
  try {
    const {password, impUid, referralCode, categoryIds, ...data} = options
    const passwordHash = await createPasswordHash(password, passwordIterations.mobile)
    let referrerUser, user
    if (referralCode) {
      referrerUser = await User.findOne({referralCode})
      await User.updatePoint({referralCode, point: 500}, connection)
      await Point.create({userId: referrerUser.id, type: 'register', point: 500}, connection)
    }
    if (process.env.NODE_ENV === 'production') {
      const identity = await Identity.findOne({impUid})
      if (identity)
        user = await User.create(
          {
            referralCode: shortId.generate(),
            referrerId: referrerUser.id,
            uniqueKey: identity.uniqueKey,
            accountInfo: passwordHash,
            ...data
          },
          connection
        )
      user.gender = identity.gender
      user.birth = identity.birth
      user.phone = identity.phone
    } else {
      const uniqueKey = shortId.generate()
      const impUid = shortId.generate()
      const randomCode = await generateRandomCode(8)
      const phone = `010${randomCode.toString()}`
      await Identity.create(
        {
          uniqueKey,
          impUid,
          name: 'string',
          gender: 'male',
          birth: '1991-03-03',
          phone
        },
        connection
      )
      user = await User.create(
        {
          referralCode: shortId.generate(),
          referrerId: referrerUser ? referrerUser.id : null,
          uniqueKey,
          accountInfo: passwordHash,
          ...data
        },
        connection
      )
      user.gender = 'male'
      user.birth = '1991-03-03'
      user.phone = phone
    }
    await UserCategory.create({userId: user.id, categoryIds}, connection)
    await db.commit(connection)
    return user
  } catch (e) {
    if (connection) await db.rollback(connection)
    if (e.code === 'ER_DUP_ENTRY') {
      throw new Error('already_in_use')
    }
    throw e
  }
}

async function findOne(options: IUserFindOne): Promise<IUser> {
  try {
    return await User.findOne(options)
  } catch (e) {
    throw e
  }
}

async function findOneByIdentity(options: IUserFindOneByIdentity): Promise<IUser> {
  try {
    return await User.findOneByIdentity(options)
  } catch (e) {
    throw e
  }
}

async function update(options: IUserUpdate): Promise<void> {
  const connection = await db.beginTransaction()
  try {
    const {nickname, gender, birth, phone, cityId, isMarried, id} = options
    if (nickname || cityId || isMarried !== undefined) {
      await User.updateOne({id, nickname, cityId, isMarried}, connection)
    }
    if (gender || birth || phone) {
      const user = await User.findOne({id})
      await Identity.update({uniqueKey: user.uniqueKey, gender, birth, phone}, connection)
    }
    await db.commit(connection)
  } catch (e) {
    if (connection) await db.rollback(connection)
    if (e.code === 'ER_DUP_ENTRY') {
      throw new Error('already_in_use')
    }
    throw e
  }
}

async function updatePassword(options: {id: number; password: string; newPassword: string}): Promise<void> {
  try {
    const {id, password, newPassword} = options
    const user = await User.findOne({id})
    if (
      user &&
      Code.verifyPassword(password, user.accountInfo.password, user.accountInfo.salt, passwordIterations.mobile)
    ) {
      const passwordHash = await createPasswordHash(newPassword, passwordIterations.mobile)
      await User.updatePassword({id: user.id, accountInfo: passwordHash})
    } else throw new Error('not_found')
  } catch (e) {
    throw e
  }
}

async function updatePoint(options: {userId: number; point: number}, connection?: PoolConnection): Promise<void> {
  try {
    await User.updatePoint(options, connection)
  } catch (e) {
    throw e
  }
}

export {create, findOne, findOneByIdentity, update, updatePassword, updatePoint}
