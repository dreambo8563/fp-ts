/**
 * @since 2.0.0
 */
import { Alt4 } from './Alt'
import { Bifunctor4 } from './Bifunctor'
import { Either } from './Either'
import { identity, pipe, Predicate, Refinement } from './function'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad4 } from './Monad'
import { MonadTask4 } from './MonadTask'
import { MonadThrow4 } from './MonadThrow'
import { Option } from './Option'
import { Reader } from './Reader'
import { ReaderEither } from './ReaderEither'
import * as RTE from './ReaderTaskEither'
import { State } from './State'
import * as StateT from './StateT'
import { Task } from './Task'
import { TaskEither } from './TaskEither'
import { Functor4 } from './Functor'
import { Apply4 } from './Apply'
import { Applicative4 } from './Applicative'
import { MonadIO4 } from './MonadIO'

import ReaderTaskEither = RTE.ReaderTaskEither

/**
 * @since 2.0.0
 */
export const URI = 'StateReaderTaskEither'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind4<S, R, E, A> {
    readonly [URI]: StateReaderTaskEither<S, R, E, A>
  }
}

/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, [A, S]>
}
/* tslint:enable:readonly-array */

/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 3.0.0
 */
export const evaluate: <S>(
  s: S
) => <R = unknown, E = never, A = never>(ma: StateReaderTaskEither<S, R, E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  StateT.evaluate(RTE.monadReaderTaskEither)

/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 3.0.0
 */
export const execute: <S>(s: S) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => ReaderTaskEither<R, E, S> =
  /*#__PURE__*/
  StateT.execute(RTE.monadReaderTaskEither)

/**
 * @since 2.0.0
 */
export function left<S, R, E = never, A = never>(e: E): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.left(e))
}

/**
 * @since 2.0.0
 */
export const right: <S, R, E = never, A = never>(a: A) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/
  StateT.of(RTE.monadReaderTaskEither)

/**
 * @since 2.0.0
 */
export function rightTask<S, R, E = never, A = never>(ma: Task<A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.rightTask(ma))
}

/**
 * @since 2.0.0
 */
export function leftTask<S, R, E = never, A = never>(me: Task<E>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.leftTask(me))
}

/**
 * @since 2.0.0
 */
export function fromTaskEither<S, R, E, A>(ma: TaskEither<E, A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.fromTaskEither(ma))
}

/**
 * @since 2.0.0
 */
export function rightReader<S, R, E = never, A = never>(ma: Reader<R, A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.rightReader(ma))
}

/**
 * @since 2.0.0
 */
export function leftReader<S, R, E = never, A = never>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.leftReader(me))
}

/**
 * @since 2.0.0
 */
export function fromIOEither<S, R, E, A>(ma: IOEither<E, A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.fromIOEither(ma))
}

/**
 * @since 2.0.0
 */
export function fromReaderEither<S, R, E, A>(ma: ReaderEither<R, E, A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.fromReaderEither(ma))
}

/**
 * @since 2.0.0
 */
export function rightIO<S, R, E = never, A = never>(ma: IO<A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.rightIO(ma))
}

/**
 * @since 2.0.0
 */
export function leftIO<S, R, E = never, A = never>(me: IO<E>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.leftIO(me))
}

/**
 * @since 2.0.0
 */
export const rightState: <S, R, E = never, A = never>(ma: State<S, A>) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/
  StateT.fromState(RTE.monadReaderTaskEither)

/**
 * @since 2.0.0
 */
export function leftState<S, R, E = never, A = never>(me: State<S, E>): StateReaderTaskEither<S, R, E, A> {
  return (s) => RTE.left(me(s)[0])
}

/**
 * @since 2.0.0
 */
export const fromReaderTaskEither: <S, R, E, A>(ma: ReaderTaskEither<R, E, A>) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/
  StateT.fromF(RTE.monadReaderTaskEither)

/**
 * Get the current state
 *
 * @since 2.0.0
 */
export const get: <S, R, E = never>() => StateReaderTaskEither<S, R, E, S> =
  /*#__PURE__*/
  StateT.get(RTE.monadReaderTaskEither)

/**
 * Set the state
 *
 * @since 2.0.0
 */
