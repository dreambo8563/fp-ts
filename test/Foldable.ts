import * as assert from 'assert'
import { array } from '../src/Array'
import * as _ from '../src/Foldable'
import { monoidString } from '../src/Monoid'
import * as option from '../src/Option'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable', () => {
  it('getFoldableComposition', () => {
    const F = _.getFoldableComposition(array, option.option)
    // reduce
    assert.deepStrictEqual(
      F.reduce([option.some('a'), option.some('b'), option.some('c')], '', monoidString.concat),
      'abc'
    )
    assert.deepStrictEqual(F.reduce([option.none, option.some('b'), option.none], '', monoidString.concat), 'b')
    assert.deepStrictEqual(F.reduce([option.none, option.none, option.none], '', monoidString.concat), '')
    assert.deepStrictEqual(F.reduce([], '', monoidString.concat), '')
    // foldMap
    assert.deepStrictEqual(
      F.foldMap(monoidString)([option.some('a'), option.some('b'), option.some('c')], (a) => a),
      'abc'
    )
    assert.deepStrictEqual(
      F.foldMap(monoidString)([option.none, option.some('b'), option.none], (a) => a),
      'b'
    )
    assert.deepStrictEqual(
      F.foldMap(monoidString)([option.none, option.none, option.none], (a) => a),
      ''
    )
    assert.deepStrictEqual(
      F.foldMap(monoidString)([], (a: string) => a),
      ''
    )
    // reduceRight
    assert.deepStrictEqual(
      F.reduceRight([option.some('a'), option.some('b'), option.some('c')], '', monoidString.concat),
      'abc'
    )
    assert.deepStrictEqual(F.reduceRight([option.none, option.some('b'), option.none], '', monoidString.concat), 'b')
    assert.deepStrictEqual(F.reduceRight([option.none, option.none, option.none], '', monoidString.concat), '')
    assert.deepStrictEqual(F.reduceRight([], '', monoidString.concat), '')
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
