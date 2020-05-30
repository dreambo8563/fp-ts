import * as assert from 'assert'
import { left, right } from '../src/Either'
import { eqNumber } from '../src/Eq'
import { identity, pipe } from '../src/function'
import * as I from '../src/Identity'
import { monoidString } from '../src/Monoid'
import * as O from '../src/Option'
import { readonlyArray, zip } from '../src/ReadonlyArray'
import * as _ from '../src/Record'
import { getFirstSemigroup, getLastSemigroup, semigroupSum } from '../src/Semigroup'
import { showString } from '../src/Show'

const p = (n: number) => n > 2

const noPrototype = Object.create(null)

describe('Record', () => {
  it('getMonoid', () => {
    const d1 = { k1: 1, k2: 3 }
    const d2 = { k2: 2, k3: 4 }
    const M = _.getMonoid(semigroupSum)
    assert.deepStrictEqual(M.concat(d1, d2), { k1: 1, k2: 5, k3: 4 })
    assert.deepStrictEqual(M.concat(d1, M.empty), d1)
    assert.deepStrictEqual(M.concat(M.empty, d2), d2)
    assert.deepStrictEqual(M.concat(d1, {}), d1)
  })

  it('map', () => {
    const d1 = { k1: 1, k2: 2 }
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(_.map(double)(d1), { k1: 2, k2: 4 })
  })

  it('reduce', () => {
    const d1 = { k1: 'a', k2: 'b' }
    assert.deepStrictEqual(
      pipe(
        d1,
        _.reduce('', (b, a) => b + a)
      ),
      'ab'
    )
    const d2 = { k2: 'b', k1: 'a' }
    assert.deepStrictEqual(
      pipe(
        d2,
        _.reduce('', (b, a) => b + a)
      ),
      'ab'
    )
  })

  it('foldMap', () => {
    assert.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.foldMap(monoidString)(identity)), 'ab')
  })

  it('reduceRight', () => {
    assert.deepStrictEqual(
      pipe(
        { a: 'a', b: 'b' },
        _.reduceRight('', (a, acc) => acc + a)
      ),
      'ba'
    )
  })

  it('traverse', () => {
    assert.deepStrictEqual(
      _.traverse(O.applicativeOption)((n: number) => (n <= 2 ? O.some(n) : O.none))({ k1: 1, k2: 2 }),
      O.some({ k1: 1, k2: 2 })
    )
    assert.deepStrictEqual(
      _.traverse(O.applicativeOption)((n: number) => (n >= 2 ? O.some(n) : O.none))({ k1: 1, k2: 2 }),
      O.none
    )
  })

  it('sequence', () => {
    const sequence = _.sequence(O.applicativeOption)
    const x1 = { k1: O.some(1), k2: O.some(2) }
    assert.deepStrictEqual(sequence(x1), O.some({ k1: 1, k2: 2 }))
    const x2 = { k1: O.none, k2: O.some(2) }
    assert.deepStrictEqual(sequence(x2), O.none)
  })

  it('getEq', () => {
    assert.deepStrictEqual(_.getEq(eqNumber).equals({ a: 1 }, { a: 1 }), true)
    assert.deepStrictEqual(_.getEq(eqNumber).equals({ a: 1 }, { a: 2 }), false)
    assert.deepStrictEqual(_.getEq(eqNumber).equals({ a: 1 }, { b: 1 }), false)
    assert.deepStrictEqual(_.getEq(eqNumber).equals(noPrototype, { b: 1 }), false)
  })

  it('lookup', () => {
    assert.deepStrictEqual(_.lookup('a', { a: 1 }), O.some(1))
    assert.deepStrictEqual(_.lookup('b', { a: 1 }), O.none)
    assert.deepStrictEqual(_.lookup('b', noPrototype), O.none)
  })

  it('fromFoldable', () => {
    const First = getFirstSemigroup<number>()
    assert.deepStrictEqual(_.fromFoldable(First, readonlyArray)([['a', 1]]), { a: 1 })
    assert.deepStrictEqual(
      _.fromFoldable(
        First,
        readonlyArray
      )([
        ['a', 1],
        ['a', 2]
      ]),
      {
        a: 1
      }
    )
    const Last = getLastSemigroup<number>()
    assert.deepStrictEqual(
      _.fromFoldable(
        Last,
        readonlyArray
      )([
        ['a', 1],
        ['a', 2]
      ]),
      {
        a: 2
      }
    )
  })

  it('toArray', () => {
    assert.deepStrictEqual(_.toArray({ a: 1, b: 2 }), [
      ['a', 1],
      ['b', 2]
    ])
    assert.deepStrictEqual(_.toArray({ b: 2, a: 1 }), [
      ['a', 1],
      ['b', 2]
    ])
  })

  it('toUnfoldable', () => {
    assert.deepStrictEqual(_.toUnfoldable(readonlyArray)({ a: 1 }), [['a', 1]])
  })

  it('traverseWithIndex', () => {
    const d1 = { k1: 1, k2: 2 }
    const t1 = _.traverseWithIndex(O.applicativeOption)(
      (k, n: number): O.Option<number> => (k !== 'k1' ? O.some(n) : O.none)
    )(d1)
    assert.deepStrictEqual(t1, O.none)
    const t2 = _.traverseWithIndex(O.applicativeOption)((): O.Option<number> => O.none)(_.empty)
    assert.deepStrictEqual(O.getOrElse((): Record<string, number> => _.empty)(t2), _.empty)
  })

  it('size', () => {
    assert.deepStrictEqual(_.size({}), 0)
    assert.deepStrictEqual(_.size({ a: 1 }), 1)
  })

  it('isEmpty', () => {
    assert.deepStrictEqual(_.isEmpty({}), true)
    assert.deepStrictEqual(_.isEmpty({ a: 1 }), false)
  })

  it('insertAt', () => {
    assert.deepStrictEqual(_.insertAt('a', 1)({}), { a: 1 })
    assert.deepStrictEqual(_.insertAt('c', 3)({ a: 1, b: 2 }), { a: 1, b: 2, c: 3 })
    // should return the same reference if the value is already there
    const x = { a: 1 }
    assert.deepStrictEqual(_.insertAt('a', 1)(x), x)
  })

  it('deleteAt', () => {
    assert.deepStrictEqual(_.deleteAt('a')({ a: 1, b: 2 }), { b: 2 })
    // should return the same reference if the key is missing
    const x = { a: 1 }
    assert.deepStrictEqual(_.deleteAt('b')(x), x)
    assert.deepStrictEqual(_.deleteAt('b')(noPrototype), noPrototype)
  })

  it('pop', () => {
    assert.deepStrictEqual(_.pop('a')({ a: 1, b: 2 }), O.some([1, { b: 2 }]))
    assert.deepStrictEqual(_.pop('c')({ a: 1, b: 2 }), O.none)
  })

  it('compact', () => {
    assert.deepStrictEqual(_.record.compact({ foo: O.none, bar: O.some(123) }), { bar: 123 })
  })

  it('separate', () => {
    assert.deepStrictEqual(_.record.separate({ foo: left(123), bar: right(123) }), {
      left: { foo: 123 },
      right: { bar: 123 }
    })
  })

  it('filter', () => {
    const d = { a: 1, b: 3 }
    assert.deepStrictEqual(pipe(d, _.filter(p)), { b: 3 })

    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const y: Record<string, string | number> = { a: 1, b: 'foo' }
    const actual = pipe(y, _.filter(isNumber))
    assert.deepStrictEqual(actual, { a: 1 })

    assert.deepStrictEqual(
      pipe(
        y,
        _.filter((_) => true)
      ),
      y
    )

    const x = Object.assign(Object.create({ c: true }), { a: 1, b: 'foo' })
    assert.deepStrictEqual(pipe(x, _.filter(isNumber)), { a: 1 })

    assert.deepStrictEqual(pipe(noPrototype, _.filter(isNumber)), noPrototype)
  })

  it('filterMap', () => {
    const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
    assert.deepStrictEqual(pipe({}, _.filterMap(f)), {})
    assert.deepStrictEqual(pipe({ a: 1, b: 3 }, _.filterMap(f)), { b: 4 })
  })

  it('partition', () => {
    assert.deepStrictEqual(pipe({}, _.partition(p)), { left: {}, right: {} })
    assert.deepStrictEqual(pipe({ a: 1, b: 3 }, _.partition(p)), {
      left: { a: 1 },
      right: { b: 3 }
    })
  })

  it('partitionMap', () => {
    const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
    assert.deepStrictEqual(pipe({}, _.partitionMap(f)), { left: {}, right: {} })
    assert.deepStrictEqual(pipe({ a: 1, b: 3 }, _.partitionMap(f)), {
      left: { a: 0 },
      right: { b: 4 }
    })
  })

  it('wither', () => {
    const f = (n: number) => I.identity.of(p(n) ? O.some(n + 1) : O.none)
    assert.deepStrictEqual(pipe({}, _.record.wither(I.identity)(f)), I.identity.of<Record<string, number>>({}))
    assert.deepStrictEqual(pipe({ a: 1, b: 3 }, _.record.wither(I.identity)(f)), I.identity.of({ b: 4 }))
  })

  it('wilt', () => {
    const f = (n: number) => I.identity.of(p(n) ? right(n + 1) : left(n - 1))
    assert.deepStrictEqual(pipe({}, _.record.wilt(I.identity)(f)), I.identity.of({ left: {}, right: {} }))
    assert.deepStrictEqual(
      pipe({ a: 1, b: 3 }, _.record.wilt(I.identity)(f)),
      I.identity.of({ left: { a: 0 }, right: { b: 4 } })
    )
  })

  it('reduceWithIndex', () => {
    const d1 = { k1: 'a', k2: 'b' }
    assert.deepStrictEqual(_.reduceWithIndex('', (k, b, a) => b + k + a)(d1), 'k1ak2b')
    const d2 = { k2: 'b', k1: 'a' }
    assert.deepStrictEqual(_.reduceWithIndex('', (k, b, a) => b + k + a)(d2), 'k1ak2b')
  })

  it('foldMapWithIndex', () => {
    const x1 = { k1: 'a', k2: 'b' }
    assert.deepStrictEqual(_.foldMapWithIndex(monoidString)((k, a) => k + a)(x1), 'k1ak2b')
  })

  it('reduceRightWithIndex', () => {
    const x1 = { k1: 'a', k2: 'b' }
    assert.deepStrictEqual(_.reduceRightWithIndex('', (k, a, b) => b + k + a)(x1), 'k2bk1a')
  })

  it('every', () => {
    const x: Record<string, number> = { a: 1, b: 2 }
    const y: Record<string, number> = { a: 1, b: 2 }
    assert.deepStrictEqual(_.every((n: number) => n <= 2)(x), true)
    assert.deepStrictEqual(_.every((n: number) => n <= 1)(y), false)
  })

  it('some', () => {
    const x: Record<string, number> = { a: 1, b: 2 }
    const y: Record<string, number> = { a: 1, b: 2 }
    assert.deepStrictEqual(_.some((n: number) => n <= 1)(x), true)
    assert.deepStrictEqual(_.some((n: number) => n <= 0)(y), false)
  })

  it('elem', () => {
    assert.deepStrictEqual(_.elem(eqNumber)(1, { a: 1, b: 2 }), true)
    assert.deepStrictEqual(_.elem(eqNumber)(3, { a: 1, b: 2 }), false)
  })

  it('fromFoldableMap', () => {
    const zipObject = <K extends string, A>(keys: ReadonlyArray<K>, values: ReadonlyArray<A>): Record<K, A> =>
      _.fromFoldableMap(getLastSemigroup<A>(), readonlyArray)(zip(keys, values), ([k, a]) => [k, a])

    assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })

    interface User {
      readonly id: string
      readonly name: string
    }

    const users: ReadonlyArray<User> = [
      { id: 'id1', name: 'name1' },
      { id: 'id2', name: 'name2' },
      { id: 'id1', name: 'name3' }
    ]

    assert.deepStrictEqual(
      _.fromFoldableMap(getLastSemigroup<User>(), readonlyArray)(users, (user) => [user.id, user]),
      {
        id1: { id: 'id1', name: 'name3' },
        id2: { id: 'id2', name: 'name2' }
      }
    )
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    assert.deepStrictEqual(S.show({}), `{}`)
    assert.deepStrictEqual(S.show({ a: 'a' }), `{ "a": "a" }`)
    assert.deepStrictEqual(S.show({ a: 'a', b: 'b' }), `{ "a": "a", "b": "b" }`)
  })

  it('singleton', () => {
    assert.deepStrictEqual(_.singleton('a', 1), { a: 1 })
  })

  it('hasOwnProperty', () => {
    const x: Record<string, number> = { a: 1 }
    assert.deepStrictEqual(_.hasOwnProperty('a', x), true)
    assert.deepStrictEqual(_.hasOwnProperty('b', x), false)
  })

  it('partitionMapWithIndex', () => {
    assert.deepStrictEqual(_.partitionMapWithIndex((k, a: number) => (a > 1 ? right(a) : left(k)))({ a: 1, b: 2 }), {
      left: { a: 'a' },
      right: { b: 2 }
    })
  })

  it('partitionWithIndex', () => {
    assert.deepStrictEqual(_.partitionWithIndex((_, a: number) => a > 1)({ a: 1, b: 2 }), {
      left: { a: 1 },
      right: { b: 2 }
    })
  })

  it('filterMapWithIndex', () => {
    assert.deepStrictEqual(_.filterMapWithIndex((_, a: number) => (a > 1 ? O.some(a) : O.none))({ a: 1, b: 2 }), {
      b: 2
    })
  })

  it('filterWithIndex', () => {
    assert.deepStrictEqual(_.filterWithIndex((_, a: number) => a > 1)({ a: 1, b: 2 }), { b: 2 })
  })

  it('mapWithIndex', () => {
    assert.deepStrictEqual(_.mapWithIndex((k, a: number) => k + String(a))({ a: 1, b: 2 }), { a: 'a1', b: 'b2' })
  })

  it('updateAt', () => {
    const x: Record<string, number> = { a: 1 }
    assert.deepStrictEqual(_.updateAt('b', 2)(x), O.none)
    assert.deepStrictEqual(_.updateAt('a', 2)(x), O.some({ a: 2 }))
    const r = _.updateAt('a', 1)(x)
    if (O.isSome(r)) {
      assert.deepStrictEqual(r.value, x)
    } else {
      assert.fail()
    }
  })

  it('modifyAt', () => {
    const x: Record<string, number> = { a: 1 }
    assert.deepStrictEqual(_.modifyAt('b', (n: number) => n * 2)(x), O.none)
    assert.deepStrictEqual(_.modifyAt('a', (n: number) => n * 2)(x), O.some({ a: 2 }))
  })
})
