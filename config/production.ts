export = {
  host: 'https://admin.teentory.com',
  database: {
    connectionLimit: 100,
    timezone: 'utc',
    charset: 'utf8mb4',
    debug: []
  },
  mongodb: {
    agenda: 'mongodb://mongodb/agenda'
  },
  redis: {
    host: 'redis',
    port: 6379
  },
  aws: {
    secrets: 'cashfi/prod',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
    tempBucket: 'cashfi-temp',
    cloudfront: 'https://d35qpk99n6w9e7.cloudfront.net',
    bucket: 'cashfi-prod'
  }
}
