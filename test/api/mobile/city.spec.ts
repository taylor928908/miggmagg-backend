import request from 'supertest'
import {express as server} from '../../../src/loaders'

describe('지역 관련 API', function () {
  it('지역 리스트 조회', async function () {
    await request(server).get('/api/mobile/cities').send().expect(200)
  })
})
