//@flow

export type Env = {
  // the port that the app http server runs on
  SERVER_PORT: number,

  // used by express, for obscuring session info
  SESSION_SECRET: string,

  // google auth config
  GOOGLE_CLIENT_ID: string,
  GOOGLE_CLIENT_SECRET: string,
  GOOGLE_CALLBACK_URL: string,
  GOOGLE_AUTH_WHITELIST: string,

  // optional: directory of theme files for rendering docs
  DOC_THEME: ?string
}

// Create an empty Env struct that satisfies the base types.
function empty ():Env {
  return {
    SERVER_PORT: 0,

    SESSION_SECRET: '',

    GOOGLE_CLIENT_ID: '',
    GOOGLE_CLIENT_SECRET: '',
    GOOGLE_CALLBACK_URL: '',
    GOOGLE_AUTH_WHITELIST: '',

    DOC_THEME: ''
  }
}

// Create a populated Env struct,
// and convert fields to the correct type.
export function normalize (raw: {}):Env {
  const conversions = {}
  if (raw.SERVER_PORT) {
    conversions.SERVER_PORT = parseInt(raw.SERVER_PORT, 10)
  }

  return Object.assign(empty(), raw, conversions)
}
