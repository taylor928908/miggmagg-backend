import {IStoreMissionSettingList, IStoreFindAll} from '../interfaces/storeMissionSetting'
import {StoreMissionSetting} from '../models'

async function findAll(options: IStoreFindAll): Promise<IStoreMissionSettingList> {
  try {
    return await StoreMissionSetting.findAll(options)
  } catch (e) {
    throw e
  }
}

export {findAll}
