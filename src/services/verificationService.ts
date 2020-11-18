import {
  IVerification,
  IVerificationCreate,
  IVerificationFindOne,
  IVerificationUpdateOne
} from '../interfaces/verification'
import {Verification} from '../models'
import {createToken, decodeToken} from '../libs/jwt'
import {UserService, VerificationService} from './index'

async function create(options: IVerificationCreate): Promise<{codeToken: string; expireAt: Date; code?: string}> {
  try {
    const {id, code} = await Verification.create(options)
    const exp = Math.floor(Date.now() / 1000) + 3 * 60
    const expireAt = new Date(exp * 1000)
    const codeToken = await createToken({sub: id, exp}, {algorithm: 'RS256'})
    const ret = {codeToken, expireAt, code: ''}
    if (process.env.NODE_ENV !== 'production') {
      ret.code = code
    }
    return ret
  } catch (e) {
    throw e
  }
}

async function updateOne(options: IVerificationUpdateOne): Promise<IVerification> {
  try {
    return await Verification.updateOne(options)
  } catch (e) {
    throw e
  }
}

async function validateSent(options: IVerificationFindOne): Promise<any> {
  try {
    const verification = await Verification.findOne(options)
    if (verification) {
      const checkDate = new Date(verification.createdAt)
      checkDate.setMinutes(checkDate.getMinutes() + 1)
      const now = new Date()
      if (now.getTime() < checkDate.getTime()) {
        throw new Error('already_sent')
      }
    }
  } catch (e) {
    throw e
  }
}

async function confirmCode(options: {
  codeToken: string
  code: string
}): Promise<{email?: string; createdAt?: string; phoneToken?: string}> {
  try {
    const {codeToken, code} = options
    const {sub: id} = await decodeToken(codeToken, {algorithms: ['RS256']})
    const verification = await Verification.findOne({id})
    if (verification) {
      const {code: savedCode, phone, type} = verification
      if (code === savedCode) {
        if (type === 'findId') {
          const user = await UserService.findOneByIdentity({phone})
          if (!user) throw new Error('not_found')
          await VerificationService.updateOne({id, confirmed: true, used: true})
          return {email: user.email, createdAt: user.createdAt}
        }
        await VerificationService.updateOne({id, confirmed: true})
        const exp = Math.floor(Date.now() / 1000) + 30 * 60
        const phoneToken = await createToken({sub: id, exp}, {algorithm: 'RS256'})
        return {phoneToken}
      }
      throw new Error('wrong_code')
    } else {
      throw new Error('expired_token')
    }
  } catch (e) {
    throw e
  }
}

export {create, updateOne, confirmCode, validateSent}
