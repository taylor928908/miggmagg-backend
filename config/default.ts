import * as dotenv from 'dotenv'

dotenv.config()

export = {
  host: 'https://cashfi-api-dev.teentory.com',
  database: {
    database: 'cashfi',
    connectionLimit: 20,
    timezone: 'utc',
    charset: 'utf8mb4',
    debug: []
  },
  mongodb: {
    agenda: 'mongodb://localhost:27017/agenda'
  },
  redis: {
    host: 'localhost',
    port: 6379
  },
  mail: {
    account: {
      service: 'gmail',
      auth: {
        user: 'teentory1030@gmail.com',
        pass: '2018-hangun'
      }
    },
    sender: ['teentory1030@gmail.com']
  },
  swagger: {
    id: 'weplanet',
    password: 'weplanet_1024'
  },
  aws: {
    secrets: 'cashfi/dev',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
    tempBucket: 'cashfi-temp',
    cloudfront: 'https://d35qpk99n6w9e7.cloudfront.net',
    bucket: 'cashfi-dev'
  }
}
