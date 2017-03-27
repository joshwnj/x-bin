//@flow

// ----
// Functions for interfacing Docs with Redis

import type {
  Doc,
  ObjWithId
} from './docs'

function createDoc (): Doc {
  return {
    id: '',
    body: '',
    authorEmail: ''
  }
}

// Create a redis key for a doc
function redisKey (doc: ObjWithId): string {
  return `doc:${doc.id}`
}

// When we fetch a Doc from redis we get a list of values
// that need to be stitched back into an object.
function hmgetToDoc (keys: Array<string>, values: Array<any>): Doc {
  const obj = createDoc()
  keys.forEach((key, i) => obj[key] = values[i])
  return obj
}

// To store a Doc in redis we need to break it down
// into a list of keys and values.
function docToHmset (doc: Doc): Array<any> {
  const list = []
  Object.keys(doc).forEach((key) => {
    list.push(key)
    list.push(doc[key])
  })
  return list
}

export function create (doc: Doc, redisClient: any, cb: (err: ?Error) => any) {
  redisClient.hmset(redisKey(doc), docToHmset(doc), cb)
}

export function findById (id: string, redisClient: any, cb: (err: ?Error, doc: ?Doc) => any) {
  const docKeys = [ 'id', 'body', 'authorEmail' ]
  redisClient.hmget(redisKey({ id }), docKeys, (err: ?Error, values: ?Array<any>) => {
    if (err) { return cb(err) }
    if (!values || !values[0]) { return cb(null, null) }

    return cb(null, hmgetToDoc(docKeys, values))
  })
}

export default {
  create,
  findById
}
