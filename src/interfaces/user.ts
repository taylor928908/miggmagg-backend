export interface IUser {
  id?: number
  nickname?: string
  email?: string
  accountInfo?: any
  cityId?: number
  isMarried?: boolean
  referralCode?: string
  referrerId?: number
  gender?: string
  name?: string
  birth?: string
  phone?: string
  uniqueKey?: string
  deviceId?: string
  isMarketing?: boolean
  createdAt?: string
}

export interface IUserCreateOne {
  id?: number
  nickname?: string
  email?: string
  accountInfo?: object
  cityId?: number
  isMarried?: boolean
  referralCode?: string
  referrerId?: number
  gender?: string
  name?: string
  birth?: string
  uniqueKey?: string
  deviceId?: string
  isMarketing?: boolean
  point?: number
}

export interface IUserFindOne {
  uniqueKey?: string
  id?: number
  email?: string
  referralCode?: string
  nickname?: string
}

export interface IUserFindOneByIdentity {
  phone: string
  email?: string
}

export interface IUserUpdatePassword {
  id: number
  accountInfo: {password: string; salt: string}
}

export interface IUserUpdate {
  id: number
  nickname?: string
  gender?: 'male' | 'female'
  birth?: string
  phone?: string
  cityId?: number
  isMarried?: boolean
}
