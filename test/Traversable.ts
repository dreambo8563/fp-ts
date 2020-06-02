import * as assert from 'assert'
import * as A from '../src/Array'
import * as O from '../src/Option'
import * as _ from '../src/Traversable'
import { pipe } from '../src/function'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Traversable', () => {
  it('traverseComposition', () => {
    // TODO
    const traverse: any = _.traverseComposition(A.traversableArray as any, O.traversableOption as any)
    assert.deepStrictEqual(
      pipe(
        [O.some(1), O.some(2)],
        traverse(O.applicativeOption)((n: number) => (n <= 2 ? O.some(n * 2) : O.none))
      ),
      O.some([O.some(2), O.some(4)])
    )
    assert.deepStrictEqual(
      pipe(
        [O.some(1), O.some(3)],
        traverse(O.applicativeOption)((n: number) => (n <= 2 ? O.some(n * 2) : O.none))
      ),
      O.none
    )
  })

  it('sequenceComposition', () => {
    // TODO
    const sequence: any = _.sequenceComposition(A.traversableArray as any, O.traversableOption as any)
    assert.deepStrictEqual(
      sequence(O.applicativeOption)([O.some(O.some(1)), O.some(O.some(2))]),
      O.some([O.some(1), O.some(2)])
    )
    assert.deepStrictEqual(sequence(O.applicativeOption)([O.some(O.some(1)), O.none]), O.some([O.some(1), O.none]))
    assert.deepStrictEqual(sequence(O.applicativeOption)([O.some(O.some(1)), O.some(O.none)]), O.none)
  })
})
