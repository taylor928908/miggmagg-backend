import popbill from 'popbill'

const IsTest = process.env.NODE_ENV !== 'production'
const config = require('../config')

popbill.config({
  LinkID: config.popbill.linkId,
  SecretKey: config.popbill.secretKey,
  IsTest,
  defaultErrorHandler: (err) => {
    console.error(`err : [${err.code}] ${err.message}`)
  }
})
const messageService = popbill.MessageService()

const sendSMS = async (phone, contents) => {
  return new Promise((resolve, reject) => {
    try {
      const senderPhone = IsTest ? config.popbill.testSenderPhone : config.popbill.senderPhone

      messageService.sendSMS(
        config.popbill.corporateNumber, //사업자 등록 번호
        senderPhone, //발신자 번호
        phone, //수신자 번호
        '', //수신자명
        `[BARO] ${contents}`, //메시지 내용
        '', //예약 문자 시간 (누락 시 즉시 전송)
        false, //광고 문자 여부
        (result) => {
          console.info(`[SMS] sendUser result : ${result}`)
          resolve(result)
        },
        (err) => {
          console.error(`[SMS] sendUser err : ${JSON.stringify(err)}`)
          reject(err)
        }
      )
    } catch (err) {
      console.error(`[SMS] sendUser err : ${JSON.stringify(err)}`)
      resolve(err)
    }
  })
}

const sendVerificationCode = async (phone: string, code: string): Promise<any> => {
  const message = `[BARO] 인증번호는 ${code} 입니다.`
  await sendSMS(phone, message)
}

const sendResetPassword = async (phone: string, password: string): Promise<any> => {
  const message = `[BARO] 임시비밀 번호는 ${password}입니다.`
  await sendSMS(phone, message)
}

export {sendVerificationCode, sendResetPassword}
