//@flow

import redis from 'redis'

export type RedisClient = {
  on: Function
}

export default function (): RedisClient {
  const client: RedisClient = redis.createClient()

  client.on('error', (err: Error) => console.error('[redis] error', err))

  return client
}
