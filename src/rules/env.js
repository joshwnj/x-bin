export type Env = {
  // the port that the app http server runs on
  SERVER_PORT: number,

  // used by express, for obscuring session info
  SESSION_SECRET: string
}
