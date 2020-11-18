import Agenda from 'agenda'
import config from 'config'
import moment from 'moment-timezone'
import {StoreMissionSettingService, StoreUserService} from '../services/index'
import {IStoreMissionSetting} from '../interfaces/storeMissionSetting'

// require('moment-timezone')

moment.tz.setDefault('Asia/Seoul')

const mongoDbConfig: Dictionary = config.get('mongodb')
const mongoConnectionString = mongoDbConfig.agenda
const updateStoresUsersMissionInfoJob = 'update storesUsers mission info'
const agenda = new Agenda({db: {address: mongoConnectionString, options: {useUnifiedTopology: true}}})

async function updateStoresUsers(data: IStoreMissionSetting[], totalPage: number, page: number): Promise<void> {
  try {
    if (page === 1) {
      for (let i = 0; i < data.length; i++) {
        const {storeId, hour, type} = data[i]
        const users = await StoreUserService.findAllWithStoreId({storeId})
        for (let j = 0; j < users.data.length; j++) {
          const {storeId, userId} = users.data[j]
          if (type === 'hour') {
            const currentHour = await moment().format('HH')
            if (Number(currentHour) === hour) await StoreUserService.deleteOne({storeId, userId})
          } else {
          }
        }
      }
    }
  } catch (e) {
    console.error(e)
  }
}

async function getStoreMissionSetting() {
  try {
    const start = 0
    const perPage = 1000
    const data = await StoreMissionSettingService.findAll({start, perPage})
    await updateStoresUsers(data.data, data.total / 1000, 1)
    console.log('job success')
  } catch (e) {
    console.error(e)
  }
}

if (process.env.NODE_ENV === 'production') {
  ;(async function generateAgenda(): Promise<void> {
    agenda.define(
      updateStoresUsersMissionInfoJob,
      {priority: 'high', concurrency: 1},
      async (job) => await getStoreMissionSetting()
    )
    await agenda.start()
    await agenda.every('0 * * * *', updateStoresUsersMissionInfoJob, null, {timezone: 'Asia/Seoul'})
    return agenda
  })()
}

export {agenda}
