/**
 * @since 2.0.0
 */
import { Category2 } from './Category'
import * as F from './function'
import * as I from './Identity'
import { Monad2 } from './Monad'
import { Monoid } from './Monoid'
import { Profunctor2 } from './Profunctor'
import * as ReaderT from './ReaderT'
import { Semigroup } from './Semigroup'
import { Functor2 } from './Functor'
import { Apply2 } from './Apply'
import { Applicative2 } from './Applicative'
import { Semigroupoid2 } from './Semigroupoid'

/**
 * @since 2.0.0
 */
export const URI = 'Reader'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Reader<E, A>
  }
}

/**
 * @since 2.0.0
 */
export interface Reader<R, A> {
  (r: R): A
}

/**
 * Reads the current context
 *
 * @since 2.0.0
 */
export const ask: <R>() => Reader<R, R> = () => I.of

/**
 * Projects a value from the global context in a Reader
 *
 * @since 2.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => Reader<R, A> =
  /*#__PURE__*/
  ReaderT.asks(I.monadIdentity)

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 2.0.0
 */
export const local: <Q, R>(f: (d: Q) => R) => <A>(ma: Reader<R, A>) => Reader<Q, A> = (f) => (ma) => (q) => ma(f(q))

/**
 * @since 2.0.0
 */
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<Reader<R, A>> {
  return {
    concat: (x, y) => (e) => S.concat(x(e), y(e))
  }
}

/**
 * @since 2.0.0
 */
export function getMonoid<R, A>(M: Monoid<A>): Monoid<Reader<R, A>> {
  return {
    concat: getSemigroup<R, A>(M).concat,
    empty: () => M.empty
  }
}

/**
 * @since 2.0.0
 */
export const of: <R, A>(a: A) => Reader<R, A> =
  /*#__PURE__*/
  ReaderT.of(I.monadIdentity)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B> =
  /*#__PURE__*/
  ReaderT.map(I.monadIdentity)

/**
 * @since 3.0.0
 */
export const functorReader: Functor2<URI> = {
  URI,
  map
}

/**
 * @since 2.0.0
 */
export const ap: <R, A>(fa: Reader<R, A>) => <B>(fab: Reader<R, (a: A) => B>) => Reader<R, B> =
  /*#__PURE__*/
  ReaderT.ap(I.monadIdentity)

/**
 * @since 3.0.0
 */
export const applyReader: Apply2<URI> = {
  URI,
  map,
  ap
}

/**
 * @since 2.0.0
 */
export const apFirst = <R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>): Reader<R, A> =>
  F.pipe(
    fa,
    map((a) => (_: B) => a),
    ap(fb)
  )

/**
 * @since 2.0.0
 */
export const apSecond = <R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>): Reader<R, B> =>
  F.pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @since 3.0.0
 */
export const applicativeReader: Applicative2<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * @since 2.0.0
 */
export const chain: <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, B> =
  /*#__PURE__*/
  ReaderT.chain(I.monadIdentity)

/**
 * @since 3.0.0
 */
export const monadReader: Monad2<URI> = {
  URI,
  map,
  ap,
  of,
  chain
}

/**
 * @since 2.0.0
 */
export const chainFirst: <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, A> = (f) =>
  chain((a) =>
    F.pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @since 2.6.0
 */
export const chainW: <A, Q, B>(f: (a: A) => Reader<Q, B>) => <R>(ma: Reader<R, A>) => Reader<R & Q, B> = chain as any

/**
 * @since 2.0.0
 */
export const flatten: <R, A>(mma: Reader<R, Reader<R, A>>) => Reader<R, A> = chain(F.identity)

/**
 * @since 2.0.0
 */
export const promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Reader<E, A>) => Reader<D, B> = (f, g) => (
  fea
) => (a) => g(fea(f(a)))

/**
 * @since 3.0.0
 */
export const profunctorReader: Profunctor2<URI> = {
  URI,
  map,
  promap
}

/**
 * @since 2.0.0
 */
export const pipe: <B, C>(fbc: Reader<B, C>) => <A>(fab: Reader<A, B>) => Reader<A, C> = (fbc) => (fab) => (a) =>
  fbc(fab(a))

/**
 * @since 3.0.0
 */
export const semigroupoidReader: Semigroupoid2<URI> = {
  URI,
  pipe
}

/**
 * @since 3.0.0
 */
export const categoryReader: Category2<URI> = {
  URI,
  pipe,
  id: () => F.identity
}
