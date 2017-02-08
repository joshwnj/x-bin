//@flow

// options required for google auth
export type Opts = {
  clientID: string,
  clientSecret: string,
  callbackURL: string
}

// we get a Profile back from google on successful login
type ProfileName = {
  givenName: string,
  familyName: string
}

type ProfilePhoto = {
  value: string
}

type ProfileEmail = {
  value: string
}

type ProfileJson = {
  domain: string
}

export type Profile = {
  id: string,
  displayName: ?string,
  name: ProfileName,
  photos: Array<ProfilePhoto>,
  emails: Array<ProfileEmail>,
  __json: ?ProfileJson
}
