//@flow

import { docToHmset, hmgetToDoc } from '../rules/docs'
import marked from 'marked'
import { join } from 'path'

import type { $Request, $Response, $Application } from 'express'
import type { Doc } from '../rules/docs'

module.exports = function setup (app: $Application, redisClient: Object) {
  app.get('/admin', (req: $Request, res: $Response) => {
    res.send(JSON.stringify(req.user || null))
  })

  app.get('/doc/:id', (req: $Request, res: $Response) => {
    const id = req.params.id

    const docKeys = [ 'id', 'body', 'authorEmail' ]
    redisClient.hmget(`doc:${id}`, docKeys, (err: ?Error, values: Array<any>) => {
      if (err) {
        console.error(err)
        return res.send('error')
      }

      const doc = hmgetToDoc(docKeys, values)

      // TODO: use theme template
      res.send(marked(doc.body))
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

    redisClient.hmset(`doc:${doc.id}`, docToHmset(doc), (err: ?Error) => {
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
