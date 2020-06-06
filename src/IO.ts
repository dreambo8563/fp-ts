/**
 * `IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
 * type `A` and **never fails**. If you want to represent a synchronous computation that may fail, please see
 * `IOEither`.
 *
 * @since 2.0.0
 */
import { identity, pipe } from './function'
import { Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Functor1 } from './Functor'
import { Apply1 } from './Apply'
import { Applicative1 } from './Applicative'

/**
 * @since 2.0.0
 */
export const URI = 'IO'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: IO<A>
  }
}

/**
 * @since 2.0.0
 */
export interface IO<A> {
  (): A
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export function getSemigroup<A>(S: Semigroup<A>): Semigroup<IO<A>> {
  return {
    concat: (x, y) => () => S.concat(x(), y())
  }
}

/**
 * @since 2.0.0
 */
export const of = <A>(a: A): IO<A> => () => a

/**
 * @since 2.0.0
 */
export function getMonoid<A>(M: Monoid<A>): Monoid<IO<A>> {
  return {
    concat: getSemigroup(M).concat,
    empty: of(M.empty)
  }
}

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B> = (f) => (fa) => () => f(fa())

/**
 * @since 3.0.0
 */
export const functorIO: Functor1<URI> = {
  URI,
  map
}

/**
 * @since 2.0.0
 */
export const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B> = (fa) => (fab) => () => fab()(fa())

/**
 * @since 3.0.0
 */
export const applyIO: Apply1<URI> = {
  URI,
  map,
  ap
}

/**
 * @since 2.0.0
 */
export const apFirst: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<A> = (fb) => (fa) =>
  pipe(
    fa,
    map((a) => () => a),
    ap(fb)
  )

/**
 * @since 2.0.0
 */
export const apSecond = <B>(fb: IO<B>) => <A>(fa: IO<A>): IO<B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @since 3.0.0
 */
export const applicativeIO: Applicative1<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * @since 2.0.0
 */
export const chain: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<B> = (f) => (ma) => () => f(ma())()

/**
 * @since 3.0.0
 */
export const monadIO: Monad1<URI> = {
  URI,
  map,
  of,
  chain
}

/**
 * @since 2.0.0
 */
export const chainFirst: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @since 2.0.0
 */
export const flatten: <A>(mma: IO<IO<A>>) => IO<A> = chain(identity)

/**
 * @since 3.0.0
 */
export const fromIO: <A>(fa: IO<A>) => IO<A> = identity

/**
 * @since 3.0.0
 */
export const monadIOIO: MonadIO1<URI> = {
  URI,
  map,
  of,
  chain,
  fromIO
}
