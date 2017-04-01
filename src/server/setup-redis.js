//@flow

import redis from 'redis'

export type RedisClient = {
  on: Function
}

export default function (): RedisClient {
  const port = process.env.REDIS_PORT_6379_TCP_PORT
  const host = process.env.REDIS_PORT_6379_TCP_ADDR

  const client: RedisClient = redis.createClient(port, host)

  client.on('error', (err: Error) => console.error('[redis] error', err))

  return client
}
