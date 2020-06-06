import * as assert from 'assert'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as TE from 'fp-ts/lib/TaskEither'
import * as T from 'fp-ts/lib/Task'
import * as E from 'fp-ts/lib/Either'
import * as _ from '../src/TaskOption'
import { sequenceT } from '../src/Apply'

describe('TaskOption', () => {
  it('applicativeTaskOptionPar', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string, delay: number): _.TaskOption<void> =>
      _.fromTask(
        T.delay(delay)(
          T.fromIO(() => {
            log.push(message)
          })
        )
      )
    const t1 = append('1', 10)
    const t2 = append('2', 5)
    await sequenceT(_.applicativeTaskOptionPar)(t1, t2)()
    assert.deepStrictEqual(log, ['2', '1'])
  })

  it('applicativeTaskOptionSeq', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string, delay: number): _.TaskOption<void> =>
      _.fromTask(
        T.delay(delay)(
          T.fromIO(() => {
            log.push(message)
          })
        )
      )
    const t1 = append('1', 10)
    const t2 = append('2', 5)
    await sequenceT(_.applicativeTaskOptionSeq)(t1, t2)()
    assert.deepStrictEqual(log, ['1', '2'])
  })

  it('separate', async () => {
    const { left, right } = pipe(_.of(E.right(1)), _.separate)
    assert.deepStrictEqual(await left(), O.none)
    assert.deepStrictEqual(await right(), O.some(1))
  })

  it('alt', async () => {
    assert.deepStrictEqual(
      await pipe(
        _.of('a'),
        _.alt(() => _.of('b'))
      )(),
      O.some('a')
    )
    assert.deepStrictEqual(
      await pipe(
        _.zero<string>(),
        _.alt(() => _.of('b'))
      )(),
      O.some('b')
    )
  })

  it('apFirst', async () => {
    assert.deepStrictEqual(await pipe(_.of('a'), _.apFirst(_.of('b')))(), O.some('a'))
  })

  it('apSecond', async () => {
    assert.deepStrictEqual(await pipe(_.of('a'), _.apSecond(_.of('b')))(), O.some('b'))
  })

  it('chain', async () => {
    assert.deepStrictEqual(
      await pipe(
        _.of('a'),
        _.chain((s) => _.of(s.length * 2))
      )(),
      O.some(2)
    )
    assert.deepStrictEqual(
      await pipe(
        _.none,
        _.chain((s: string) => _.of(s.length * 2))
      )(),
      O.none
    )
  })

  it('chainFirst', async () => {
    assert.deepStrictEqual(
      await pipe(
        _.of('a'),
        _.chainFirst((s) => _.of(s.length * 2))
      )(),
      O.some('a')
    )
  })

  it('fold', async () => {
    const g = (n: number) => T.of(n > 2)
    const te1 = pipe(
      _.some(1),
      _.fold(() => T.of(false), g)
    )
    const te2 = pipe(
      _.none,
      _.fold(() => T.of(true), g)
    )
    const b1 = await te1()
    const b2 = await te2()
    assert.deepStrictEqual(b1, false)
    assert.deepStrictEqual(b2, true)
  })

  it('getOrElse', async () => {
    const v = T.of(42)
    const te1 = pipe(
      _.some(1),
      _.getOrElse(() => v)
    )
    const te2 = pipe(
      _.fromOption<number>(O.none),
      _.getOrElse(() => v)
    )
    const n1 = await te1()
    const n2 = await te2()
    assert.deepStrictEqual(n1, 1)
    assert.deepStrictEqual(n2, 42)
  })

  it('fromTask', async () => {
    const ma = _.fromTask(T.of(1))
    const n = await ma()
    assert.deepStrictEqual(n, O.some(1))
  })

  it('fromNullable', async () => {
    const ma1 = _.fromNullable(null)
    const ma2 = _.fromNullable(undefined)
    const ma3 = _.fromNullable(42)
    const n1 = await ma1()
    const n2 = await ma2()
    const n3 = await ma3()
    assert.deepStrictEqual(n1, O.none)
    assert.deepStrictEqual(n2, O.none)
    assert.deepStrictEqual(n3, O.some(42))
  })

  it('fromTaskEither', async () => {
    const ma1 = _.fromTaskEither(TE.taskEither.of(42))
    const ma2 = _.fromTaskEither(TE.left('ouch!'))
    const n1 = await ma1()
    const n2 = await ma2()
    assert.deepStrictEqual(n1, O.some(42))
    assert.deepStrictEqual(n2, O.none)
  })

  it('toUndefined', async () => {
    const ma1 = _.toUndefined(_.some(42))
    const ma2 = _.toUndefined(_.none)
    const n1 = await ma1()
    const n2 = await ma2()
    assert.deepStrictEqual(n1, 42)
    assert.deepStrictEqual(n2, undefined)
  })

  it('toNullable', async () => {
    const ma1 = _.toNullable(_.some(42))
    const ma2 = _.toNullable(_.none)
    const n1 = await ma1()
    const n2 = await ma2()
    assert.deepStrictEqual(n1, 42)
    assert.deepStrictEqual(n2, null)
  })

  it('chainTaskK', async () => {
    const f = (n: number) => T.of(n * 2)
    const ma = pipe(_.some(42), _.chainTaskK(f))
    const n = await ma()
    assert.deepStrictEqual(n, O.some(84))
  })

  it('chainOptionK', async () => {
    const f = (n: number) => O.some(n - 10)
    const ma = pipe(_.some(42), _.chainOptionK(f))
    const n = await ma()
    assert.deepStrictEqual(n, O.some(32))
  })

  it('fromOptionK', async () => {
    const f = _.fromOptionK((n: number) => O.some(n * 2))
    assert.deepStrictEqual(await f(1)(), O.some(2))
  })

  it('mapNullable', async () => {
    interface X {
      readonly a?: {
        readonly b?: {
          readonly c?: {
            readonly d: number
          }
        }
      }
    }
    const x1: X = { a: {} }
    const x2: X = { a: { b: {} } }
    const x3: X = { a: { b: { c: { d: 1 } } } }
    assert.deepStrictEqual(
      await pipe(
        _.fromNullable(x1.a),
        _.mapNullable((x) => x.b),
        _.mapNullable((x) => x.c),
        _.mapNullable((x) => x.d)
      )(),
      O.none
    )
    assert.deepStrictEqual(
      await pipe(
        _.fromNullable(x2.a),
        _.mapNullable((x) => x.b),
        _.mapNullable((x) => x.c),
        _.mapNullable((x) => x.d)
      )(),
      O.none
    )
    assert.deepStrictEqual(
      await pipe(
        _.fromNullable(x3.a),
        _.mapNullable((x) => x.b),
        _.mapNullable((x) => x.c),
        _.mapNullable((x) => x.d)
      )(),
      O.some(1)
    )
  })

  it('tryCatch', async () => {
    const e1 = await _.tryCatch(() => Promise.resolve(1))()
    assert.deepStrictEqual(e1, O.some(1))
    const e2 = await _.tryCatch(() => Promise.reject(undefined))()
    assert.deepStrictEqual(e2, O.none)
  })

  it('filter', async () => {
    const predicate = (a: number) => a === 2
    assert.deepStrictEqual(await pipe(_.none, _.filter(predicate))(), O.none)
    assert.deepStrictEqual(await pipe(_.some(1), _.filter(predicate))(), O.none)
    assert.deepStrictEqual(await pipe(_.some(2), _.filter(predicate))(), O.some(2))
  })

  it('chainOptionK', async () => {
    const f = (s: string) => O.some(s.length)
    const x = await pipe(_.some('a'), _.chainOptionK(f))()
    assert.deepStrictEqual(x, O.some(1))
  })
})
