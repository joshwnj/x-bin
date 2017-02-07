const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const env = process.env

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

// define all routes
require('./router')(app)

// Server Setup
const httpServer = app.listen(env.SERVER_PORT)
