import * as assert from 'assert'
import * as RA from '../src/ReadonlyArray'
import { boundedNumber } from '../src/Bounded'
import * as _ from '../src/Monoid'
import { pipe } from '../src/function'

describe('Monoid', () => {
  it('getTupleMonoid', () => {
    const M1 = _.getTupleMonoid(_.monoidString, _.monoidSum)
    assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
    const M2 = _.getTupleMonoid(_.monoidString, _.monoidSum, _.monoidAll)
    assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
  })

  it('fold', () => {
    assert.deepStrictEqual(_.fold(_.monoidSum)([1, 2, 3]), 6)
  })

  it('getFunctionMonoid', () => {
    const getPredicateMonoidAll = _.getFunctionMonoid(_.monoidAll)
    const getPredicateMonoidAny = _.getFunctionMonoid(_.monoidAny)

    const isLessThan10 = (n: number) => n <= 10
    const isEven = (n: number) => n % 2 === 0

    assert.deepStrictEqual(
      pipe([1, 2, 3, 40], RA.filter(_.fold(getPredicateMonoidAll<number>())([isLessThan10, isEven]))),
      [2]
    )
    assert.deepStrictEqual(
      pipe([1, 2, 3, 40, 41], RA.filter(_.fold(getPredicateMonoidAny<number>())([isLessThan10, isEven]))),
      [1, 2, 3, 40]
    )
  })

  it('getEndomorphismMonoid', () => {
    const M = _.getEndomorphismMonoid<number>()
    const double = (n: number) => n * 2
    const inc = (n: number) => n + 1
    const f = M.concat(double, inc)
    assert.deepStrictEqual(f(3), 8)
  })

  it('getMeetMonoid', () => {
    const M = _.getMeetMonoid(boundedNumber)
    assert.deepStrictEqual(_.fold(M)([]), +Infinity)
    assert.deepStrictEqual(_.fold(M)([1]), 1)
    assert.deepStrictEqual(_.fold(M)([1, -1]), -1)
  })

  it('getJoinMonoid', () => {
    const M = _.getJoinMonoid(boundedNumber)
    assert.deepStrictEqual(_.fold(M)([]), -Infinity)
    assert.deepStrictEqual(_.fold(M)([1]), 1)
    assert.deepStrictEqual(_.fold(M)([1, -1]), 1)
  })

  it('getDualMonoid', () => {
    const M = _.getDualMonoid(_.monoidString)
    assert.deepStrictEqual(M.concat('a', 'b'), 'ba')
    assert.deepStrictEqual(M.concat('a', M.empty), 'a')
    assert.deepStrictEqual(M.concat(M.empty, 'a'), 'a')
  })
})
