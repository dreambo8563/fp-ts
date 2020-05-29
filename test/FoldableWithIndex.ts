import * as assert from 'assert'
import { readonlyArray } from '../src/ReadonlyArray'
import * as _ from '../src/FoldableWithIndex'
import { monoidString } from '../src/Monoid'
import { pipe } from '../src/function'

describe('FoldableWithIndex', () => {
  it('getFoldableWithIndexComposition', () => {
    const F = _.getFoldableWithIndexComposition(readonlyArray, readonlyArray)
    const fa: ReadonlyArray<ReadonlyArray<string>> = [
      ['a', 'b'],
      ['c', 'd']
    ]

    assert.deepStrictEqual(
      pipe(
        fa,
        F.reduceWithIndex('', ([i, j], b: string, a: string) => b + a + i + j)
      ),
      'a00b01c10d11'
    )

    assert.deepStrictEqual(
      pipe(
        fa,
        F.foldMapWithIndex(monoidString)(([i, j], a) => a + i + j)
      ),
      'a00b01c10d11'
    )

    assert.deepStrictEqual(
      pipe(
        fa,
        F.reduceRightWithIndex('', ([i, j], a: string, b: string) => b + a + i + j)
      ),
      'd11c10b01a00'
    )
  })
})
