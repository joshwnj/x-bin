//@flow

const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

import type { Env } from '../rules/env'

module.exports = function (env:Env) {
  // db setup
  const redisClient = require('./redis')()

  // App Setup
  const app = express()
  app.use(express.static('dist'))
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: env.SESSION_SECRET,
    store: new RedisStore({
      client: redisClient,
      logErrors: true
    })
  }))

  require('./setup-routes')(app)

  // Server Setup
  const httpServer = app.listen(env.SERVER_PORT)
}
