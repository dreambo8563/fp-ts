import * as assert from 'assert'
import * as A from '../src/Array'
import * as _ from '../src/FunctorWithIndex'
import { pipe } from '../src/function'

describe('FunctorWithIndex', () => {
  it('getFunctorComposition', () => {
    const F = _.getFunctorWithIndexComposition(A.functorWithIndexArray, A.functorWithIndexArray)
    const f = ([i, j]: readonly [number, number], a: string) => a + i + j
    assert.deepStrictEqual(
      pipe(
        [
          ['a', 'b'],
          ['c', 'd']
        ],
        F.mapWithIndex(f)
      ),
      [
        ['a00', 'b01'],
        ['c10', 'd11']
      ]
    )
  })
})
