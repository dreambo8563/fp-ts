import * as assert from 'assert'
import * as E from '../src/Either'
import { getEitherM } from '../src/EitherT'
import * as IO from '../src/IO'
import { pipe } from '../src/function'

const T = getEitherM(IO.monadIO)

describe('EitherT', () => {
  it('fold', () => {
    const onLeft = (s: string) => IO.of(`left(${s})`)
    const onRight = (n: number) => IO.of(`right(${n})`)
    assert.deepStrictEqual(pipe(IO.of(E.right(1)), T.fold(onLeft, onRight))(), 'right(1)')
    assert.deepStrictEqual(pipe(IO.of(E.left('bb')), T.fold(onLeft, onRight))(), 'left(bb)')
  })

  it('getOrElse', () => {
    const onLeft = (s: string) => IO.of(`left(${s})`)
    assert.deepStrictEqual(pipe(IO.of(E.right('a')), T.getOrElse(onLeft))(), 'a')
    assert.deepStrictEqual(pipe(IO.of(E.left('bb')), T.getOrElse(onLeft))(), 'left(bb)')
  })
})
