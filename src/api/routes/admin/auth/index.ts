import {ApiRouter} from '../../default'
import * as ctrl from './auth-ctrl'

const postAuth = new ApiRouter({
  name: '',
  method: 'post',
  summary: '관리자 로그인',
  schema: 'requests/admin/auth/PostAuth',
  tags: ['Auth'],
  isPublic: true,
  responses: {
    200: {schema: 'responses/admin/auth/PostAuth'},
    404: {description: 'Not found'}
  },
  handler: ctrl.postAuth
})

export {postAuth}