export const put: <S, R, E = never>(s: S) => StateReaderTaskEither<S, R, E, void> =
  /*#__PURE__*/
  StateT.put(RTE.monadReaderTaskEither)

/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export const modify: <S, R, E = never>(f: (s: S) => S) => StateReaderTaskEither<S, R, E, void> =
  /*#__PURE__*/
  StateT.modify(RTE.monadReaderTaskEither)

/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export const gets: <S, R, E = never, A = never>(f: (s: S) => A) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/
  StateT.gets(RTE.monadReaderTaskEither)

/**
 * @since 2.4.0
 */
export function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> {
  return (...a) => fromEither(f(...a))
}

/**
 * @since 2.4.0
 */
export function chainEitherK<E, A, B>(
  f: (a: A) => Either<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> {
  return chain<any, any, E, A, B>(fromEitherK(f))
}

/**
 * @since 2.4.0
 */
export function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> {
  return (...a) => fromIOEither(f(...a))
}

/**
 * @since 2.4.0
 */
export function chainIOEitherK<E, A, B>(
  f: (a: A) => IOEither<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> {
  return chain<any, any, E, A, B>(fromIOEitherK(f))
}

/**
 * @since 2.4.0
 */
export function fromTaskEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> {
  return (...a) => fromTaskEither(f(...a))
}

/**
 * @since 2.4.0
 */
export function chainTaskEitherK<E, A, B>(
  f: (a: A) => TaskEither<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> {
  return chain<any, any, E, A, B>(fromTaskEitherK(f))
}

/**
 * @since 2.4.0
 */
export function fromReaderTaskEitherK<R, E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => ReaderTaskEither<R, E, B>
): <S>(...a: A) => StateReaderTaskEither<S, R, E, B> {
  return (...a) => fromReaderTaskEither(f(...a))
}

/**
 * @since 2.4.0
 */
export function chainReaderTaskEitherK<R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> {
  return chain<any, any, E, A, B>(fromReaderTaskEitherK(f))
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @since 2.6.2
 */
export const alt: <S, R, E, A>(
  that: () => StateReaderTaskEither<S, R, E, A>
) => (fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A> = (that) => (fa) => (s) =>
  pipe(
    fa(s),
    RTE.alt(() => that()(s))
  )

/**
 * @since 2.0.0
 */
export const ap: <S, R, E, A>(
  fa: StateReaderTaskEither<S, R, E, A>
) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/
  StateT.ap(RTE.monadReaderTaskEither)

/**
 * @since 2.0.0
 */
export const apFirst = <S, R, E, B>(fb: StateReaderTaskEither<S, R, E, B>) => <A>(
  fa: StateReaderTaskEither<S, R, E, A>
): StateReaderTaskEither<S, R, E, A> =>
  pipe(
    fa,
    map((a) => (_: B) => a),
    ap(fb)
  )

/**
 * @since 2.0.0
 */
export const apSecond = <S, R, E, B>(fb: StateReaderTaskEither<S, R, E, B>) => <A>(
  fa: StateReaderTaskEither<S, R, E, A>
): StateReaderTaskEither<S, R, E, B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @since 2.6.2
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, B> = (f, g) => (fea) => (s) =>
  pipe(
    fea(s),
    RTE.bimap(f, ([a, s]) => [g(a), s])
  )

/**
 * @since 2.0.0
 */
export const chain: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/
  StateT.chain(RTE.monadReaderTaskEither)

/**
 * @since 2.0.0
 */
export const chainFirst: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @since 2.6.0
 */
export const chainW: <S, Q, D, A, B>(
  f: (a: A) => StateReaderTaskEither<S, Q, D, B>
) => <R, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R & Q, E | D, B> = chain as any

/**
 * @since 2.6.1
 */
export const chainEitherKW: <D, A, B>(
  f: (a: A) => Either<D, B>
) => <S, R, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E | D, B> = chainEitherK as any

/**
 * @since 2.6.1
 */
export const chainTaskEitherKW: <D, A, B>(
  f: (a: A) => TaskEither<D, B>
) => <S, R, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E | D, B> = chainTaskEitherK as any

/**
 * @since 2.6.1
 */
export const chainReaderTaskEitherKW: <R, D, A, B>(
  f: (a: A) => ReaderTaskEither<R, D, B>
) => <S, E>(
  ma: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E | D, B> = chainReaderTaskEitherK as any

/**
 * @since 2.6.1
 */
export const chainIOEitherKW: <R, D, A, B>(
  f: (a: A) => IOEither<D, B>
) => <S, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E | D, B> = chainIOEitherK as any

/**
 * @since 2.0.0
 */
export const flatten: <S, R, E, A>(
  mma: StateReaderTaskEither<S, R, E, StateReaderTaskEither<S, R, E, A>>
) => StateReaderTaskEither<S, R, E, A> = chain(identity)

/**
 * @since 2.0.0
 */
export const map: <A, B>(
  f: (a: A) => B
) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/
  StateT.map(RTE.monadReaderTaskEither)

/**
 * @since 2.6.2
 */
export const mapLeft: <E, G>(
  f: (e: E) => G
) => <S, R, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, A> = (f) => (fea) => (s) =>
  pipe(fea(s), RTE.mapLeft(f))

/**
 * @since 2.0.0
 */
export const fromEither: <S, R, E, A>(ma: Either<E, A>) => StateReaderTaskEither<S, R, E, A> = (ma) =>
  ma._tag === 'Left' ? left(ma.left) : right(ma.right)

/**
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: () => E) => <S, R, A>(ma: Option<A>) => StateReaderTaskEither<S, R, E, A> = (
  onNone
) => (ma) => (ma._tag === 'None' ? left(onNone()) : right(ma.value))

/**
 * @since 2.4.4
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    a: A
  ) => StateReaderTaskEither<S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(a: A) => StateReaderTaskEither<S, R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => <S, R>(a: A): StateReaderTaskEither<S, R, E, A> =>
  predicate(a) ? right(a) : left(onFalse(a))

/**
 * @since 2.4.4
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => <S, R>(
  ma: StateReaderTaskEither<S, R, E, A>
): StateReaderTaskEither<S, R, E, A> =>
  pipe(
    ma,
    chain((a) => (predicate(a) ? right(a) : left(onFalse(a))))
  )

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const functorStateReaderTaskEither: Functor4<URI> = {
  URI,
  map
}

/**
 * @since 3.0.0
 */
export const applyStateReaderTaskEither: Apply4<URI> = {
  URI,
  map,
  ap
}

const of = right

/**
 * @since 3.0.0
 */
export const applicativeStateReaderTaskEither: Applicative4<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * @since 3.0.0
 */
export const monadStateReaderTaskEither: Monad4<URI> = {
  URI,
  map,
  ap,
  of,
  chain
}

/**
 * @since 3.0.0
 */
export const bifunctorStateReaderTaskEither: Bifunctor4<URI> = {
  URI,
  bimap,
  mapLeft
}

/**
 * @since 3.0.0
 */
export const altStateReaderTaskEither: Alt4<URI> = {
  URI,
  map,
  alt
}

const fromIO = rightIO

/**
 * @since 3.0.0
 */
export const monadIOStateReaderTaskEither: MonadIO4<URI> = {
  URI,
  map,
  ap,
  of,
  chain,
  fromIO
}

const fromTask = rightTask

/**
 * @since 3.0.0
 */
export const monadTaskStateReaderTaskEither: MonadTask4<URI> = {
  URI,
  map,
  ap,
  of,
  chain,
  fromIO,
  fromTask
}

const throwError = left

/**
 * @since 3.0.0
 */
export const monadThrowStateReaderTaskEither: MonadThrow4<URI> = {
  URI,
  map,
  ap,
  of,
  chain,
  throwError
}

/**
 * TODO
 * @since 3.0.0
 */
export const monadReaderTaskEitherSeq: Monad4<URI> &
  Bifunctor4<URI> &
  Alt4<URI> &
  MonadTask4<URI> &
  MonadThrow4<URI> = {
  URI,
  map,
  of,
  ap: (fa) => (fab) =>
    pipe(
      fab,
      chain((f) => pipe(fa, map(f)))
    ),
  chain,
  bimap,
  mapLeft,
  alt,
  fromIO,
  fromTask,
  throwError
}
