const redis = require('redis')

module.exports = function () {
  const client = redis.createClient()

  client.on('error', (err) => console.error('[redis] error', err))

  return client
}
