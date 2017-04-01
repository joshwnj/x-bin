// @flow

import type {
  $Request,
  $Response,
  $Application,
  NextFunction
} from 'express'

// Middleware to ensure the user is authenticated before proceeding
module.exports = function requireAuth (req: $Request, res: $Response, next: NextFunction) {
  // If user is authenticated in the session, carry on
  if (typeof req.isAuthenticated === 'function'
      && req.isAuthenticated()) { return next() }

  // Otherwise send 401 response
  res.sendStatus(401)
}
