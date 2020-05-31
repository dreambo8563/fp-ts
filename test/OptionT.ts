import * as assert from 'assert'
import * as O from '../src/Option'
import { getOptionM } from '../src/OptionT'
import * as T from '../src/Task'
import { pipe } from '../src/function'

const MT = getOptionM(T.monadTask)

describe('OptionT', () => {
  it('map', () => {
    const greetingT = MT.of('welcome')
    const excitedGreetingT = pipe(
      greetingT,
      MT.map((s) => s + '!')
    )
    return excitedGreetingT().then((o) => {
      assert.deepStrictEqual(o, O.some('welcome!'))
    })
  })

  it('chain', () => {
    const to1 = pipe(
      MT.of('foo'),
      MT.chain((a) => MT.of(a.length))
    )
    const to2 = pipe(
      T.of(O.none),
      MT.chain((a: string) => MT.of(a.length))
    )
    return Promise.all([to1(), to2()]).then(([o1, o2]) => {
      assert.deepStrictEqual(o1, O.some(3))
      assert.deepStrictEqual(o2, O.none)
    })
  })

  it('fold', async () => {
    const f = () => T.of('none')
    const g = (s: string) => T.of(`some${s.length}`)
    const s1 = await pipe(T.of(O.none), MT.fold(f, g))()
    assert.deepStrictEqual(s1, 'none')
    const s2 = await pipe(MT.of('s'), MT.fold(f, g))()
    assert.deepStrictEqual(s2, 'some1')
  })

  it('alt', async () => {
    const o1 = await pipe(
      T.of(O.some(1)),
      MT.alt(() => T.of(O.some(2)))
    )()
    assert.deepStrictEqual(o1, O.some(1))
    const o2 = await pipe(
      T.of(O.none),
      MT.alt(() => T.of(O.some(2)))
    )()
    assert.deepStrictEqual(o2, O.some(2))
  })

  it('getOrElse', async () => {
    const n1 = await pipe(
      T.of(O.some(1)),
      MT.getOrElse(() => T.of(2))
    )()
    assert.deepStrictEqual(n1, 1)
    const n2 = await pipe(
      T.of(O.none),
      MT.getOrElse(() => T.of(2))
    )()
    assert.deepStrictEqual(n2, 2)
  })

  it('fromM', () => {
    return MT.fromM(T.of(1))().then((o) => {
      assert.deepStrictEqual(o, O.some(1))
    })
  })

  it('none', () => {
    return MT.none()().then((o) => {
      assert.deepStrictEqual(o, O.none)
    })
  })
})
