import {init as initLoaders, express, logger} from './loaders'

const port = process.env.PORT || 4000
;(async () => {
  await initLoaders()
  const server = express.listen(port, () => {
    const addr = server.address()
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
    logger.debug(`Listening on ${bind}`)
  })
})()
