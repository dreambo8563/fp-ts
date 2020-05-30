import * as assert from 'assert'
import * as E from '../src/Either'
import { getEitherM } from '../src/EitherT'
import { io } from '../src/IO'
import { pipe } from '../src/function'

const T = getEitherM(io)

describe('EitherT', () => {
  it('fold', () => {
    const onLeft = (s: string) => io.of(`left(${s})`)
    const onRight = (n: number) => io.of(`right(${n})`)
    assert.deepStrictEqual(pipe(io.of(E.right(1)), T.fold(onLeft, onRight))(), 'right(1)')
    assert.deepStrictEqual(pipe(io.of(E.left('bb')), T.fold(onLeft, onRight))(), 'left(bb)')
  })

  it('getOrElse', () => {
    const onLeft = (s: string) => io.of(`left(${s})`)
    assert.deepStrictEqual(pipe(io.of(E.right('a')), T.getOrElse(onLeft))(), 'a')
    assert.deepStrictEqual(pipe(io.of(E.left('bb')), T.getOrElse(onLeft))(), 'left(bb)')
  })
})
