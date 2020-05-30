import * as assert from 'assert'
import * as A from '../src/Array'
import * as _ from '../src/Foldable'
import { monoidString } from '../src/Monoid'
import * as O from '../src/Option'
import { pipe, identity } from '../src/function'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable', () => {
  it('getFoldableComposition', () => {
    const F = _.getFoldableComposition(A.foldableArray, O.foldableOption)
    // reduce
    assert.deepStrictEqual(pipe([O.some('a'), O.some('b'), O.some('c')], F.reduce('', monoidString.concat)), 'abc')
    assert.deepStrictEqual(pipe([O.none, O.some('b'), O.none], F.reduce('', monoidString.concat)), 'b')
    assert.deepStrictEqual(pipe([O.none, O.none, O.none], F.reduce('', monoidString.concat)), '')
    assert.deepStrictEqual(pipe([], F.reduce('', monoidString.concat)), '')
    // foldMap
    assert.deepStrictEqual(pipe([O.some('a'), O.some('b'), O.some('c')], F.foldMap(monoidString)(identity)), 'abc')
    assert.deepStrictEqual(pipe([O.none, O.some('b'), O.none], F.foldMap(monoidString)(identity)), 'b')
    assert.deepStrictEqual(pipe([O.none, O.none, O.none], F.foldMap(monoidString)(identity)), '')
    assert.deepStrictEqual(
      pipe(
        [],
        F.foldMap(monoidString)((s: string) => s)
      ),
      ''
    )
    // reduceRight
    assert.deepStrictEqual(pipe([O.some('a'), O.some('b'), O.some('c')], F.reduceRight('', monoidString.concat)), 'abc')
    assert.deepStrictEqual(pipe([O.none, O.some('b'), O.none], F.reduceRight('', monoidString.concat)), 'b')
    assert.deepStrictEqual(pipe([O.none, O.none, O.none], F.reduceRight('', monoidString.concat)), '')
    assert.deepStrictEqual(pipe([], F.reduceRight('', monoidString.concat)), '')
  })

  it('intercalate', () => {
    assert.deepStrictEqual(_.intercalate(monoidString, A.foldableArray)(',', ['a', 'b', 'c']), 'a,b,c')
  })

  it('reduceM', () => {
    assert.deepStrictEqual(
      _.reduceM(O.monadOption, A.foldableArray)([], 1, () => O.none),
      O.some(1)
    )
    assert.deepStrictEqual(
      _.reduceM(O.monadOption, A.foldableArray)([2], 1, () => O.none),
      O.none
    )
    assert.deepStrictEqual(
      _.reduceM(O.monadOption, A.foldableArray)([2], 1, (b, a) => O.some(b + a)),
      O.some(3)
    )
  })
})
