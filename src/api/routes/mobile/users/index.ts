import {ApiRouter} from '../../default'
import * as ctrl from './users-ctrl'

const postUsers = new ApiRouter({
  name: '',
  method: 'post',
  summary: '회원가입',
  tags: ['User'],
  schema: 'requests/mobile/user/PostUsers',
  isPublic: true,
  responses: {
    201: {schema: 'responses/mobile/user/PostUsers'},
    404: {description: 'Not found'},
    409: {description: 'Already In use'}
  },
  handler: ctrl.postUsers
})

const getUsers = new ApiRouter({
  name: '',
  method: 'get',
  summary: '회원정보 조회',
  tags: ['User'],
  responses: {
    200: {schema: 'responses/mobile/user/GetUsers'},
    404: {description: 'Not found'}
  },
  handler: ctrl.getUsers
})

const putUsers = new ApiRouter({
  name: '',
  method: 'put',
  summary: '회원정보 수정',
  schema: 'requests/mobile/user/PutUsers',
  tags: ['User'],
  responses: {
    200: {description: 'Success'},
    404: {description: 'Not found'}
  },
  handler: ctrl.putUsers
})

const putUsersPassword = new ApiRouter({
  name: 'password',
  method: 'put',
  summary: '비밀번호 재설정',
  schema: 'requests/mobile/user/PutUsersPassword',
  tags: ['User'],
  responses: {
    200: {description: 'Success'},
    404: {description: 'Not found'}
  },
  handler: ctrl.putUsersPassword
})

export {postUsers, getUsers, putUsers, putUsersPassword}
