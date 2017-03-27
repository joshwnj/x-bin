//@flow

import { join } from 'path'
import docsRedis from '../rules/docs-redis'
import { renderDoc } from '../rules/docs'

import type {
  $Request,
  $Response,
  $Application,
  NextFunction
} from 'express'

import type { Env } from '../rules/env'

import type { Doc, DocTheme } from '../rules/docs'

import type { RedisClient } from './setup-redis'

// Middleware to ensure the user is authenticated before proceeding
function requireAuth (req: $Request, res: $Response, next: NextFunction) {
  // If user is authenticated in the session, carry on
  if (typeof req.isAuthenticated === 'function'
      && req.isAuthenticated()) { return next() }

  // Otherwise send 401 response
  res.sendStatus(401)
}

function createTheme (themePath: string): DocTheme {
  return {
    // TODO: unhardcode
    tpl: require('../../.theme/tpl.js')
  }
}

module.exports = function setup (env: Env, app: $Application, redisClient: RedisClient) {
  const docTheme = env.DOC_THEME ? createTheme(env.DOC_THEME) : null

  app.get('/admin', (req: $Request, res: $Response) => {
    res.send(JSON.stringify(req.user || null))
  })

  app.get('/doc/:id', requireAuth, (req: $Request, res: $Response) => {
    const id = req.params.id

    docsRedis.findById(id, redisClient, (err: ?Error, doc: ?Doc) => {
      if (err) {
        console.error(err)
        return res.send('error')
      }

      if (!doc) {
        return res
          .status(404)
          .send('not found')
      }

      // TODO: use theme template
      res.send(renderDoc(doc, docTheme))
    })
  })

  app.post('/api/doc', requireAuth, (req: $Request, res: $Response) => {
    const user:any = req.user || {}
    const body:any = req.body || {}

    // TODO: make id optional, and generate one if needed
    const doc:Doc = {
      id: body.id,
      body: body.body,
      authorEmail: user.email
    }

    docsRedis.create(doc, redisClient, (err: ?Error) => {
      if (err) {
        console.error(err)
        return res.send('error')
      }

      res.send(JSON.stringify({
        ok: true,
        id: doc.id
      }))
    })
  })

  // catchall
  app.get('/*', (req: $Request, res: $Response) => { // eslint-disable-line no-unused-vars
    res.sendFile(join(__dirname, '..', '..', 'dist', 'index.html'))
  })
}
