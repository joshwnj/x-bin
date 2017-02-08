export type Env = {
  // the port that the app http server runs on
  SERVER_PORT: number,

  // used by express, for obscuring session info
  SESSION_SECRET: string,

  // google auth config
  GOOGLE_CLIENT_ID: string,
  GOOGLE_CLIENT_SECRET: string,
  GOOGLE_CALLBACK_URL: string,
  GOOGLE_AUTH_WHITELIST: string
}

export function normalize (raw: Object):Env {
  const env = Object.assign({}, raw, {
    SERVER_PORT: parseInt(raw.SERVER_PORT, 10)
  })

  return env
}
