import Iamport from 'iamport'
import config from 'config'
import {IIdentityCreate} from '../interfaces/identity'

import {aws, logger} from './'

const awsSecrets: string = config.get('aws.secrets')
let iamport
let awsConfig

interface IImpRequest {
  imp_uid: string
}

interface IImpPayment extends IImpRequest{
  merchant_uid: string
}

async function init(): Promise<void> {
  awsConfig = await aws.getSecretValue(awsSecrets)
  iamport = new Iamport({
    impKey: awsConfig.impKey,
    impSecret: awsConfig.impSecret
  })
  logger.debug('Iamport loaded')
}

const banks = [
  {code: '04', name: 'KB국민은행'},
  {code: '23', name: 'SC제일은행'},
  {code: '39', name: '경남은행'},
  {code: '34', name: '광주은행'},
  {code: '03', name: '기업은행'},
  {code: '11', name: '농협'},
  {code: '31', name: '대구은행'},
  {code: '32', name: '부산은행'},
  {code: '02', name: '산업은행'},
  {code: '45', name: '새마을금고'},
  {code: '07', name: '수협'},
  {code: '88', name: '신한은행'},
  {code: '48', name: '신협'},
  {code: '05', name: '외환은행'},
  {code: '20', name: '우리은행'},
  {code: '71', name: '우체국'},
  {code: '37', name: '전북은행'},
  {code: '16', name: '축협'},
  {code: '90', name: '카카오뱅크'},
  {code: '89', name: '케이뱅크'},
  {code: '81', name: '하나은행(서울은행)'},
  {code: '53', name: '한국씨티은행(한미은행)'}
]

async function getByImpUid(request: IImpPayment): Promise<Dictionary> {
  return await iamport.payment.getByImpUid(request)
}

async function cancel(request: IImpPayment): Promise<void> {
  await iamport.payment.cancel(request)
}

async function getCertification(request: IImpRequest): Promise<IIdentityCreate> {
  try {
    const {unique_key, name, gender, birth, phone} = await iamport.certification.get(request)
    console.log(unique_key, name, gender, birth, phone)
    return {impUid: request.imp_uid, uniqueKey: unique_key, name, gender, birth, phone}
  } catch (e) {
    console.log(e)
  }
}

export {init, getByImpUid, cancel, getCertification, banks}
