import request from 'supertest'
import {expect} from 'chai'
import {express as server} from '../../../src/loaders'
import {AuthRequest, login as userLogin} from './auth.spec'

describe('신고 관련 API', function () {
  let agent
  before(async function () {
    const user = require('../../ingredients/TempUser.json')
    this.authRequest = new AuthRequest(user.email, user.password)
    await userLogin.call(this, agent)
  })
  it('신고하기', async function () {
    await request(server)
      .post('/api/mobile/reports')
      .set('Authorization', `Bearer ${this.authResponse.accessToken}`)
      .send({content: {storeId: 1}, target: 'store', type: 'inappropriate'})
      .expect(201)
  })
})
