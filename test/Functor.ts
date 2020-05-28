import * as assert from 'assert'
import { array } from '../src/Array'
import { getFunctorComposition } from '../src/Functor'
import * as option from '../src/Option'
import { pipe } from '../src/function'

describe('Functor', () => {
  it('getFunctorComposition', () => {
    const arrayOption = getFunctorComposition(array, option.option)
    const double = (a: number) => a * 2
    assert.deepStrictEqual(pipe([option.some(1)], arrayOption.map(double)), [option.some(2)])
  })
})
