import request from 'supertest'
import {expect} from 'chai'
import {express as server} from '../../../src/loaders'
import {AuthRequest, login as userLogin} from './auth.spec'

describe('매장 리뷰 관련 API', function () {
  let agent
  before(async function () {
    const user = require('../../ingredients/TempUser.json')
    this.authRequest = new AuthRequest(user.email, user.password)
    await userLogin.call(this, agent)
  })
  // it('매장 리뷰 등록', async function () {
  //   await request(server)
  //     .post('/api/mobile/storesReviews')
  //     .set('Authorization', `Bearer ${this.authResponse.accessToken}`)
  //     .send({contents: 'test', storeId: 1, star: 5})
  //     .expect(201)
  // })
  it('매장 리뷰 조회', async function () {
    await request(server)
      .get('/api/mobile/storesReviews')
      .set('Authorization', `Bearer ${this.authResponse.accessToken}`)
      .send({storeId: 1, start: 0, perPage: 20})
      .expect(200)
  })
})
