import jwt, {Secret, SignOptions, VerifyOptions} from 'jsonwebtoken'
import fs from 'fs'

const privateKey = fs.readFileSync(`${__dirname}/private.pem`)
const publicKey = fs.readFileSync(`${__dirname}/public.pem`)

interface IResetPasswordPayload {
  email: string
  type: 'student'
}

interface IUserPayload {
  userId: number
  deviceId?: string
}

async function createToken(payload: Dictionary, options: SignOptions, secret: Secret = privateKey): Promise<string> {
  try {
    return await jwt.sign(payload, secret, options)
  } catch (e) {
    throw e
  }
}

async function decodeToken(token: string, options: VerifyOptions, secret: Secret = publicKey): Promise<any> {
  try {
    return await jwt.verify(token, secret, options)
  } catch (e) {
    throw new Error('invalid_token')
  }
}

async function createAccessToken(data: IUserPayload): Promise<string> {
  try {
    const {userId, deviceId} = data
    const payload: Dictionary = {sub: userId, deviceId}
    return await createToken(payload, {
      algorithm: 'RS256',
      expiresIn: 60 * 60
    })
  } catch (e) {
    throw e
  }
}

async function createRefreshToken(data: IUserPayload, tokenSecret: Secret): Promise<string> {
  try {
    const payload = {
      sub: data.userId
    }
    return await createToken(payload, {algorithm: 'HS256', expiresIn: 60 * 60}, tokenSecret)
  } catch (e) {
    throw e
  }
}

export {decodeToken, createToken, createAccessToken, createRefreshToken}
