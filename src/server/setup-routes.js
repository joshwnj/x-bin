//@flow

import docRoutes from './docs/routes'
import tpl from './tpl'

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
    res.redirect('/')
  })

  // index
  app.get('/', (req: $Request, res: $Response) => { // eslint-disable-line no-unused-vars
    const data = {}

    const user = req.user
    if (user) {
      data.user = {
        photo: user.photo,
        name: user.name,
        email: user.email
      }
    }

    res.send(tpl(data))
  })

  // catchall
  app.get('/*', (req: $Request, res: $Response) => { // eslint-disable-line no-unused-vars
    res.status(404).send('not found')
  })
}
