import * as assert from 'assert'
import { chain } from '../src/IO'
import { IORef, newIORef } from '../src/IORef'
import { pipe } from '../src/function'

describe('IORef', () => {
  it('read', () => {
    const ref = new IORef(1)
    assert.deepStrictEqual(ref.read(), 1)
  })

  it('write', () => {
    const ref = new IORef(1)
    assert.deepStrictEqual(
      pipe(
        ref.write(2),
        chain(() => ref.read)
      )(),
      2
    )
  })

  it('modify', () => {
    const double = (n: number): number => n * 2
    const ref = new IORef(1)
    assert.deepStrictEqual(
      pipe(
        ref.modify(double),
        chain(() => ref.read)
      )(),
      2
    )
  })

  it('newIORef', () => {
    assert.deepStrictEqual(
      pipe(
        newIORef(1),
        chain((ref) => ref.read)
      )(),
      1
    )
  })

  it('pipe', () => {
    const ref = new IORef(1)
    pipe(2, ref.write)()
    assert.deepStrictEqual(ref.read(), 2)
    pipe(() => 3, ref.modify)()
    assert.deepStrictEqual(ref.read(), 3)
  })
})
