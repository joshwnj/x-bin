//@flow

const path = require('path')

import type { $Request, $Response, $Application } from 'express'
import type { Doc } from '../rules/docs'

module.exports = function setup (app: $Application, redisClient: Object) {
  app.get('/admin', (req: $Request, res: $Response) => {
    res.send(JSON.stringify(req.user || null))
  })

  app.get('/doc/:id', (req: $Request, res: $Response) => {
    const id = req.params.id

    redisClient.hmget(`doc:${id}`, [ 'id', 'body', 'authorEmail' ], (err, result:Array<any>) => {
      if (err) {
        console.error(err)
        return res.send('error')
      }

      const doc:Doc = {
        id: result[0],
        body: result[1],
        authorEmail: result[2]
      }

      // TODO: render body as markdown, with theme template
      res.send(JSON.stringify(doc))
    })
  })

  app.post('/api/doc', (req: $Request, res: $Response) => {
    const user:any = req.user || {}
    const body:any = req.body || {}
    const doc:Doc = {
      id: body.id,
      body: body.body,
      authorEmail: user.email
    }

    redisClient.hmset(`doc:${doc.id}`, [
      'id', doc.id,
      'body', doc.body,
      'authorEmail', doc.authorEmail
    ], (err) => {
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
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'))
  })
}
