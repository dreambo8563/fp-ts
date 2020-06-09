/**
 * @since 2.0.0
 */
import { Alt4 } from './Alt'
import { Applicative4 } from './Applicative'
import { Apply4 } from './Apply'
import { Bifunctor4 } from './Bifunctor'
import { Either } from './Either'
import { identity, pipe, Predicate, Refinement } from './function'
import { Functor4 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad4 } from './Monad'
import { MonadIO4 } from './MonadIO'
import { MonadTask4 } from './MonadTask'
import { MonadThrow4 } from './MonadThrow'
import { Option } from './Option'
import { Reader } from './Reader'
import { ReaderEither } from './ReaderEither'
import * as RTE from './ReaderTaskEither'
import { State } from './State'
import { Task } from './Task'
import { TaskEither } from './TaskEither'

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

/**
 * @since 2.0.0
 */
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, readonly [A, S]>
}

/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 3.0.0
 */
export const evaluate: <S>(
  s: S
) => <R = unknown, E = never, A = never>(ma: StateReaderTaskEither<S, R, E, A>) => ReaderTaskEither<R, E, A> = (s) => (
  fsa
) =>
  pipe(
    fsa(s),
    RTE.map(([a]) => a)
  )

/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 3.0.0
 */
export const execute: <S>(s: S) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => ReaderTaskEither<R, E, S> = (
  s
) => (fsa) =>
  pipe(
    fsa(s),
    RTE.map(([_, s]) => s)
  )

/**
 * @since 2.0.0
 */
export function left<S, R, E = never, A = never>(e: E): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.left(e))
}

/**
 * @since 2.0.0
 */
export const right: <S, R, E = never, A = never>(a: A) => StateReaderTaskEither<S, R, E, A> = (a) => (s) =>
  RTE.right([a, s])

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
export const rightState: <S, R, E = never, A = never>(ma: State<S, A>) => StateReaderTaskEither<S, R, E, A> = (sa) => (
  s
) => RTE.right(sa(s))

/**
 * @since 2.0.0
 */
export function leftState<S, R, E = never, A = never>(me: State<S, E>): StateReaderTaskEither<S, R, E, A> {
  return (s) => RTE.left(me(s)[0])
}

/**
 * @since 2.0.0
 */
export const fromReaderTaskEither: <S, R, E, A>(ma: ReaderTaskEither<R, E, A>) => StateReaderTaskEither<S, R, E, A> = (
  fa
) => (s) =>
  pipe(
    fa,
    RTE.map((a) => [a, s])
  )

/**
 * Get the current state
 *
 * @since 2.0.0
 */
export const get: <S, R, E = never>() => StateReaderTaskEither<S, R, E, S> = () => (s) => RTE.right([s, s])

/**
 * Set the state
 *
 * @since 2.0.0
 */
export const put: <S, R, E = never>(s: S) => StateReaderTaskEither<S, R, E, void> = (s) => () =>
  RTE.right([undefined, s])

/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export const modify: <S, R, E = never>(f: (s: S) => S) => StateReaderTaskEither<S, R, E, void> = (f) => (s) =>
  RTE.right([undefined, f(s)])

/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export const gets: <S, R, E = never, A = never>(f: (s: S) => A) => StateReaderTaskEither<S, R, E, A> = (f) => (s) =>
  RTE.right([f(s), s])

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
export const chainEitherK: <E, A, B>(
  f: (a: A) => Either<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = (f) =>
  chain((a) => fromEither(f(a)))

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
export const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = (f) =>
  chain((a) => fromIOEither(f(a)))

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
export const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = (f) =>
  chain((a) => fromTaskEither(f(a)))

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
export const chainReaderTaskEitherK: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = (f) =>
  chain((a) => fromReaderTaskEither(f(a)))

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
) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B> = (fa) => (fab) => (
  s1
) =>
  pipe(
    fab(s1),
    RTE.chain(([f, s2]) =>
      pipe(
        fa(s2),
        RTE.map(([a, s3]) => [f(a), s3])
      )
    )
  )

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
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = (f) => (ma) => (s1) =>
  pipe(
    ma(s1),
    RTE.chain(([a, s2]) => f(a)(s2))
  )

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
) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @since 2.0.0
 */
export const map: <A, B>(
  f: (a: A) => B
) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = (f) => (fa) => (s1) =>
  pipe(
    fa(s1),
    RTE.map(([a, s2]) => [f(a), s2])
  )

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
 * @category instances
 * @since 3.0.0
 */
export const applicativeStateReaderTaskEitherPar: Applicative4<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const applicativeReaderTaskEitherSeq: Applicative4<URI> = {
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
export const monadStateReaderTaskEither: Monad4<URI> = {
  URI,
  map,
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
  of,
  chain,
  throwError
}
