/**
 * @since 2.0.0
 */
import { Comonad2C } from './Comonad'
import { Functor2 } from './Functor'
import { Monoid } from './Monoid'
import { Extend2C } from './Extend'
import { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const URI = 'Traced'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Traced<E, A>
  }
}

/**
 * @since 2.0.0
 */
export interface Traced<P, A> {
  (p: P): A
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 2.0.0
 */
export const tracks: <P>(M: Monoid<P>) => <A>(f: (a: A) => P) => (wa: Traced<P, A>) => A = (M) => (f) => (wa) =>
  wa(f(wa(M.empty)))

/**
 * Get the current position
 *
 * @since 2.0.0
 */
export const listen: <P, A>(wa: Traced<P, A>) => Traced<P, readonly [A, P]> = (wa) => (p) => [wa(p), p]

/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
export const listens: <P, B>(f: (p: P) => B) => <A>(wa: Traced<P, A>) => Traced<P, readonly [A, B]> = (f) => (wa) => (
  e
) => [wa(e), f(e)]

/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
export const censor: <P>(f: (p: P) => P) => <A>(wa: Traced<P, A>) => Traced<P, A> = (f) => (wa) => (e) => wa(f(e))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Traced<E, A>) => Traced<E, B> = (f) => (fa) => (p) => f(fa(p))

/**
 * @since 3.0.0
 */
export const functorTraced: Functor2<URI> = {
  URI,
  map
}

/**
 * @since 2.0.0
 */
export function getExtend<P>(S: Semigroup<P>): Extend2C<URI, P> {
  return {
    URI,
    _E: undefined as any,
    map,
    extend: (f) => (wa) => (p1) => f((p2) => wa(S.concat(p1, p2)))
  }
}

/**
 * @since 2.0.0
 */
export function getComonad<P>(M: Monoid<P>): Comonad2C<URI, P> {
  const E = getExtend(M)
  return {
    URI,
    _E: undefined as any,
    map,
    extend: E.extend,
    extract: (wa) => wa(M.empty)
  }
}
