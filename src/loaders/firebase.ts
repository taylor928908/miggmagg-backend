import admin from 'firebase-admin'
import config from 'config'
import {aws, logger} from './'

const awsSecrets: Dictionary = config.get('aws.secrets')

async function init(): Promise<void> {
  const serviceAccount = await aws.getSecretValue(awsSecrets.firebase)
  if (!admin.apps.length) admin.initializeApp({credential: admin.credential.cert(serviceAccount)})
  logger.debug('Firebase loaded')
}

const sendToTopic = async (topic: string, payload: admin.messaging.MessagingPayload): Promise<void> => {
  try {
    const result = await admin.messaging().sendToTopic(topic, payload)
    logger.info(`[FCM] sendToTopic result : ${JSON.stringify(result)}`)
  } catch (e) {
    throw e
  }
}

export {init, sendToTopic}
