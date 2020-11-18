import {Response} from 'express'
import {AuthService, UserService} from '../../../../services'

async function postAuth(req: IRequest, res: Response, next: Function): Promise<void> {
  try {
    const {email, password} = req.options
    const {accessToken, refreshToken} = await AuthService.userSignIn(email, password)
    const user = await UserService.findOne({email})
    res.status(200).json({accessToken, refreshToken, user})
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

async function postAuthRefresh(req: IRequest, res: Response, next: Function): Promise<void> {
  try {
    const {accessToken, refreshToken} = req.options
    const newAccessToken = await AuthService.refreshToken(accessToken, refreshToken)
    res.status(201).json({accessToken: newAccessToken})
  } catch (e) {
    if (e.message === 'invalid_token') e.status = 401
    else if (e.message === 'signed_in_different_device') e.status = 401
    next(e)
  }
}

async function putResetPassword(req: IRequest, res: Response, next: Function): Promise<void> {
  try {
    const {phone, phoneToken, password} = req.options
    await AuthService.resetPassword(phone, phoneToken, password)
    res.status(200).json()
  } catch (e) {
    if (e.message === 'expired_token') e.status = 403
    if (e.message === 'invalid_token') e.status = 403
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

export {postAuth, postAuthRefresh, putResetPassword}
