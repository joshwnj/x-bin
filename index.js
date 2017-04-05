const env = process.env.NODE_ENV
if (env === 'production') {
  require('./babeled/server')
}
else {
  require('babel-register')
  require('./src/server')
}
