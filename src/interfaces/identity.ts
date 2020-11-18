export interface IIdentity {
  impUid?: string
  uniqueKey?: string
  name?: string
  gender?: string
  birth?: string
  phone?: string
}

export interface IIdentityCreate {
  impUid: string
  uniqueKey: string
  name: string
  gender: string
  birth: string
  phone: string
}

export interface IIdentityFindOne {
  uniqueKey?: string
  impUid?: string
}
