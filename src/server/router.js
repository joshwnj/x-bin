//@flow

const path = require('path')

import type { $Request, $Response, Router } from 'express'

module.exports = function (app: Router) {
  // catchall
  app.get('/*', (req: $Request, res: $Response) => { // eslint-disable-line no-unused-vars
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'))
  })
}
