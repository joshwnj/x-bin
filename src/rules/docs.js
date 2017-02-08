//@flow

import marked from 'marked'

export type Doc = {
  id: string,
  body: string,
  authorEmail: string
}

// Object (which could be a Doc) that contains
// just enough info to identify a Doc.
export type ObjWithId = {
  id: string
}

// render a doc as markdown
export function renderDoc (doc: Doc): string {
  return marked(doc.body)
}
