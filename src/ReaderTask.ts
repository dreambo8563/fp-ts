/**
 * @since 2.3.0
 */
import { identity, pipe } from './function'
import { IO } from './IO'
import { Monad2 } from './Monad'
import { MonadTask2 } from './MonadTask'
import { Monoid } from './Monoid'
import { getSemigroup as getReaderSemigroup, Reader } from './Reader'
import { getReaderM } from './ReaderT'
import { Semigroup } from './Semigroup'
import * as T from './Task'

import Task = T.Task

const MT =
  /*#__PURE__*/
  getReaderM(T.monadTask)

/**
 * @since 2.3.0
 */
export const URI = 'ReaderTask'

/**
 * @since 2.3.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: ReaderTask<E, A>
  }
}

/**
 * @since 2.3.0
 */
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}

/**
 * @since 2.4.0
 */
export function run<R, A>(ma: ReaderTask<R, A>, r: R): Promise<A> {
  return ma(r)()
}

/**
 * @since 2.3.0
 */
export const fromTask: <R, A>(ma: Task<A>) => ReaderTask<R, A> =
  /*#__PURE__*/
  (() => MT.fromM)()

/**
 * @since 2.3.0
 */
export const fromReader: <R, A = never>(ma: Reader<R, A>) => ReaderTask<R, A> =
  /*#__PURE__*/
  (() => MT.fromReader)()

/**
 * @since 2.3.0
 */
export function fromIO<R, A>(ma: IO<A>): ReaderTask<R, A> {
  return fromTask(T.fromIO(ma))
}

/**
 * @since 2.3.0
 */
export const of: <R, A>(a: A) => ReaderTask<R, A> =
  /*#__PURE__*/
  (() => MT.of)()

/**
 * @since 2.3.0
 */
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>> {
  return getReaderSemigroup(T.getSemigroup<A>(S))
}

/**
 * @since 2.3.0
 */
export function getMonoid<R, A>(M: Monoid<A>): Monoid<ReaderTask<R, A>> {
  return {
    concat: getSemigroup<R, A>(M).concat,
    empty: of(M.empty)
  }
}

/**
 * @since 2.3.0
 */
export const ask: <R>() => ReaderTask<R, R> =
  /*#__PURE__*/
  (() => MT.ask)()

/**
 * @since 2.3.0
 */
export const asks: <R, A = never>(f: (r: R) => A) => ReaderTask<R, A> =
  /*#__PURE__*/
  (() => MT.asks)()

/**
 * @since 2.3.0
 */
export const local: <Q, R>(f: (f: Q) => R) => <A>(ma: ReaderTask<R, A>) => ReaderTask<Q, A> =
  /*#__PURE__*/
  (() => MT.local)()

/**
 * @since 2.4.0
 */
export function fromIOK<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>): <R>(...a: A) => ReaderTask<R, B> {
  return (...a) => fromIO(f(...a))
}

/**
 * @since 2.4.0
 */
export function chainIOK<A, B>(f: (a: A) => IO<B>): <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B> {
  return chain<A, any, B>(fromIOK(f))
}

/**
 * @since 2.4.0
 */
export function fromTaskK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
): <R>(...a: A) => ReaderTask<R, B> {
  return (...a) => fromTask(f(...a))
}

/**
 * @since 2.4.0
 */
export function chainTaskK<A, B>(f: (a: A) => Task<B>): <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B> {
  return chain<A, any, B>(fromTaskK(f))
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @since 2.3.0
 */
export const ap: <R, A>(fa: ReaderTask<R, A>) => <B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B> =
  /*#__PURE__*/
  (() => MT.ap)()

/**
 * @since 2.3.0
 */
export const apFirst = <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>): ReaderTask<R, A> =>
  pipe(
    fa,
    map((a) => (_: B) => a),
    ap(fb)
  )

/**
 * @since 2.3.0
 */
export const apSecond = <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>): ReaderTask<R, B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @since 2.3.0
 */
export const chain: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B> =
  /*#__PURE__*/
  (() => MT.chain)()

/**
 * @since 2.3.0
 */
export const chainFirst: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @since 2.3.0
 */
export const flatten: <R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A> = chain(identity)

/**
 * @since 2.3.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B> =
  /*#__PURE__*/
  (() => MT.map)()

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @internal
 */
export const monadReaderTask: Monad2<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}

/**
 * @since 2.3.0
 */
export const readerTask: Monad2<URI> & MonadTask2<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  fromIO,
  fromTask
}

/**
 * Like `readerTask` but `ap` is sequential
 * @since 2.3.0
 */
export const readerTaskSeq: typeof readerTask =
  /*#__PURE__*/
  ((): typeof readerTask => {
    return {
      URI,
      map,
      of,
      ap: (fa) => (fab) =>
        pipe(
          fab,
          chain((f) => pipe(fa, map(f)))
        ),
      chain,
      fromIO,
      fromTask
    }
  })()
