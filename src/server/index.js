//@flow

import { normalize as normalizeEnv } from '../rules/env'
import createRedisClient from './setup-redis'

const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

import type { Env } from '../rules/env'

const env = normalizeEnv(process.env)

// db setup
const redisClient = createRedisClient()

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

require('express-google-oauth')(app, {
  whitelist: env.GOOGLE_AUTH_WHITELIST
})

require('./setup-routes')(env, app, redisClient)

// http server setup
const httpServer = app.listen(env.SERVER_PORT)
