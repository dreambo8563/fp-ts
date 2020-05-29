import * as assert from 'assert'
import { array } from '../src/Array'
import * as _ from '../src/Foldable'
import { monoidString } from '../src/Monoid'
import * as option from '../src/Option'
import { pipe, identity } from '../src/function'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable', () => {
  it('getFoldableComposition', () => {
    const F = _.getFoldableComposition(array, option.option)
    // reduce
    assert.deepStrictEqual(
      pipe([option.some('a'), option.some('b'), option.some('c')], F.reduce('', monoidString.concat)),
      'abc'
    )
    assert.deepStrictEqual(pipe([option.none, option.some('b'), option.none], F.reduce('', monoidString.concat)), 'b')
    assert.deepStrictEqual(pipe([option.none, option.none, option.none], F.reduce('', monoidString.concat)), '')
    assert.deepStrictEqual(pipe([], F.reduce('', monoidString.concat)), '')
    // foldMap
    assert.deepStrictEqual(
      pipe([option.some('a'), option.some('b'), option.some('c')], F.foldMap(monoidString)(identity)),
      'abc'
    )
    assert.deepStrictEqual(pipe([option.none, option.some('b'), option.none], F.foldMap(monoidString)(identity)), 'b')
    assert.deepStrictEqual(pipe([option.none, option.none, option.none], F.foldMap(monoidString)(identity)), '')
    assert.deepStrictEqual(
      pipe(
        [],
        F.foldMap(monoidString)((s: string) => s)
      ),
      ''
    )
    // reduceRight
    assert.deepStrictEqual(
      pipe([option.some('a'), option.some('b'), option.some('c')], F.reduceRight('', monoidString.concat)),
      'abc'
    )
    assert.deepStrictEqual(
      pipe([option.none, option.some('b'), option.none], F.reduceRight('', monoidString.concat)),
      'b'
    )
    assert.deepStrictEqual(pipe([option.none, option.none, option.none], F.reduceRight('', monoidString.concat)), '')
    assert.deepStrictEqual(pipe([], F.reduceRight('', monoidString.concat)), '')
  })

  it('intercalate', () => {
    assert.deepStrictEqual(_.intercalate(monoidString, array)(',', ['a', 'b', 'c']), 'a,b,c')
  })

  it('foldM', () => {
    assert.deepStrictEqual(
      _.foldM(option.option, array)([], 1, () => option.none),
      option.some(1)
    )
    assert.deepStrictEqual(
      _.foldM(option.option, array)([2], 1, () => option.none),
      option.none
    )
    assert.deepStrictEqual(
      _.foldM(option.option, array)([2], 1, (b, a) => option.some(b + a)),
      option.some(3)
    )
  })
})
