import * as assert from 'assert'
import { pipe, tuple } from '../src/function'
import { monoidString } from '../src/Monoid'
import * as _ from '../src/Writer'

describe('Writer', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      const x: _.Writer<string, number> = () => [1, 'a']
      assert.deepStrictEqual(pipe(x, _.map(double))(), [2, 'a'])
    })
  })

  it('evaluate', () => {
    assert.deepStrictEqual(
      _.evaluate(() => [1, 'a']),
      1
    )
  })

  it('execute', () => {
    assert.deepStrictEqual(
      _.execute(() => [1, 'a']),
      'a'
    )
  })

  it('tell', () => {
    assert.deepStrictEqual(_.tell(1)(), [undefined, 1])
  })

  it('listen', () => {
    assert.deepStrictEqual(_.listen(() => [1, 'a'])(), [[1, 'a'], 'a'])
  })

  it('pass', () => {
    assert.deepStrictEqual(_.pass(() => [tuple(1, (w: string) => w + 'b'), 'a'])(), [1, 'ab'])
  })

  it('listens', () => {
    const fa: _.Writer<string, number> = () => [1, 'a']
    assert.deepStrictEqual(
      pipe(
        fa,
        _.listens((w) => w.length)
      )(),
      [[1, 1], 'a']
    )
  })

  it('censor', () => {
    const fa: _.Writer<ReadonlyArray<string>, number> = () => [1, ['a', 'b']]
    assert.deepStrictEqual(
      pipe(
        fa,
        _.censor((w) => w.filter((a) => a !== 'a'))
      )(),
      [1, ['b']]
    )
  })

  describe('getApplicative', () => {
    const A = _.getApplicative(monoidString)

    it('ap', () => {
      const fab = () => [(n: number) => n * 2, 'a'] as const
      const fa = () => [1, 'b'] as const
      assert.deepStrictEqual(pipe(fab, A.ap(fa))(), [2, 'ab'])
    })

    it('of', () => {
      assert.deepStrictEqual(A.of(1)(), [1, ''])
    })
  })

  describe('getMonad', () => {
    const M = _.getMonad(monoidString)

    it('of', () => {
      assert.deepStrictEqual(M.of(1)(), [1, ''])
    })

    it('chain', () => {
      const f = (n: number) => () => [n * 2, 'b'] as const
      const fa = () => [1, 'a'] as const
      assert.deepStrictEqual(pipe(fa, M.chain(f))(), [2, 'ab'])
    })
  })
})
