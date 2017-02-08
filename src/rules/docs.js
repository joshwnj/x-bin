export type Doc = {
  id: string,
  body: string,
  authorEmail: string
}

// When we fetch a Doc from redis we get a list of values
// that need to be stitched back into an object.
export function hmgetToDoc (keys: Array<string>, values: Array<any>): Doc {
  const obj = {}
  keys.forEach((key, i) => obj[key] = values[i])
  return obj
}

// To store a Doc in redis we need to break it down
// into a list of keys and values.
export function docToHmset (doc: Doc): Array<any> {
  const list = []
  Object.keys(doc).forEach((key) => {
    list.push(key)
    list.push(doc[key])
  })
  return list
}
