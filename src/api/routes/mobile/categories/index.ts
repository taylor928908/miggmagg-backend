import {ApiRouter} from '../../default'
import * as ctrl from './categories-ctrl'

const getCategories = new ApiRouter({
  name: '',
  method: 'get',
  summary: '카테고리 조회',
  schema: 'requests/mobile/category/GetCategories',
  tags: ['Category'],
  isPublic: true,
  responses: {
    200: {schema: 'responses/mobile/category/GetCategories'},
    404: {description: 'Not found'}
  },
  handler: ctrl.getCategories
})

export {getCategories}
