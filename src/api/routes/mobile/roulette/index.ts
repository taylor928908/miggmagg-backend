import {ApiRouter} from '../../default'
import * as ctrl from './roulette-ctrl'

const postRoulette = new ApiRouter({
  name: '',
  method: 'post',
  summary: '룰렛 결과 가져오기',
  tags: ['Roulette'],
  responses: {
    200: {schema: 'responses/mobile/roulette/PostRoulette'},
    404: {description: 'Not found'}
  },
  handler: ctrl.postRoulette
})

const getRoulette = new ApiRouter({
  name: '',
  method: 'get',
  summary: '룰렛 정보 가져오기',
  tags: ['Roulette'],
  responses: {
    200: {schema: 'responses/mobile/roulette/GetRoulette'},
    404: {description: 'Not found'}
  },
  handler: ctrl.getRoulette
})

export {postRoulette, getRoulette}
