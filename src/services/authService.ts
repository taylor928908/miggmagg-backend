import config from 'config'
import {v4 as uuid} from 'uuid'
import {code as Code, jwt as JWT} from '../libs'
import {User, Verification} from '../models'
import {createPasswordHash, passwordIterations} from '../libs/code'
import {decodeToken} from '../libs/jwt'
import {db} from '../loaders'

const host = config.get('host')

async function userSignIn(email: string, password: string): Promise<{accessToken: string; refreshToken: string}> {
  try {
    const user = await User.findOne({email})
    if (
      user &&
      Code.verifyPassword(password, user.accountInfo.password, user.accountInfo.salt, passwordIterations.mobile)
    ) {
      const deviceId = uuid()
      const accessToken = await JWT.createAccessToken({
        userId: user.id,
        deviceId
      })
      const refreshToken = await JWT.createRefreshToken({userId: user.id}, user.accountInfo.salt)
      await User.updateOne({id: user.id, deviceId})
      return {accessToken, refreshToken}
    }
    throw new Error('not_found')
  } catch (e) {
    throw e
  }
}

async function userSignUp(
  userId: number,
  salt: string,
  deviceId: string
): Promise<{accessToken: string; refreshToken: string}> {
  try {
    const accessToken = await JWT.createAccessToken({userId, deviceId})
    const refreshToken = await JWT.createRefreshToken({userId}, salt)
    return {accessToken, refreshToken}
  } catch (e) {
    throw e
  }
}

async function refreshToken(accessToken: string, refreshToken: string): Promise<string> {
  try {
    const payload = await JWT.decodeToken(accessToken, {algorithms: ['RS256'], ignoreExpiration: true})
    const {accountInfo} = await User.findOne(payload.sub)
    await JWT.decodeToken(refreshToken, {algorithms: ['HS256']}, accountInfo.salt)
    delete payload.iat
    delete payload.exp
    delete payload.nbf
    delete payload.jti
    return await JWT.createAccessToken({userId: payload.sub})
  } catch (e) {
    throw e
  }
}

async function resetPassword(phone: string, phoneToken: string, password: string): Promise<any> {
  const connection = await db.beginTransaction()
  try {
    const verification = await Verification.findOne({phone, type: 'resetPassword', confirmed: true, used: false})
    if (!verification) {
      throw new Error('expired_token')
    }
    await decodeToken(phoneToken, {algorithms: ['RS256']})
    await Verification.updateOne({id: verification.id, used: true}, connection)
    const user = await User.findOneByIdentity({phone})
    if (!user) throw new Error('not_found')
    const passwordHash = await createPasswordHash(password, passwordIterations.mobile)
    await User.updatePassword({id: user.id, accountInfo: passwordHash}, connection)
    await db.commit(connection)
  } catch (e) {
    if (connection) await db.rollback(connection)
    throw e
  }
}

// async function studentUpdatePassword(
//   id: number,
//   password: string,
//   newPassword: string
// ): Promise<{accessToken: string; refreshToken: string}> {
//   try {
//     const student = await Student.findOneSecret(id)
//     if (student && Code.verifyPassword(password, student.password, student.salt, passwordIterations.student)) {
//       const passwordHash = createPasswordHash(newPassword, passwordIterations.student)
//       await Student.updatePassword({
//         id,
//         password: passwordHash.password,
//         salt: passwordHash.salt
//       })
//       const accessToken = await JWT.createAccessToken({
//         userId: student.id,
//         type: 'owner'
//       })
//       const refreshToken = await JWT.createRefreshToken({userId: student.id, type: 'owner'}, student.salt)
//       return {accessToken, refreshToken}
//     }
//     throw new Error('not_found')
//   } catch (e) {
//     throw e
//   }
// }

export {
  userSignIn,
  userSignUp,
  refreshToken,
  resetPassword
}
