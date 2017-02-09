//@flow

import { normalizeWhitelist, isEmailInWhitelist } from '../rules/auth'

import type { Env } from '../rules/env'
import type {
  Opts as GoogleAuthOpts,
  Profile as GoogleProfile
} from '../rules/google-auth'
import type { $Application } from 'express'

type User = {
  id: string,
  token: string,
  name: string,
  photo: string,
  email: string,
  domain: string
}

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

  const opts: GoogleAuthOpts = {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL
  }

  type LoginDoneCb = (err: ?Error, user: ?User|boolean, message: any) => void
  const loginCb = (accessToken: string, refreshToken: string, profile: GoogleProfile, done: LoginDoneCb) => { // eslint-disable-line no-unused-vars
    // store info from the user's google profile
    const profileJson = profile.__json || { domain: 'unknown' }
    const user: User = {
      id: profile.id,
      token: accessToken,
      name: profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`,
      photo: profile.photos[0].value,
      email: profile.emails[0].value,
      domain: profileJson.domain
    }

    if (user.id !== null && isEmailInWhitelist(whitelist, user.email)) {
      return done(null, user)
    } else {
      return done(null, false, { message: 'You don\'t have access to the dashboard.' })
    }
  }

  // tell passport to use google auth
  passport.use(new GoogleStrategy(opts, loginCb))

  // tell express to use passport middleware
  app.use(passport.initialize())
  app.use(passport.session())

  // ----
  // routes for google auth

  // - initiate login
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  // - callback that google auth brings the user back to
  // (need to make sure google is configured with the same route)
  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/admin',
    successRedirect: '/admin',
    failureFlash: true
  }))
}
