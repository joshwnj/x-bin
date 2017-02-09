import tape from 'tape'
import {
  normalize
} from './env'

tape('Env rules', (t) => {
  t.test('normalize', (t) => {
    const empty = normalize({})

    t.deepEqual(
      normalize({
        a: 1,
        b: '2',
        SERVER_PORT: '1234'
      }),
      Object.assign(
        {},
        empty,
        {
          a: 1,
          b: '2',
          SERVER_PORT: 1234
        }
      ),
      'Types are preserved, SERVER_PORT is converted to a number'
    )

    t.end()
  })
})
