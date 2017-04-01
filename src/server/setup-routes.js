//@flow

import docRoutes from './docs/routes'

import type {
  $Request,
  $Response,
  $Application,
  NextFunction
} from 'express'

import type { Env } from '../rules/env'
import type { RedisClient } from './setup-redis'

module.exports = function setup (env: Env, app: $Application, redisClient: RedisClient) {
  docRoutes(env, app, redisClient)

  app.get('/admin', (req: $Request, res: $Response) => {
    res.send(JSON.stringify(req.user || null))
  })

  // catchall
  app.get('/*', (req: $Request, res: $Response) => { // eslint-disable-line no-unused-vars
    res.status(404).send('not found')
  })
}
