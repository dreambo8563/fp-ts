import * as assert from 'assert'
import * as _ from '../src/Foldable'
import { identity, pipe } from '../src/function'
import { Kind, URIS } from '../src/HKT'
import { Monoid, monoidString } from '../src/Monoid'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable', () => {
  it('reduceComposition', () => {
    const reduceComposition: <F extends URIS, G extends URIS>(
      F: _.Foldable1<F>,
      G: _.Foldable1<G>
    ) => <A, B>(b: B, f: (b: B, a: A) => B) => (fga: Kind<F, Kind<G, A>>) => B = _.reduceComposition as any

    const reduce = reduceComposition(RA.foldableReadonlyArray, O.foldableOption)
    assert.deepStrictEqual(pipe([O.some('a'), O.some('b'), O.some('c')], reduce('', monoidString.concat)), 'abc')
    assert.deepStrictEqual(pipe([O.none, O.some('b'), O.none], reduce('', monoidString.concat)), 'b')
    assert.deepStrictEqual(pipe([O.none, O.none, O.none], reduce('', monoidString.concat)), '')
    assert.deepStrictEqual(pipe([], reduce('', monoidString.concat)), '')
  })

  it('foldMapComposition', () => {
    const foldMapComposition: <F extends URIS, G extends URIS>(
      F: _.Foldable1<F>,
      G: _.Foldable1<G>
    ) => <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fga: Kind<F, Kind<G, A>>) => M = _.foldMapComposition as any

    const foldMap = foldMapComposition(RA.foldableReadonlyArray, O.foldableOption)
    assert.deepStrictEqual(pipe([O.some('a'), O.some('b'), O.some('c')], foldMap(monoidString)(identity)), 'abc')
    assert.deepStrictEqual(pipe([O.none, O.some('b'), O.none], foldMap(monoidString)(identity)), 'b')
    assert.deepStrictEqual(pipe([O.none, O.none, O.none], foldMap(monoidString)(identity)), '')
    assert.deepStrictEqual(
      pipe(
        [],
        foldMap(monoidString)((s: string) => s)
      ),
      ''
    )
  })

  it('reduceRightComposition', () => {
    const reduceRightComposition: <F extends URIS, G extends URIS>(
      F: _.Foldable1<F>,
      G: _.Foldable1<G>
    ) => <A, B>(b: B, f: (a: A, b: B) => B) => (fga: Kind<F, Kind<G, A>>) => B = _.reduceRightComposition as any

    const reduceRight = reduceRightComposition(RA.foldableReadonlyArray, O.foldableOption)
    assert.deepStrictEqual(pipe([O.some('a'), O.some('b'), O.some('c')], reduceRight('', monoidString.concat)), 'abc')
    assert.deepStrictEqual(pipe([O.none, O.some('b'), O.none], reduceRight('', monoidString.concat)), 'b')
    assert.deepStrictEqual(pipe([O.none, O.none, O.none], reduceRight('', monoidString.concat)), '')
    assert.deepStrictEqual(pipe([], reduceRight('', monoidString.concat)), '')
  })

  it('intercalate', () => {
    assert.deepStrictEqual(_.intercalate(monoidString, RA.foldableReadonlyArray)(',', ['a', 'b', 'c']), 'a,b,c')
  })

  it('reduceM', () => {
    assert.deepStrictEqual(
      _.reduceM(O.monadOption, RA.foldableReadonlyArray)([], 1, () => O.none),
      O.some(1)
    )
    assert.deepStrictEqual(
      _.reduceM(O.monadOption, RA.foldableReadonlyArray)([2], 1, () => O.none),
      O.none
    )
    assert.deepStrictEqual(
      _.reduceM(O.monadOption, RA.foldableReadonlyArray)([2], 1, (b, a) => O.some(b + a)),
      O.some(3)
    )
  })
})
