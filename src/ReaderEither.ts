/**
 * @since 2.0.0
 */
import { Alt3, Alt3C } from './Alt'
import { Applicative3, Applicative3C } from './Applicative'
import { apComposition, Apply3 } from './Apply'
import { Bifunctor3 } from './Bifunctor'
import * as E from './Either'
import { flow, identity, pipe, Predicate, Refinement } from './function'
import { Functor3 } from './Functor'
import { Monad3 } from './Monad'
import { MonadThrow3 } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import * as R from './Reader'
import { Semigroup } from './Semigroup'
import * as ValidationT from './ValidationT'

import Either = E.Either
import Reader = R.Reader

/**
 * @since 2.0.0
 */
export const URI = 'ReaderEither'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind3<R, E, A> {
    readonly [URI]: ReaderEither<R, E, A>
  }
}

/**
 * @since 2.0.0
 */
export interface ReaderEither<R, E, A> extends Reader<R, Either<E, A>> {}

/**
 * @since 2.0.0
 */
export const left: <R, E = never, A = never>(e: E) => ReaderEither<R, E, A> = flow(E.left, R.of)

/**
 * @since 2.0.0
 */
export const right: <R, E = never, A = never>(a: A) => ReaderEither<R, E, A> = flow(E.right, R.of)

/**
 * @since 2.0.0
 */
export const rightReader: <R, E = never, A = never>(ma: Reader<R, A>) => ReaderEither<R, E, A> =
  /*#__PURE__*/
  R.map(E.right)

/**
 * @since 2.0.0
 */
export const leftReader: <R, E = never, A = never>(me: Reader<R, E>) => ReaderEither<R, E, A> =
  /*#__PURE__*/
  R.map(E.left)

/**
 * @since 2.0.0
 */
export const fold: <R, E, A, B>(
  onLeft: (e: E) => Reader<R, B>,
  onRight: (a: A) => Reader<R, B>
) => (ma: ReaderEither<R, E, A>) => Reader<R, B> = flow(E.fold, R.chain)

/**
 * @since 2.0.0
 */
export const getOrElse: <E, R, A>(onLeft: (e: E) => Reader<R, A>) => (ma: ReaderEither<R, E, A>) => Reader<R, A> = (
  onLeft
) => R.chain(E.fold(onLeft, R.of))

/**
 * @since 2.6.0
 */
export const getOrElseW: <E, Q, B>(
  onLeft: (e: E) => Reader<Q, B>
) => <R, A>(ma: ReaderEither<R, E, A>) => Reader<R & Q, A | B> = getOrElse as any

/**
 * @since 2.0.0
 */
export const orElse: <E, R, M, A>(
  onLeft: (e: E) => ReaderEither<R, M, A>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, M, A> = (f) => R.chain(E.fold(f, right))

/**
 * @since 2.0.0
 */
export const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E> =
  /*#__PURE__*/
  R.map(E.swap)

/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getSemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>> {
  return R.getSemigroup(E.getSemigroup<E, A>(S))
}

/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getApplySemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>> {
  return R.getSemigroup(E.getApplySemigroup<E, A>(S))
}

/**
 * @since 2.0.0
 */
export function getApplyMonoid<R, E, A>(M: Monoid<A>): Monoid<ReaderEither<R, E, A>> {
  return {
    concat: getApplySemigroup<R, E, A>(M).concat,
    empty: right(M.empty)
  }
}

/**
 * @since 2.0.0
 */
export function ask<R, E = never>(): ReaderEither<R, E, R> {
  return E.right
}

/**
 * @since 2.0.0
 */
export function asks<R, E = never, A = never>(f: (r: R) => A): ReaderEither<R, E, A> {
  return (r) => E.right(f(r))
}

/**
 * @since 3.0.0
 */
export function getReaderValidationApplicative<E>(S: Semigroup<E>): Applicative3C<URI, E> {
  return {
    URI,
    _E: undefined as any,
    map,
    ap: apComposition(R.applyReader, E.getValidationApplicative(S)),
    of
  }
}

/**
 * @since 3.0.0
 */
export function getReaderValidationAlt<E>(S: Semigroup<E>): Alt3C<URI, E> {
  return {
    URI,
    _E: undefined as any,
    map,
    alt: ValidationT.alt(S, R.monadReader)
  }
}

/**
 * @since 2.4.0
 */
export function fromEitherK<A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
): <R>(...a: A) => ReaderEither<R, E, B> {
  return (...a) => fromEither(f(...a))
}

