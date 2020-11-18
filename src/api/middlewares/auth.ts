import {Response} from 'express'
import {jwt as JWT} from '../../libs'
import {Administrator} from '../../models'

function user(roles: string[]) {
  return async function (req: IRequest, res: Response, next?: Function): Promise<void> {
    try {
      const {authorization} = req.headers
      if (authorization && authorization.split(' ')[0] === 'Bearer') {
        const jwtToken = await JWT.decodeToken(authorization.split(' ')[1], {algorithms: ['RS256']})
        if (jwtToken.sub) {
          req.userId = jwtToken.sub
          // if (roles.length && roles.indexOf(jwtToken.type) === -1) throw new Error('forbidden')
          next()
        }
      } else res.status(401).json({message: 'invalid_token'})
    } catch (e) {
      if (e.message === 'forbidden') res.status(403).json({message: 'forbidden'})
      else res.status(401).json({message: 'invalid_token'})
    }
  }
}

function admin(roles: string[]) {
  return async function (req: IRequest, res: Response, next?: Function): Promise<void> {
    try {
      if (req.session && req.session.userId) {
        if (req.session.type === 'admin') {
          const admin = await Administrator.findOne(req.session.userId)
          if (admin.enabled) req.user = admin
          return next()
        }
      }
      res.status(401).json({message: 'invalid_session'})
    } catch (e) {
      res.status(401).json({message: 'invalid_session'})
    }
  }
}

export {user, admin}
