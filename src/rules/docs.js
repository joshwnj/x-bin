//@flow

import marked from 'marked'

export type Doc = {
  id: string,
  body: string,
  authorEmail: string
}

export type DocTheme = {
  tpl: Function
}

// Object (which could be a Doc) that contains
// just enough info to identify a Doc.
export type ObjWithId = {
  id: string
}

// render a doc as markdown
export function renderDoc (doc: Doc, theme: ?DocTheme): string {
  const content = marked(doc.body)

  // theme is optional, so if there's no theme just return rendered markdown
  if (!theme) { return content }

  return theme.tpl(content)
}
