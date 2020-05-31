/**
 * `IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`. If you want to represent a synchronous computation that never fails, please see `IO`.
 *
 * @since 2.0.0
 */
import { Alt2, Alt2C } from './Alt'
import { Applicative2, Applicative2C } from './Applicative'
import { Apply2 } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import * as E from './Either'
import * as EitherT from './EitherT'
import { Filterable2C, getFilterableComposition } from './Filterable'
import { identity, Lazy, pipe, Predicate, Refinement } from './function'
import { Functor2 } from './Functor'
import * as io from './IO'
import { Monad2 } from './Monad'
import { MonadIO2 } from './MonadIO'
import { MonadThrow2 } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import { getValidationM } from './ValidationT'

import Either = E.Either
import IO = io.IO

/**
 * @since 2.0.0
 */
export const URI = 'IOEither'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: IOEither<E, A>
  }
}

/**
 * @since 2.0.0
 */
export interface IOEither<E, A> extends IO<Either<E, A>> {}

/**
 * @since 2.0.0
 */
export const left: <E = never, A = never>(l: E) => IOEither<E, A> =
  /*#__PURE__*/
  (() => EitherT.left(io.monadIO))()

/**
 * @since 2.0.0
 */
export const right: <E = never, A = never>(a: A) => IOEither<E, A> =
  /*#__PURE__*/
  (() => EitherT.right(io.monadIO))()

/**
 * @since 2.0.0
 */
export const rightIO: <E = never, A = never>(ma: IO<A>) => IOEither<E, A> =
  /*#__PURE__*/
  io.map(E.right)

/**
 * @since 2.0.0
 */
export const leftIO: <E = never, A = never>(me: IO<E>) => IOEither<E, A> =
  /*#__PURE__*/
  io.map(E.left)

/**
 * @since 2.0.0
 */
export const fold: <E, A, B>(onLeft: (e: E) => IO<B>, onRight: (a: A) => IO<B>) => (ma: IOEither<E, A>) => IO<B> =
  /*#__PURE__*/
  (() => EitherT.fold(io.monadIO))()

/**
 * @since 2.0.0
 */
export const getOrElse: <E, A>(onLeft: (e: E) => IO<A>) => (ma: IOEither<E, A>) => IO<A> =
  /*#__PURE__*/
  (() => EitherT.getOrElse(io.monadIO))()

/**
 * @since 2.6.0
 */
export const getOrElseW: <E, B>(onLeft: (e: E) => IO<B>) => <A>(ma: IOEither<E, A>) => IO<A | B> = getOrElse as any

/**
 * @since 2.0.0
 */
export const orElse: <E, A, M>(onLeft: (e: E) => IOEither<M, A>) => (ma: IOEither<E, A>) => IOEither<M, A> =
  /*#__PURE__*/
  (() => EitherT.orElse(io.monadIO))()

/**
 * @since 2.0.0
 */
export const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E> =
  /*#__PURE__*/
  io.map(E.swap)

/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>> {
  return io.getSemigroup(E.getSemigroup<E, A>(S))
}

/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>> {
  return io.getSemigroup(E.getApplySemigroup<E, A>(S))
}

/**
 * @since 2.0.0
 */
export function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<IOEither<E, A>> {
  return {
    concat: getApplySemigroup<E, A>(M).concat,
    empty: right(M.empty)
  }
}

/**
 * Constructs a new `IOEither` from a function that performs a side effect and might throw
 *
 * @since 2.0.0
 */
export function tryCatch<E, A>(f: Lazy<A>, onError: (reason: unknown) => E): IOEither<E, A> {
  return () => E.tryCatch(f, onError)
}

/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
 *
 * @since 2.0.0
 */
export function bracket<E, A, B>(
  acquire: IOEither<E, A>,
  use: (a: A) => IOEither<E, B>,
  release: (a: A, e: Either<E, B>) => IOEither<E, void>
): IOEither<E, B> {
  return pipe(
    acquire,
    chain((a) =>
      pipe(
        pipe(use(a), io.monadIO.map(E.right)),
        chain((e) =>
          pipe(
            release(a, e),
            chain(() => (E.isLeft(e) ? left(e.left) : of(e.right)))
          )
        )
      )
    )
  )
}

/**
 * @since 3.0.0
 */
export function getIOValidation<E>(S: Semigroup<E>): Applicative2C<URI, E> & Alt2C<URI, E> {
  const V = getValidationM(S, io.monadIO)
  return {
    URI,
    _E: undefined as any,
    map: V.map,
    ap: V.ap,
    of: V.of,
    alt: V.alt
  }
}

