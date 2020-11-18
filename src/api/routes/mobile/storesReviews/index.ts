import {ApiRouter} from '../../default'
import * as ctrl from './storesReviews-ctrl'

const postStoresReviews = new ApiRouter({
  name: '',
  method: 'post',
  summary: '매장 리뷰 등록',
  schema: 'requests/mobile/storeReview/PostStoresReviews',
  tags: ['StoreReview'],
  responses: {
    201: {description: 'Success'},
    404: {description: 'Not found'}
  },
  handler: ctrl.postStoresReviews
})

const getStoresReviews = new ApiRouter({
  name: '',
  method: 'get',
  summary: '매장 리뷰 조회',
  schema: 'requests/mobile/storeReview/GetStoresReviews',
  tags: ['StoreReview'],
  responses: {
    200: {schema: 'responses/mobile/storeReview/GetStoresReviews'},
    404: {description: 'Not found'}
  },
  handler: ctrl.getStoresReviews
})

export {postStoresReviews, getStoresReviews}
