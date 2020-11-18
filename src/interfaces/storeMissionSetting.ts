export interface IStoreMissionSetting {
  storeId: number
  hour: number
  type: 'hour' | 'perHour'
}

export interface IStoreFindAll {
  start: number
  perPage: number
}

export type IStoreMissionSettingList = IResponseList<IStoreMissionSetting>