/**
 * @since 2.1.0
 */
export function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E> {
  const F = E.getWitherable(M)

  return {
    URI,
    _E: undefined as any,
    ...getFilterableComposition(io.monadIO, F)
  }
}

/**
 * @since 2.4.0
 */
export function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): (...a: A) => IOEither<E, B> {
  return (...a) => fromEither(f(...a))
}

/**
 * @since 2.4.0
 */
export function chainEitherK<E, A, B>(f: (a: A) => Either<E, B>): (ma: IOEither<E, A>) => IOEither<E, B> {
  return chain(fromEitherK(f))
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: () => E) => <A>(ma: Option<A>) => IOEither<E, A> = (onNone) => (ma) =>
  ma._tag === 'None' ? left(onNone()) : right(ma.value)

/**
 * @since 2.0.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => IOEither<E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (a: A) => (predicate(a) ? right(a) : left(onFalse(a)))

/**
 * @since 2.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (ma: IOEither<E, A>) =>
  pipe(
    ma,
    chain((a) => (predicate(a) ? right(a) : left(onFalse(a))))
  )

/**
 * @since 2.0.0
 */
export const fromEither: <E, A>(ma: E.Either<E, A>) => IOEither<E, A> = (ma) =>
  ma._tag === 'Left' ? left(ma.left) : right(ma.right)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B> =
  /*#__PURE__*/
  (() => EitherT.map(io.monadIO))()

/**
 * @since 3.0.0
 */
export const functorIOEither: Functor2<URI> = {
  URI,
  map
}

/**
 * @since 2.0.0
 */
export const ap: <E, A>(fa: IOEither<E, A>) => <B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B> =
  /*#__PURE__*/
  (() => EitherT.ap(io.monadIO))()

/**
 * @since 3.0.0
 */
export const applyIOEither: Apply2<URI> = {
  ...functorIOEither,
  ap
}

/**
 * @since 2.0.0
 */
export const apFirst: <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, A> = (fb) => (fa) =>
  pipe(
    fa,
    map((a) => () => a),
    ap(fb)
  )

/**
 * @since 2.0.0
 */
export const apSecond = <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>): IOEither<E, B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @since 3.0.0
 */
export const of: <E = never, A = never>(a: A) => IOEither<E, A> = right

/**
 * @since 3.0.0
 */
export const applicativeIOEither: Applicative2<URI> = {
  ...applyIOEither,
  of
}

/**
 * @since 2.0.0
 */
export const chain: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B> =
  /*#__PURE__*/
  (() => EitherT.chain(io.monadIO))()

/**
 * @since 3.0.0
 */
export const monadIOEither: Monad2<URI> = {
  ...applicativeIOEither,
  chain
}

/**
 * @since 2.0.0
 */
export const chainFirst: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @since 2.6.0
 */
export const chainW: <D, A, B>(
  f: (a: A) => IOEither<D, B>
) => <E>(ma: IOEither<E, A>) => IOEither<E | D, B> = chain as any

/**
 * @since 2.6.1
 */
export const chainEitherKW: <D, A, B>(
  f: (a: A) => Either<D, B>
) => <E>(ma: IOEither<E, A>) => IOEither<E | D, B> = chainEitherK as any

/**
 * @since 2.0.0
 */
export const flatten: <E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A> = chain(identity)

/**
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: IOEither<E, A>) => IOEither<G, B> =
  /*#__PURE__*/
  (() => EitherT.bimap(io.monadIO))()

/**
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: IOEither<E, A>) => IOEither<G, A> =
  /*#__PURE__*/
  (() => EitherT.mapLeft(io.monadIO))()

/**
 * @since 3.0.0
 */
export const bifunctorIOEither: Bifunctor2<URI> = {
  URI,
  bimap,
  mapLeft
}

/**
 * @since 2.0.0
 */
export const alt: <E, A>(that: () => IOEither<E, A>) => (fa: IOEither<E, A>) => IOEither<E, A> =
  /*#__PURE__*/
  (() => EitherT.alt(io.monadIO))()

/**
 * @since 3.0.0
 */
export const altIOEither: Alt2<URI> = {
  ...functorIOEither,
  alt
}

/**
 * @since 3.0.0
 */
export const monadIOIOEither: MonadIO2<URI> = {
  ...monadIOEither,
  fromIO: rightIO
}

/**
 * @since 3.0.0
 */
export const monadThrowIOEither: MonadThrow2<URI> = {
  ...monadIOEither,
  throwError: left
}
