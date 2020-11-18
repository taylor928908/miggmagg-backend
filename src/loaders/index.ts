import * as aws from './aws'
import * as logger from './logger'
import * as mysql from './mysql'
import * as iamport from './iamport'
import * as firebase from './firebase'
import * as mailer from './mailer'
import express from './express'

export async function init(): Promise<void> {
  // await Promise.all([mysql.init(), iamport.init(), firebase.init()])
  await Promise.all([mysql.init()])
}

export {aws, logger, mysql as db, iamport, firebase, mailer, express}
