import tape from 'tape'
import docsRedis from '../src/rules/docs-redis'
import createRedisClient from '../src/server/setup-redis'

const redisClient = createRedisClient()

tape('Redis integration', (t) => {
  t.test('Fetching a non-existing doc', (t) => {
    t.plan(2)
    docsRedis.findById('someId', redisClient, (err: ?Error, doc: ?Doc) => {
      t.equal(err, null, `Fetching a non-existing doc doesn't cause an error`)
      t.equal(doc, null, `It returns an empty doc`)
    })
  })
})

tape.onFinish(() => {
  redisClient.quit()
})
