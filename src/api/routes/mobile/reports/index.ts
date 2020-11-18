import {ApiRouter} from '../../default'
import * as ctrl from './report-ctrl'

const postReports = new ApiRouter({
  name: '',
  method: 'post',
  schema: 'requests/mobile/report/PostReports',
  summary: '신고하기',
  tags: ['Report'],
  responses: {
    201: {description: 'success'},
    404: {description: 'Not found'}
  },
  handler: ctrl.postReports
})

export {postReports}
