//@flow

const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

import type { Env } from '../rules/env'

module.exports = function (env: Env) {
  // db setup
  const redisClient = require('./redis')()

  // app setup
  const app = express()
  app.use(express.static('dist'))

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: env.SESSION_SECRET,
    store: new RedisStore({
      client: redisClient,
      logErrors: true
    })
  }))

  require('./setup-auth')(env, app)
  require('./setup-routes')(app, redisClient)

  // http server setup
  const httpServer = app.listen(env.SERVER_PORT)
}
