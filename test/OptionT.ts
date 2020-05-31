import * as assert from 'assert'
import * as O from '../src/Option'
import * as OptionT from '../src/OptionT'
import * as T from '../src/Task'
import { pipe } from '../src/function'

const none = T.of(O.none)

describe('OptionT', () => {
  it('map', async () => {
    const some = OptionT.some(T.monadTask)
    const map = OptionT.map(T.monadTask)
    assert.deepStrictEqual(
      await pipe(
        some(1),
        map((n) => n * 2)
      )(),
      O.some(2)
    )
  })

  it('ap', async () => {
    const some = OptionT.some(T.monadTask)
    const ap = OptionT.ap(T.monadTask)
    assert.deepStrictEqual(
      await pipe(
        some((n: number) => n * 2),
        ap(some(1))
      )(),
      O.some(2)
    )
  })

  it('chain', async () => {
    const some = OptionT.some(T.monadTask)
    const chain = OptionT.chain(T.monadTask)
    assert.deepStrictEqual(
      await pipe(
        some(1),
        chain((n) => some(n * 2))
      )(),
      O.some(2)
    )
    assert.deepStrictEqual(
      await pipe(
        none,
        chain((n) => some(n * 2))
      )(),
      O.none
    )
  })

  it('fold', async () => {
    const some = OptionT.some(T.monadTask)
    const fold = OptionT.fold(T.monadTask)
    assert.deepStrictEqual(
      await pipe(
        some(1),
        fold(
          () => T.of('none'),
          () => T.of('some(1)')
        )
      )(),
      'some(1)'
    )
    assert.deepStrictEqual(
      await pipe(
        none,
        fold(
          () => T.of('none'),
          () => T.of('some(1)')
        )
      )(),
      'none'
    )
  })

  it('alt', async () => {
    const some = OptionT.some(T.monadTask)
    const alt = OptionT.alt(T.monadTask)
    assert.deepStrictEqual(
      await pipe(
        some(1),
        alt(() => some(2))
      )(),
      O.some(1)
    )
    assert.deepStrictEqual(
      await pipe(
        none,
        alt(() => some(2))
      )(),
      O.some(2)
    )
  })

  it('getOrElse', async () => {
    const some = OptionT.some(T.monadTask)
    const getOrElse = OptionT.getOrElse(T.monadTask)
    assert.deepStrictEqual(
      await pipe(
        some(1),
        getOrElse(() => T.of(2))
      )(),
      1
    )
    assert.deepStrictEqual(
      await pipe(
        none,
        getOrElse(() => T.of(2))
      )(),
      2
    )
  })
})
