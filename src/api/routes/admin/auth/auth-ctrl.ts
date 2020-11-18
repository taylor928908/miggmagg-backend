import {Response} from 'express'
import {AdministratorService, AuthService} from '../../../../services'

async function postAuth(req: IRequest, res: Response, next: Function): Promise<void> {
  try {
    // const {name, password, remember = false} = req.options
    //
    // const admin = await AuthService.adminSignIn({name, password})
    // if (admin.enabled) {
    //   req.session.userId = admin.id
    //   req.session.type = 'admin'
    //   req.session.clientIp = req.clientIp
    //   req.session.useragent = req.headers['user-agent']
    //   if (remember) req.session.cookie.maxAge = null
    //
    //   const {id, name, authorities, createdAt} = await AdministratorService.findOne(admin.id)
    //   res.status(200).json({id, name, authorities, createdAt})
    // } else throw new Error('not_allowed')
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    else if (e.message === 'not_allowed') e.status = 404
    next(e)
  }
}

export {postAuth}
