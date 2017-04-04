//@flow

export type Author = {
  email: string,
  name: string,
  photo: string
}

// Object (which could be an Author) that contains
// just enough info to identify.
export type ObjWithEmail = {
  email: string
}
