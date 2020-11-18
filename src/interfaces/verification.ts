export interface IVerification {
  id?: number
  phone: string
  type: string
  code: string
  confirmed?: string
  used?: string
  createdAt?: string
}

export interface IVerificationCreate {
  phone: string
  type: string
}

export interface IVerificationFindOne {
  id?: number
  phone?: string
  type?: string
  used?: boolean
  confirmed?: boolean
}

export interface IVerificationUpdateOne {
  id: number
  confirmed?: boolean
  used?: boolean
}
