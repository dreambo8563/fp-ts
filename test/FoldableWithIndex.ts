import * as assert from 'assert'
import * as _ from '../src/FoldableWithIndex'
import { pipe } from '../src/function'
import { Kind, URIS } from '../src/HKT'
import { Monoid, monoidString } from '../src/Monoid'
import * as RA from '../src/ReadonlyArray'

describe('FoldableWithIndex', () => {
  it('reduceWithIndexComposition', () => {
    const reduceWithIndexComposition: <F extends URIS, FI, G extends URIS, GI>(
      F: _.FoldableWithIndex1<F, FI>,
      G: _.FoldableWithIndex1<G, GI>
    ) => <A, B>(
      b: B,
      f: (i: readonly [FI, GI], b: B, a: A) => B
    ) => (fga: Kind<F, Kind<G, A>>) => B = _.reduceWithIndexComposition as any

    const reduceWithIndex = reduceWithIndexComposition(
      RA.foldableWithIndexReadonlyArray,
      RA.foldableWithIndexReadonlyArray
    )
    const fa: ReadonlyArray<ReadonlyArray<string>> = [
      ['a', 'b'],
      ['c', 'd']
    ]
    assert.deepStrictEqual(
      pipe(
        fa,
        reduceWithIndex('', ([i, j], b: string, a: string) => b + a + i + j)
      ),
      'a00b01c10d11'
    )
  })

  it('foldMapWithIndexComposition', () => {
    const foldMapWithIndexComposition: <F extends URIS, FI, G extends URIS, GI>(
      F: _.FoldableWithIndex1<F, FI>,
      G: _.FoldableWithIndex1<G, GI>
    ) => <M>(
      M: Monoid<M>
    ) => <A>(
      f: (i: readonly [FI, GI], a: A) => M
    ) => (fga: Kind<F, Kind<G, A>>) => M = _.foldMapWithIndexComposition as any

    const foldMapWithIndex = foldMapWithIndexComposition(
      RA.foldableWithIndexReadonlyArray,
      RA.foldableWithIndexReadonlyArray
    )
    const fa: ReadonlyArray<ReadonlyArray<string>> = [
      ['a', 'b'],
      ['c', 'd']
    ]
    assert.deepStrictEqual(
      pipe(
        fa,
        foldMapWithIndex(monoidString)(([i, j], a) => a + i + j)
      ),
      'a00b01c10d11'
    )
  })

  it('reduceRightWithIndexComposition', () => {
    const reduceRightWithIndexComposition: <F extends URIS, FI, G extends URIS, GI>(
      F: _.FoldableWithIndex1<F, FI>,
      G: _.FoldableWithIndex1<G, GI>
    ) => <A, B>(
      b: B,
      f: (i: readonly [FI, GI], a: A, b: B) => B
    ) => (fga: Kind<F, Kind<G, A>>) => B = _.reduceRigthWithIndexComposition as any

    const reduceRightWithIndex = reduceRightWithIndexComposition(
      RA.foldableWithIndexReadonlyArray,
      RA.foldableWithIndexReadonlyArray
    )
    const fa: ReadonlyArray<ReadonlyArray<string>> = [
      ['a', 'b'],
      ['c', 'd']
    ]
    assert.deepStrictEqual(
      pipe(
        fa,
        reduceRightWithIndex('', ([i, j], a: string, b: string) => b + a + i + j)
      ),
      'd11c10b01a00'
    )
  })
})
