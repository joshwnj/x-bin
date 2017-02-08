//@flow

import { normalizeWhitelist, isEmailInWhitelist } from '../rules/auth'

import type { Env } from '../rules/env'
import type { $Application } from 'express'

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

module.exports = function (env: Env, app: $Application) {
  const whitelist = normalizeWhitelist(env.GOOGLE_AUTH_WHITELIST)

  const opts = {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL
  }

  // Create Google strategy
  const googleLogin = new GoogleStrategy(opts, (accessToken, refreshToken, profile, done) => { // eslint-disable-line no-unused-vars
    const user = {}

    // store info from the user's google profile
    user.id = profile.id
    user.token = accessToken
    user.name = profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`
    user.photo = profile.photos[0].value
    user.email = profile.emails[0].value
    user.domain = profile._json ? profile._json.domain : 'unknown'

    if (user.id !== null && isEmailInWhitelist(whitelist, user.email)) {
      return done(null, user)
    } else {
      return done(null, false, { message: 'You don\'t have access to the dashboard.' })
    }
  })

  // tell passport to use google auth
  passport.use(googleLogin)

  // tell express to use passport middleware
  app.use(passport.initialize())
  app.use(passport.session())

  // ----
  // routes for google auth

  // - initiate login
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  // - callback that google auth brings the user back to
  // (need to make sure google is configured with the same route)
  //app.get(env.GOOGLE_CALLBACK_URL, passport.authenticate('google', {
  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/admin',
    successRedirect: '/admin',
    failureFlash: true
  }))
}
