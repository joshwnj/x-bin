//@flow

// ----
// Functions for interfacing Authors with Redis

import type {
  Author,
  ObjWithEmail
} from './authors'

const authorKeys = [
  'name',
  'photo'
]

function createAuthor (): Author {
  return {
    email: '',
    name: '',
    photo: ''
  }
}

// Create a redis key for an author
function redisKey (author: ObjWithEmail): string {
  return `authorByEmail:${author.email}`
}

// When we fetch an Email from redis we get a list of values
// that need to be stitched back into an object.
function fromHmget (keys: Array<string>, values: Array<any>): Author {
  const obj = createAuthor()
  keys.forEach((key, i) => obj[key] = values[i])
  return obj
}

// To store an Author in redis we need to break it down
// into a list of keys and values.
function toHmset (author: Author): Array<any> {
  const list = []
  Object.keys(author).forEach((key) => {
    list.push(key)
    list.push(author[key])
  })
  return list
}

export function create (author: Author, redisClient: any, cb: (err: ?Error) => any) {
  redisClient.hmset(redisKey(author), toHmset(author), cb)
}

export function findByEmail (email: string, redisClient: any, cb: (err: ?Error, author: ?Author) => any) {
  redisClient.hmget(redisKey({ email }), authorKeys, (err: ?Error, values: ?Array<any>) => {
    if (err) { return cb(err) }
    if (!values || !values[0]) { return cb(null, null) }

    return cb(null, fromHmget(authorKeys, values))
  })
}

export default {
  create,
  findByEmail
}
