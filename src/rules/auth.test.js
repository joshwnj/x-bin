import tape from 'tape'
import {
  normalizeWhitelist,
  isEmailInWhitelist
} from './auth'

tape('Auth rules', (t) => {
  t.test('normalizeWhitelist', (t) => {
    t.deepEqual(
      normalizeWhitelist(''),
      [],
      'Handles an empty whitelist'
    )

    t.deepEqual(
      normalizeWhitelist('a@a.com'),
      ['a@a.com'],
      'Handles a whitelist of 1 item'
    )

    t.end()
  })

  t.test('Auth rules: isEmailInWhitelist', (t) => {
    t.equal(
      isEmailInWhitelist(['a@a.com', 'b@b.com'], 'a@a.com'),
      true,
      'Positive case'
    )

    t.equal(
      isEmailInWhitelist(['a@a.com', 'b@b.com'], 'c@c.com'),
      false,
      'Negative case'
    )

    t.end()
  })
})
