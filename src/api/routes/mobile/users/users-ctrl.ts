import {Response} from 'express'
import {UserService, AuthService} from '../../../../services'

async function postUsers(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {email, nickname, password, impUid, cityId, isMarried, categoryIds, referralCode, isMarketing} = req.options
    const user = await UserService.create({
      email,
      nickname,
      password,
      impUid,
      cityId,
      isMarried,
      categoryIds,
      referralCode,
      isMarketing
    })
    const {accessToken, refreshToken} = await AuthService.userSignUp(email, user.accountInfo.salt, user.deviceId)
    res.status(201).json({accessToken, refreshToken, user})
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    if (e.message === 'already_in_use') e.status = 409
    next(e)
  }
}

async function getUsers(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const user = await UserService.findOne({id: req.userId})
    res.status(200).json(user)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    if (e.message === 'already_in_use') e.status = 409
    next(e)
  }
}

async function putUsers(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {nickname, gender, birth, phone, cityId, isMarried} = req.options
    await UserService.update({nickname, gender, birth, phone, cityId, isMarried, id: req.userId})
    res.status(200).json()
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    if (e.message === 'already_in_use') e.status = 409
    next(e)
  }
}

async function putUsersPassword(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {password, newPassword} = req.options
    await UserService.updatePassword({id: req.userId, password, newPassword})
    res.status(200).json()
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

export {postUsers, getUsers, putUsers, putUsersPassword}
