import * as assert from 'assert'
import { array } from '../src/Array'
import { getFunctorComposition } from '../src/Functor'
import * as O from '../src/Option'
import { pipe } from '../src/function'

describe('Functor', () => {
  it('getFunctorComposition', () => {
    const arrayOption = getFunctorComposition(array, O.functorOption)
    const double = (a: number) => a * 2
    assert.deepStrictEqual(pipe([O.some(1)], arrayOption.map(double)), [O.some(2)])
  })
})
