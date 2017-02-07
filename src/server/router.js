const path = require('path')

module.exports = function (app) {
  // catchall
  app.get('/*', (req, res) => { // eslint-disable-line no-unused-vars
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'))
  })
}
