import * as assert from 'assert'
import * as _ from '../src/Date'

describe('Date', () => {
  it('create', () => {
    const d1 = _.create()
    const m2 = new Date().getTime()
    assert.deepStrictEqual(d1 instanceof Date, true)
    assert.deepStrictEqual(d1.getTime(), m2)
  })

  it('now', () => {
    const m1 = _.now()
    const m2 = new Date().getTime()
    assert.deepStrictEqual(m1, m2)
  })

  it('eqDate', () => {
    assert.deepStrictEqual(_.eqDate.equals(new Date(0), new Date(0)), true)
    assert.deepStrictEqual(_.eqDate.equals(new Date(0), new Date(1)), false)
    assert.deepStrictEqual(_.eqDate.equals(new Date(1), new Date(0)), false)
  })

  it('eqGetDate', () => {
    assert.deepStrictEqual(_.eqGetDate.equals(new Date(2000, 10, 1), new Date(2000, 11, 1)), true)
    assert.deepStrictEqual(_.eqGetDate.equals(new Date(2000, 10, 1), new Date(2000, 11, 2)), false)
  })

  it('eqGetMonth', () => {
    assert.deepStrictEqual(_.eqGetMonth.equals(new Date(2000, 10, 1), new Date(2000, 10, 7)), true)
    assert.deepStrictEqual(_.eqGetMonth.equals(new Date(2000, 10, 1), new Date(2000, 11, 7)), false)
  })

  it('eqGetFullYear', () => {
    assert.deepStrictEqual(_.eqGetFullYear.equals(new Date(2000, 10, 1), new Date(2000, 11, 7)), true)
    assert.deepStrictEqual(_.eqGetFullYear.equals(new Date(2000, 10, 1), new Date(2001, 11, 7)), false)
  })

  it('ordDate', () => {
    assert.deepStrictEqual(_.ordDate.compare(new Date(0), new Date(0)), 0)
    assert.deepStrictEqual(_.ordDate.compare(new Date(0), new Date(1)), -1)
    assert.deepStrictEqual(_.ordDate.compare(new Date(1), new Date(0)), 1)
  })
})
