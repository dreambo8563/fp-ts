import * as assert from 'assert'
import * as A from '../src/Array'
import * as _ from '../src/Functor'
import * as O from '../src/Option'
import { pipe } from '../src/function'

describe('Functor', () => {
  it('getFunctorComposition', () => {
    const arrayOption = _.getFunctorComposition(A.functorArray, O.functorOption)
    const double = (a: number) => a * 2
    assert.deepStrictEqual(pipe([O.some(1)], arrayOption.map(double)), [O.some(2)])
  })
})
