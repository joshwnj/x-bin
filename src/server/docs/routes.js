// @flow

import authorsRedis from '../../rules/authors-redis'
import docsRedis from '../../rules/docs-redis'
import { renderDoc } from '../../rules/docs'
import requireAuth from '../require-auth'
import tpl from '../tpl'

import type {
  $Request,
  $Response,
  $Application,
  NextFunction
} from 'express'

import type { Env } from '../../rules/env'
import type { Author } from '../../rules/authors'
import type { Doc, DocTheme } from '../../rules/docs'
import type { RedisClient } from '../setup-redis'

function createTheme (themePath: string): DocTheme {
  return {
    // TODO: unhardcode
    tpl: require('../../../.theme/tpl.js')
  }
}

module.exports = function setup (env: Env, app: $Application, redisClient: RedisClient) {
  const docTheme = env.DOC_THEME ? createTheme(env.DOC_THEME) : null

  app.get('/api/doc/:id', requireAuth, (req: $Request, res: $Response) => {
    const id = req.params.id

    docsRedis.findById(id, redisClient, (err: ?Error, doc: ?Doc) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .send('error')
      }

      if (!doc) {
        return res
          .status(404)
          .send('not found')
      }

      const email = doc.authorEmail
      authorsRedis.findByEmail(email, redisClient, (err: ?Error, author: ?Author) => {
        // TODO: use theme template for markdown docs
        res.send({
          ok: true,
          doc,
          author: author || { email }
        })
      })
    })
  })

  app.post('/api/doc', requireAuth, (req: $Request, res: $Response) => {
    const user:any = req.user || {}
    const payload:any = req.body || {}

    // TODO: make id optional, and generate one if needed
    const now = new Date
    const doc:Doc = {
      id: payload.id,
      content: payload.content,
      createdAt: now,
      updatedAt: now,
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
}
