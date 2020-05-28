import * as assert from 'assert'
import { getApplicativeComposition } from '../src/Applicative'
import { array } from '../src/Array'
import { none, option, some } from '../src/Option'
import { pipe } from '../src/function'

describe('Applicative', () => {
  it('getApplicativeComposition', () => {
    const arrayOption = getApplicativeComposition(array, option)
    const double = (n: number) => n * 2
    const inc = (n: number) => n + 1
    assert.deepStrictEqual(pipe([some(double), some(inc)], arrayOption.ap([some(1), some(2)])), [
      some(2),
      some(4),
      some(2),
      some(3)
    ])
    assert.deepStrictEqual(pipe([some(double), none], arrayOption.ap([some(1), some(2)])), [
      some(2),
      some(4),
      none,
      none
    ])
  })
})
