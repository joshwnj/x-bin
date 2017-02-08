//@flow

export function normalizeWhitelist (whitelist: string): Array<string> {
  return whitelist.split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function isEmailInWhitelist (whitelist: Array<string>, email: string) {
  return whitelist.indexOf(email) > -1
}
