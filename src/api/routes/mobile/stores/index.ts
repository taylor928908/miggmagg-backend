import {ApiRouter} from '../../default'
import * as ctrl from './stores-ctrl'

const getStores = new ApiRouter({
  name: '',
  method: 'get',
  summary: '매장 조회',
  schema: 'requests/mobile/store/GetStores',
  tags: ['Store'],
  responses: {
    200: {schema: 'responses/mobile/store/GetStores'}
  },
  handler: ctrl.getStores
})

const getStoresMap = new ApiRouter({
  name: 'map',
  method: 'get',
  summary: '매장 조회(지도)',
  schema: 'requests/mobile/store/GetStoresMap',
  tags: ['Store'],
  responses: {
    200: {schema: 'responses/mobile/store/GetStoresMap'}
  },
  handler: ctrl.getStoresMap
})

const getStoresLike = new ApiRouter({
  name: 'like',
  method: 'get',
  summary: '찜한 매장 조회(지도)',
  schema: 'requests/mobile/store/GetStoresLike',
  tags: ['Store'],
  responses: {
    200: {schema: 'responses/mobile/store/GetStoresLike'}
  },
  handler: ctrl.getStoresLike
})

const getStoresVisit = new ApiRouter({
  name: 'visit',
  method: 'get',
  summary: '방문한 매장 조회(지도)',
  schema: 'requests/mobile/store/GetStoresVisit',
  tags: ['Store'],
  responses: {
    200: {schema: 'responses/mobile/store/GetStoresVisit'}
  },
  handler: ctrl.getStoresVisit
})

const getStoresWithId = new ApiRouter({
  name: ':id',
  method: 'get',
  paths: ['common/IdPath'],
  summary: '매장 상세',
  schema: 'requests/mobile/store/GetStoresWithId',
  tags: ['Store'],
  responses: {
    200: {schema: 'responses/mobile/store/GetStoresWithId'}
  },
  handler: ctrl.getStoresWithId
})

export {getStores, getStoresMap, getStoresLike, getStoresVisit, getStoresWithId}
