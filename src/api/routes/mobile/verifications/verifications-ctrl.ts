import {Response} from 'express'
import {getCertification} from '../../../../loaders/iamport'
import {IdentityService, UserService, VerificationService} from '../../../../services'
import {createToken, decodeToken} from '../../../../libs/jwt'

// import {sendVerificationCode} from '../../../../loaders/sms'

async function postVerificationsIdentity(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const userInfo = await getCertification({imp_uid: req.options.impUid})
    const user = await UserService.findOne({uniqueKey: userInfo.uniqueKey})
    if (!user) {
      await IdentityService.create(userInfo)
      res.status(200).json()
    } else res.status(409).json()
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    if (e.message === 'already_in_use') e.status = 409
    next(e)
  }
}

async function postVerificationsPhone(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {type, phone} = req.options
    if (type === 'id') {
      const user = await UserService.findOneByIdentity({phone})
      if (!user) throw new Error('not_found')
    }
    await VerificationService.validateSent({type, phone})
    const ret = await VerificationService.create({phone, type})
    // await sms.sendVerificationCode(phone, code)
    res.status(200).json(ret)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    if (e.message === 'already_sent') e.status = 403
    next(e)
  }
}

async function postVerificationsConfirm(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {codeToken, code} = req.options
    const ret = await VerificationService.confirmCode({codeToken, code})
    res.status(200).json(ret)
  } catch (e) {
    if (e.message === 'expired_token') e.status = 403
    if (e.message === 'invalid_token') e.status = 403
    if (e.message === 'not_found') e.status = 404
    if (e.message === 'wrong_code') e.status = 409
    next(e)
  }
}

async function getVerificationsIdentity(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    res.render('identity', {
      impAccount: 'imp34706599',
      requestUrl: `https://cashfi-api${
        process.env.NODE_ENV !== 'production' ? '' : '-dev'
      }.danbicorp.com/api/mobile/verifications/identity`
    })
  } catch (e) {
    next(e)
  }
}

async function getVerificationsEmail(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const user = await UserService.findOne({email: req.options.email})
    if (user) res.status(409).json()
    else res.status(200).json()
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    if (e.message === 'expired') e.status = 403
    next(e)
  }
}

async function getVerificationsNickname(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const user = await UserService.findOne({nickname: req.options.nickname})
    if (user) res.status(409).json()
    else res.status(200).json()
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

async function getVerificationsReset(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {email, phone} = req.options
    const user = await UserService.findOneByIdentity({email, phone})
    if (user) res.status(200).json()
    else res.status(404).json()
  } catch (e) {
    next(e)
  }
}

export {
  postVerificationsIdentity,
  postVerificationsPhone,
  postVerificationsConfirm,
  getVerificationsIdentity,
  getVerificationsEmail,
  getVerificationsNickname,
  getVerificationsReset
}
