import * as assert from 'assert'
import * as E from '../src/Either'
import * as IO from '../src/IO'
import * as IE from '../src/IOEither'
import * as O from '../src/Option'
import { pipe } from '../src/function'
import * as R from '../src/Reader'
import * as RE from '../src/ReaderEither'
import * as RTE from '../src/ReaderTaskEither'
import { State } from '../src/State'
import * as _ from '../src/StateReaderTaskEither'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'

describe('StateReaderTaskEither', () => {
  const defaultState: unknown = null

  describe('pipeables', () => {
    it('alt', async () => {
      assert.deepStrictEqual(
        await pipe(
          _.right(1),
          _.alt(() => _.left('a')),
          _.evaluate(defaultState)
        )({})(),
        E.right(1)
      )
      assert.deepStrictEqual(
        await pipe(
          _.left('a'),
          _.alt(() => _.right(1)),
          _.evaluate(defaultState)
        )({})(),
        E.right(1)
      )
      assert.deepStrictEqual(
        await pipe(
          _.left(1),
          _.alt(() => _.left(2)),
          _.evaluate(defaultState)
        )({})(),
        E.left(2)
      )
    })

    it('map', async () => {
      const len = (s: string): number => s.length
      const e = await pipe(_.right('aaa'), _.map(len), _.evaluate(defaultState))({})()
      assert.deepStrictEqual(e, E.right(3))
    })

    it('ap', async () => {
      const len = (s: string): number => s.length
      const e = await pipe(_.right(len), _.ap(_.right('aaa')), _.evaluate(defaultState))({})()
      assert.deepStrictEqual(e, E.right(3))
    })

    it('apFirst', async () => {
      const e = await pipe(_.right('a'), _.apFirst(_.right('b')), _.evaluate(defaultState))({})()
      assert.deepStrictEqual(e, E.right('a'))
    })

    it('apSecond', async () => {
      const e = await pipe(_.right('a'), _.apSecond(_.right('b')), _.evaluate(defaultState))({})()
      assert.deepStrictEqual(e, E.right('b'))
    })

    it('chain', async () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      const e = await pipe(_.right('aaa'), _.chain(f), _.evaluate(defaultState))({})()
      assert.deepStrictEqual(e, E.right(3))
    })

    it('chainFirst', async () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      const e = await pipe(_.right('aaa'), _.chainFirst(f), _.evaluate(defaultState))({})()
      assert.deepStrictEqual(e, E.right('aaa'))
    })

    it('chainFirst', async () => {
      const e = await pipe(_.right(_.right('a')), _.flatten, _.evaluate(defaultState))({})()
      assert.deepStrictEqual(e, E.right('a'))
    })

    it('bimap', async () => {
      const gt2 = (n: number): boolean => n > 2
      const len = (s: string): number => s.length
      const e1 = await pipe(_.right('aaa'), _.bimap(gt2, len), _.evaluate(defaultState))({})()
      assert.deepStrictEqual(e1, E.right(3))
      const e2 = await pipe(_.left(3), _.bimap(gt2, len), _.evaluate(defaultState))({})()
      assert.deepStrictEqual(e2, E.left(true))
    })

    it('mapLeft', async () => {
      const gt2 = (n: number): boolean => n > 2
      const e = await pipe(_.left(3), _.mapLeft(gt2), _.evaluate(defaultState))({})()
      assert.deepStrictEqual(e, E.left(true))
    })

    it('fromPredicate', async () => {
      const predicate = (n: number) => n >= 2
      const gt2 = _.fromPredicate(predicate, (n) => `Invalid number ${n}`)

      const refinement = (u: string | number): u is number => typeof u === 'number'
      const isNumber = _.fromPredicate(refinement, (u) => `Invalid number ${String(u)}`)

      const e1 = await _.evaluate(defaultState)(gt2(3))({})()
      const e2 = await _.evaluate(defaultState)(gt2(1))({})()
      const e3 = await _.evaluate(defaultState)(isNumber(4))({})()
      assert.deepStrictEqual(e1, E.right(3))
      assert.deepStrictEqual(e2, E.left('Invalid number 1'))
      assert.deepStrictEqual(e3, E.right(4))
    })

    it('filterOrElse', async () => {
      assert.deepStrictEqual(
        await pipe(
          _.right(12),
          _.filterOrElse(
            (n) => n > 10,
            () => 'a'
          ),
          _.evaluate(defaultState)
        )({})(),
        E.right(12)
      )

      assert.deepStrictEqual(
        await pipe(
          _.right(8),
          _.filterOrElse(
            (n) => n > 10,
            () => 'a'
          ),
          _.evaluate(defaultState)
        )({})(),
        E.left('a')
      )
    })
  })

  it('run', async () => {
    assert.deepStrictEqual(await _.right('a')({})({})(), E.right(['a', {}]))
  })

  it('ap (seq)', async () => {
    const len = (s: string): number => s.length
    const mab = _.right(len)
    const ma = _.right('a')
    assert.deepStrictEqual(
      await pipe(mab, _.monadReaderTaskEitherSeq.ap(ma), _.evaluate(defaultState))({})(),
      E.right(1)
    )
  })

  it('execute', async () => {
    assert.deepStrictEqual(await _.execute(defaultState)(_.right(1))({})(), E.right(null))
  })

  it('rightState', async () => {
    const state: State<unknown, number> = (s) => [1, s]
    const e = await _.evaluate(defaultState)(_.rightState(state))({})()
    assert.deepStrictEqual(e, E.right(1))
  })

  it('leftState', async () => {
    const state: State<unknown, number> = (s) => [1, s]
    const e = await _.evaluate(defaultState)(_.leftState(state))({})()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromReaderTaskEither', async () => {
    const rte: RTE.ReaderTaskEither<unknown, string, number> = RTE.right(1)
    const e = await _.evaluate(defaultState)(_.fromReaderTaskEither(rte))({})()
    assert.deepStrictEqual(e, E.right(1))
  })

  it('left', async () => {
    const e = await _.left(1)({})({})()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('rightTask', async () => {
    const e = await _.rightTask(T.of(1))({})({})()
    assert.deepStrictEqual(e, E.right([1, {}]))
  })

  it('leftTask', async () => {
    const e = await _.leftTask(T.of(1))({})({})()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromTaskEither', async () => {
    const e = await _.fromTaskEither(TE.right(1))({})({})()
    assert.deepStrictEqual(e, E.right([1, {}]))
  })

  it('rightReader', async () => {
    const e = await _.rightReader(R.of(1))({})({})()
    assert.deepStrictEqual(e, E.right([1, {}]))
  })

  it('leftReader', async () => {
    const e = await _.leftReader(R.of(1))({})({})()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromIOEither', async () => {
    const e1 = await _.fromIOEither(IE.right(1))({})({})()
    assert.deepStrictEqual(e1, E.right([1, {}]))
    const e2 = await _.fromIOEither(IE.left(1))({})({})()
    assert.deepStrictEqual(e2, E.left(1))
  })

  it('fromEither', async () => {
    const e1 = await _.fromEither(E.right(1))({})({})()
    assert.deepStrictEqual(e1, E.right([1, {}]))
    const e2 = await _.fromEither(E.left(1))({})({})()
    assert.deepStrictEqual(e2, E.left(1))
  })

  it('fromOption', async () => {
    const e1 = await _.fromOption(() => 'err')(O.some(1))({})({})()
    assert.deepStrictEqual(e1, E.right([1, {}]))
    const e2 = await _.fromOption(() => 'err')(O.none)({})({})()
    assert.deepStrictEqual(e2, E.left('err'))
  })

  it('rightIO', async () => {
    const e = await _.rightIO(IO.of(1))({})({})()
    assert.deepStrictEqual(e, E.right([1, {}]))
  })

  it('leftIO', async () => {
    const e = await _.leftIO(IO.of(1))({})({})()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromOption', async () => {
    const e1 = await _.fromOption(() => 'none')(O.none)({})({})()
    assert.deepStrictEqual(e1, E.left('none'))
    const e2 = await _.fromOption(() => 'none')(O.some(1))({})({})()
    assert.deepStrictEqual(e2, E.right([1, {}]))
  })

  it('fromReaderEither', async () => {
    const e1 = await _.fromReaderEither(RE.left('a'))({})({})()
    assert.deepStrictEqual(e1, E.left('a'))
    const e2 = await _.fromReaderEither(RE.right(1))({})({})()
    assert.deepStrictEqual(e2, E.right([1, {}]))
  })

  it('chainEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    const x = await pipe(_.right('a'), _.chainEitherK(f))(undefined)(undefined)()
    assert.deepStrictEqual(x, E.right([1, undefined]))
  })

  it('chainIOEitherK', async () => {
    const f = (s: string) => IE.right(s.length)
    const x = await pipe(_.right('a'), _.chainIOEitherK(f))(undefined)(undefined)()
    assert.deepStrictEqual(x, E.right([1, undefined]))
  })

  it('chainTaskEitherK', async () => {
    const f = (s: string) => TE.right(s.length)
    const x = await pipe(_.right('a'), _.chainTaskEitherK(f))(undefined)(undefined)()
    assert.deepStrictEqual(x, E.right([1, undefined]))
  })

  it('chainReaderTaskEitherK', async () => {
    const f = (s: string) => RTE.right(s.length)
    const x = await pipe(_.right('a'), _.chainReaderTaskEitherK(f))(undefined)(undefined)()
    assert.deepStrictEqual(x, E.right([1, undefined]))
  })

  it('put', async () => {
    assert.deepStrictEqual(await _.put(2)(1)({})(), E.right([undefined, 2]))
  })

  it('get', async () => {
    assert.deepStrictEqual(await _.get()(1)({})(), E.right([1, 1]))
  })

  it('modify', async () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(await _.modify(double)(1)({})(), E.right([undefined, 2]))
  })

  it('gets', async () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(await _.gets(double)(1)({})(), E.right([2, 1]))
  })
})
