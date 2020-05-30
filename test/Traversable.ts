import * as assert from 'assert'
import * as A from '../src/Array'
import * as O from '../src/Option'
import { getTraversableComposition } from '../src/Traversable'
import { pipe } from '../src/function'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Traversable', () => {
  it('getTraversableComposition', () => {
    const T = getTraversableComposition(A.traversableArray, O.traversableOption)
    assert.deepStrictEqual(
      pipe(
        [O.some(1), O.some(2)],
        T.traverse(O.applicativeOption)((n: number) => (n <= 2 ? O.some(n * 2) : O.none))
      ),
      O.some([O.some(2), O.some(4)])
    )
    assert.deepStrictEqual(
      pipe(
        [O.some(1), O.some(3)],
        T.traverse(O.applicativeOption)((n: number) => (n <= 2 ? O.some(n * 2) : O.none))
      ),
      O.none
    )
    assert.deepStrictEqual(
      T.sequence(O.applicativeOption)([O.some(O.some(1)), O.some(O.some(2))]),
      O.some([O.some(1), O.some(2)])
    )
    assert.deepStrictEqual(T.sequence(O.applicativeOption)([O.some(O.some(1)), O.none]), O.some([O.some(1), O.none]))
    assert.deepStrictEqual(T.sequence(O.applicativeOption)([O.some(O.some(1)), O.some(O.none)]), O.none)
  })
})
