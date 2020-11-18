import {ApiRouter} from '../../default'
import * as ctrl from './cities-ctrl'

const getCities = new ApiRouter({
  name: '',
  method: 'get',
  summary: '지역 조회',
  tags: ['City'],
  isPublic: true,
  responses: {
    200: {schema: 'responses/mobile/city/GetCities'},
    404: {description: 'Not found'}
  },
  handler: ctrl.getCities
})

export {getCities}
