import nodemailer from 'nodemailer'
import ejs from 'ejs'
import path from 'path'
import config from 'config'

const mailConfig: Dictionary = config.get('mail')
const transporter = nodemailer.createTransport(mailConfig.account)

async function sendToUsers(to, subject, html): Promise<void> {
  try {
    if (['development', 'production'].indexOf(process.env.NODE_ENV) === -1) return
    if (process.env.NODE_ENV !== 'production') subject = `[DEV]${subject}`
    const mailOptions = {
      from: mailConfig.sender,
      to,
      subject,
      html
    }
    await transporter.sendMail(mailOptions)
  } catch (e) {
    throw e
  }
}

async function sendResetPassword(to: string, name: string, url: string): Promise<void> {
  try {
    const subject = '패스워드 변경'
    const html = await ejs.renderFile(
      path.join(__dirname, '../views/resetPasswordEmailSend.ejs'),
      {name, url},
      {async: true}
    )
    await sendToUsers(to, subject, html)
  } catch (e) {
    throw e
  }
}

async function sendTempPassword(to: string, name: string, password: string): Promise<void> {
  try {
    const subject = '임시 패스워드 발급'
    const html = await ejs.renderFile(
      path.join(__dirname, '../views/resetPasswordResult.ejs'),
      {name, password},
      {async: true}
    )
    await sendToUsers(to, subject, html)
  } catch (e) {
    throw e
  }
}

export {sendResetPassword, sendTempPassword}