/**
 * @since 2.4.0
 */
export const chainEitherK: <A, E, B>(
  f: (a: A) => Either<E, B>
) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B> = (f) => chain((a) => fromEither(f(a)))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const alt: <R, E, A>(
  that: () => ReaderEither<R, E, A>
) => (fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A> = (that) => R.chain(E.fold(that, right))

/**
 * @since 2.0.0
 */
export const ap: <R, E, A>(
  fa: ReaderEither<R, E, A>
) => <B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B> =
  /*#__PURE__*/
  apComposition(R.applyReader, E.applyEither)

/**
 * @since 2.0.0
 */
export const apFirst: <R, E, B>(
  fb: ReaderEither<R, E, B>
) => <A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A> = (fb) => (fa) =>
  pipe(
    fa,
    map((a) => () => a),
    ap(fb)
  )

/**
 * @since 2.0.0
 */
export const apSecond = <R, E, B>(fb: ReaderEither<R, E, B>) => <A>(fa: ReaderEither<R, E, A>): ReaderEither<R, E, B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, B> = flow(E.bimap, R.map)

/**
 * @since 2.0.0
 */
export const chain: <A, R, E, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B> = (f) => R.chain(E.fold(left, f))

/**
 * @since 2.6.0
 */
export const chainW: <Q, D, A, B>(
  f: (a: A) => ReaderEither<Q, D, B>
) => <R, E>(ma: ReaderEither<R, E, A>) => ReaderEither<R & Q, E | D, B> = chain as any

/**
 * @since 2.6.1
 */
export const chainEitherKW: <D, A, B>(
  f: (a: A) => Either<D, B>
) => <R, E>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E | D, B> = chainEitherK as any

/**
 * @since 2.0.0
 */
export const chainFirst: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @since 2.0.0
 */
export const flatten: <R, E, A>(mma: ReaderEither<R, E, ReaderEither<R, E, A>>) => ReaderEither<R, E, A> = chain(
  identity
)

/**
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, A> = (f) =>
  R.map(E.mapLeft(f))

/**
 * @since 2.0.0
 */
export const fromEither: <R, E, A>(ma: E.Either<E, A>) => ReaderEither<R, E, A> = (ma) =>
  E.isLeft(ma) ? left(ma.left) : right(ma.right)

/**
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: () => E) => <R, A>(ma: Option<A>) => ReaderEither<R, E, A> = (onNone) => (ma) =>
  ma._tag === 'None' ? left(onNone()) : right(ma.value)

/**
 * @since 2.0.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => ReaderEither<U, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderEither<R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (a: A) => (predicate(a) ? right(a) : left(onFalse(a)))

/**
 * @since 2.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: ReaderEither<R, E, A>
  ) => ReaderEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => <R>(ma: ReaderEither<R, E, A>) =>
  pipe(
    ma,
    chain((a) => (predicate(a) ? right(a) : left(onFalse(a))))
  )

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B> = (f) =>
  R.map(E.map(f))

/**
 * @since 3.0.0
 */
export const functorReaderTask: Functor3<URI> = {
  URI,
  map
}

/**
 * @since 3.0.0
 */
export const applyReaderTask: Apply3<URI> = {
  URI,
  map,
  ap
}

const of = right

/**
 * @since 3.0.0
 */
export const applicativeReaderTask: Applicative3<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * @since 3.0.0
 */
export const monadReaderTask: Monad3<URI> = {
  URI,
  map,
  of,
  chain
}

/**
 * @since 3.0.0
 */
export const bifunctorReaderTask: Bifunctor3<URI> = {
  URI,
  bimap,
  mapLeft
}

/**
 * @since 3.0.0
 */
export const altReaderTask: Alt3<URI> = {
  URI,
  map,
  alt
}

/**
 * @since 3.0.0
 */
export const monadThrowReaderTask: MonadThrow3<URI> = {
  URI,
  map,
  of,
  chain,
  throwError: left
}
