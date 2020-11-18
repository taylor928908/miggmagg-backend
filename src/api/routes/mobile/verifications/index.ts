import {ApiRouter} from '../../default'
import * as ctrl from './verifications-ctrl'

const postVerificationsIdentity = new ApiRouter({
  name: 'identity',
  method: 'post',
  summary: '본인인증 확인',
  schema: 'requests/mobile/verification/PostVerificationsIdentity',
  tags: ['Verification'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    409: {description: 'Already user'}
  },
  handler: ctrl.postVerificationsIdentity
})

const postVerificationsPhone = new ApiRouter({
  name: 'phone',
  method: 'post',
  summary: '인증번호 발송 요청',
  schema: 'requests/mobile/verification/PostVerificationsPhone',
  tags: ['Verification'],
  isPublic: true,
  responses: {
    200: {schema: 'responses/mobile/verification/PostVerificationsPhone'},
    403: {description: 'Already Sent'},
    404: {description: 'Not Found'}
  },
  handler: ctrl.postVerificationsPhone
})

const postVerificationsConfirm = new ApiRouter({
  name: 'confirm',
  method: 'post',
  summary: '인증번호 확인',
  schema: 'requests/mobile/verification/PostVerificationsConfirm',
  tags: ['Verification'],
  isPublic: true,
  responses: {
    200: {schema: 'responses/mobile/verification/PostVerificationsConfirm'},
    403: {description: 'Expired Token'},
    404: {description: 'Not Found'},
    409: {description: 'Wrong Code'}
  },
  handler: ctrl.postVerificationsConfirm
})

const getVerificationsIdentity = new ApiRouter({
  name: 'identity',
  method: 'get',
  summary: '본인인증 웹뷰 호출',
  tags: ['Verification'],
  isPublic: true,
  responses: {
    200: {description: 'success'}
  },
  handler: ctrl.getVerificationsIdentity
})

const getVerificationsEmail = new ApiRouter({
  name: 'email',
  method: 'get',
  summary: '이메일 중복 확인',
  schema: 'requests/mobile/verification/GetVerificationsEmail',
  tags: ['Verification'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    409: {description: 'Already user'}
  },
  handler: ctrl.getVerificationsEmail
})

const getVerificationsNickname = new ApiRouter({
  name: 'nickname',
  method: 'get',
  summary: '닉네임 중복 확인',
  schema: 'requests/mobile/verification/GetVerificationsNickname',
  tags: ['Verification'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    409: {description: 'Already user'}
  },
  handler: ctrl.getVerificationsNickname
})

const getVerificationsReset = new ApiRouter({
  name: 'reset',
  method: 'get',
  summary: '비밀번호 재설정 > 이메일, 핸드폰번호 확인',
  schema: 'requests/mobile/verification/GetVerificationsReset',
  tags: ['Verification'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    404: {description: 'Not Found'}
  },
  handler: ctrl.getVerificationsReset
})

export {
  postVerificationsIdentity,
  postVerificationsPhone,
  postVerificationsConfirm,
  getVerificationsIdentity,
  getVerificationsEmail,
  getVerificationsNickname,
  getVerificationsReset
}
