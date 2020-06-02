import * as assert from 'assert'
import * as RA from '../src/ReadonlyArray'
import { mapWithIndexComposition } from '../src/FunctorWithIndex'
import { pipe } from '../src/function'

describe('FunctorWithIndex', () => {
  it('mapWithIndexComposition', () => {
    const mapWithIndex = mapWithIndexComposition(RA.functorWithIndexReadonlyArray, RA.functorWithIndexReadonlyArray)
    const f = ([i, j]: readonly [number, number], a: string) => a + i + j
    assert.deepStrictEqual(
      pipe(
        [
          ['a', 'b'],
          ['c', 'd']
        ],
        mapWithIndex(f)
      ),
      [
        ['a00', 'b01'],
        ['c10', 'd11']
      ]
    )
  })
})
