//@flow

const path = require('path')

import type { $Request, $Response, $Application } from 'express'

module.exports = function setup (app: $Application) {
  app.get('/admin', (req: $Request, res: $Response) => {
    res.send(JSON.stringify(req.user || null))
  })

  // catchall
  app.get('/*', (req: $Request, res: $Response) => { // eslint-disable-line no-unused-vars
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'))
  })
}
