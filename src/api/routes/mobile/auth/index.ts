import {ApiRouter} from '../../default'
import * as ctrl from './auth-ctrl'

const postAuth = new ApiRouter({
  name: '',
  method: 'post',
  summary: '일반 로그인',
  tags: ['Auth'],
  schema: 'requests/mobile/auth/PostAuth',
  isPublic: true,
  responses: {
    200: {schema: 'responses/mobile/user/PostUsers'},
    404: {description: 'Not found'}
  },
  handler: ctrl.postAuth
})

const postAuthRefresh = new ApiRouter({
  name: 'refresh',
  method: 'post',
  summary: '토큰 갱신',
  schema: 'requests/mobile/auth/PostAuthRefresh',
  tags: ['Auth'],
  isPublic: true,
  responses: {
    201: {schema: 'responses/mobile/auth/PostAuthRefresh'},
    401: {
      description: `
      invalid_token
      signed_in_different_device`
    }
  },
  handler: ctrl.postAuthRefresh
})

const putResetPassword = new ApiRouter({
  name: 'reset',
  method: 'put',
  summary: '비밀번호 리셋',
  tags: ['Auth'],
  schema: 'requests/mobile/auth/PutResetPassword',
  isPublic: true,
  responses: {
    200: {description: 'Success!'},
    403: {description: `Expired Token`},
    404: {description: 'Not found'}
  },
  handler: ctrl.putResetPassword
})

export {postAuth, postAuthRefresh, putResetPassword}
