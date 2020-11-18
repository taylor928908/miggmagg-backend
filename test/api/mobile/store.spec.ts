import request from 'supertest'
import {expect} from 'chai'
import {express as server} from '../../../src/loaders'
import {AuthRequest, login as userLogin} from './auth.spec'

describe('매장 관련 API', function () {
  let agent
  before(async function () {
    const user = require('../../ingredients/TempUser.json')
    this.authRequest = new AuthRequest(user.email, user.password)
    await userLogin.call(this, agent)
  })
  it('매장 조회', async function () {
    await request(server)
      .get('/api/mobile/stores')
      .set('Authorization', `Bearer ${this.authResponse.accessToken}`)
      .send({lon: 127.096988, lat: 37.502605, search: 'ryan', start: 0, perPage: 20})
      .expect(200)
  })
  it('매장 조회(지도)', async function () {
    await request(server)
      .get('/api/mobile/stores/map')
      .set('Authorization', `Bearer ${this.authResponse.accessToken}`)
      .send({lon: 127.096988, lat: 37.502605, distance: 500000, orderBy: 'distance'})
      .expect(200)
  })
  it('찜한 매장 조회', async function () {
    await request(server)
      .get('/api/mobile/stores/like')
      .set('Authorization', `Bearer ${this.authResponse.accessToken}`)
      .send({lon: 127.096988, lat: 37.502605, start: 0, perPage: 20})
      .expect(200)
  })
  it('방문한 매장 조회', async function () {
    await request(server)
      .get('/api/mobile/stores/visit')
      .set('Authorization', `Bearer ${this.authResponse.accessToken}`)
      .send({lon: 127.096988, lat: 37.502605, start: 0, perPage: 20})
      .expect(200)
  })
  it('매장 상세 조회', async function () {
    await request(server)
      .get('/api/mobile/stores/2')
      .set('Authorization', `Bearer ${this.authResponse.accessToken}`)
      .send({lon: 127.096988, lat: 37.502605})
      .expect(200)
  })
})
