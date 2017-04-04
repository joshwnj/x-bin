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
    // record user details on login
    const user = req.user
    if (!user) {
      return res.status(404).send('not found')
    }

    const data = ['name', user.name, 'photo', user.photo]
    redisClient.hmset(`authorByEmail:${user.email}`, data, (err, result) => {
      if (err) {
        return res.status(500).send('login failed')
      }

      res.redirect('/')
    })
  })

  app.post('/auth/logout', (req: $Request, res: $Response) => {
    req.session.destroy()
    res.send('ok')
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
