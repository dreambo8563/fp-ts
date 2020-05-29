import * as assert from 'assert'
import { array } from '../src/Array'
import { getFunctorWithIndexComposition } from '../src/FunctorWithIndex'
import { pipe } from '../src/function'

describe('FunctorWithIndex', () => {
  it('getFunctorComposition', () => {
    const F = getFunctorWithIndexComposition(array, array)
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
