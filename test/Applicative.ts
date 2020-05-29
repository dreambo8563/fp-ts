import * as assert from 'assert'
import { getApplicativeComposition } from '../src/Applicative'
import { array } from '../src/Array'
import * as O from '../src/Option'
import { pipe } from '../src/function'

describe('Applicative', () => {
  it('getApplicativeComposition', () => {
    const arrayOption = getApplicativeComposition(array, O.applicativeOption)
    const double = (n: number) => n * 2
    const inc = (n: number) => n + 1
    assert.deepStrictEqual(pipe([O.some(double), O.some(inc)], arrayOption.ap([O.some(1), O.some(2)])), [
      O.some(2),
      O.some(4),
      O.some(2),
      O.some(3)
    ])
    assert.deepStrictEqual(pipe([O.some(double), O.none], arrayOption.ap([O.some(1), O.some(2)])), [
      O.some(2),
      O.some(4),
      O.none,
      O.none
    ])
  })
})
