//@flow

import redis from 'redis'

export default function (): any {
  const client: any = redis.createClient()

  client.on('error', (err: Error) => console.error('[redis] error', err))

  return client
}
