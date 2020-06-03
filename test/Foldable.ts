import * as assert from 'assert'
import * as _ from '../src/Foldable'
import { monoidString } from '../src/Monoid'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable', () => {
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
