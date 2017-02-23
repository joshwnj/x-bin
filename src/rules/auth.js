//@flow

export function normalizeWhitelist (whitelist: string): Array<string> {
  return whitelist.split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function isEmailInWhitelist (whitelist: Array<string>, email: string) {
  return whitelist.some((item) => {
    // exact match
    if (item === email) { return true }

    // wildcard match
    const itemParts = item.split('@')
    const emailParts = email.split('@')

    return (itemParts[0] === '*' && itemParts[1] === emailParts[1])
  })
}
