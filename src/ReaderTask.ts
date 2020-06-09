/**
 * @since 2.3.0
 */
import { Applicative2 } from './Applicative'
import { Apply2 } from './Apply'
import { flow, identity, pipe } from './function'
import { Functor2 } from './Functor'
import { IO } from './IO'
import { Monad2 } from './Monad'
import { MonadIO2 } from './MonadIO'
import { MonadTask2 } from './MonadTask'
import { Monoid } from './Monoid'
import * as R from './Reader'
import { Semigroup } from './Semigroup'
import * as T from './Task'

import Reader = R.Reader
import Task = T.Task

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
 * @since 2.3.0
 */
export const fromTask: <R, A>(ma: Task<A>) => ReaderTask<R, A> =
  /*#__PURE__*/
  R.of

/**
 * @since 2.3.0
 */
export const fromReader: <R, A = never>(ma: Reader<R, A>) => ReaderTask<R, A> = (ma) => flow(ma, T.of)

/**
 * @since 2.3.0
 */
export const fromIO: <R, A>(ma: IO<A>) => ReaderTask<R, A> =
  /*#__PURE__*/
  flow(T.fromIO, fromTask)

/**
 * @since 2.3.0
 */
export const of: <R, A>(a: A) => ReaderTask<R, A> = (a) => () => T.of(a)

/**
 * @since 2.3.0
 */
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>> {
  return R.getSemigroup(T.getSemigroup<A>(S))
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
export const ask: <R>() => ReaderTask<R, R> = () => T.of

/**
 * @since 2.3.0
 */
export const asks: <R, A = never>(f: (r: R) => A) => ReaderTask<R, A> = (f) => (r) => pipe(T.of(r), T.map(f))

/**
 * @since 2.4.0
 */
export function fromIOK<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>): <R>(...a: A) => ReaderTask<R, B> {
  return (...a) => fromIO(f(...a))
}

/**
 * @since 2.4.0
 */
export const chainIOK: <A, B>(f: (a: A) => IO<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B> = (f) =>
  chain((a) => fromIO(f(a)))

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
export const chainTaskK: <A, B>(f: (a: A) => Task<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B> = (f) =>
  chain((a) => fromTask(f(a)))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @since 2.3.0
 */
export const ap: <R, A>(fa: ReaderTask<R, A>) => <B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B> = (fa) => (
  fab
) => (r) => pipe(fab(r), T.ap(fa(r)))

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
export const chain: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B> = (f) => (
  fa
) => (r) =>
  pipe(
    fa(r),
    T.chain((a) => f(a)(r))
  )

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
export const flatten: <R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @since 2.3.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B> = (f) => (fa) =>
  flow(fa, T.map(f))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const functorReaderTask: Functor2<URI> = {
  URI,
  map
}

/**
 * @since 3.0.0
 */
export const applyReaderTask: Apply2<URI> = {
  URI,
  map,
  ap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const applicativeReaderTaskPar: Applicative2<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const applicativeReaderTaskSeq: Applicative2<URI> = {
  URI,
  map,
  of,
  ap: (fa) => (fab) =>
    pipe(
      fab,
      chain((f) => pipe(fa, map(f)))
    )
}

/**
 * @since 3.0.0
 */
export const monadReaderTask: Monad2<URI> = {
  URI,
  map,
  of,
  chain
}

/**
 * @since 3.0.0
 */
export const monadIOReaderTask: MonadIO2<URI> = {
  URI,
  map,
  of,
  chain,
  fromIO
}

/**
 * @since 3.0.0
 */
export const monadTaskReaderTask: MonadTask2<URI> = {
  URI,
  map,
  of,
  chain,
  fromIO,
  fromTask
}
