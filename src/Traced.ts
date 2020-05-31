/**
 * @since 2.0.0
 */
import { Comonad2C } from './Comonad'
import { Functor2 } from './Functor'
import { Monoid } from './Monoid'

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

/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 2.0.0
 */
export function tracks<P, A>(M: Monoid<P>, f: (a: A) => P): (wa: Traced<P, A>) => A {
  return (wa) => wa(f(wa(M.empty)))
}

// tslint:disable:readonly-array
/**
 * Get the current position
 *
 * @since 2.0.0
 */
export function listen<P, A>(wa: Traced<P, A>): Traced<P, [A, P]> {
  return (e) => [wa(e), e]
}
// tslint:enable:readonly-array

// tslint:disable:readonly-array
/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
export function listens<P, B>(f: (p: P) => B): <A>(wa: Traced<P, A>) => Traced<P, [A, B]> {
  return (wa) => (e) => [wa(e), f(e)]
}
// tslint:enable:readonly-array

/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
export function censor<P>(f: (p: P) => P): <A>(wa: Traced<P, A>) => Traced<P, A> {
  return (wa) => (e) => wa(f(e))
}

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
export function getComonad<P>(M: Monoid<P>): Comonad2C<URI, P> {
  return {
    URI,
    _E: undefined as any,
    map,
    extend: (f) => (wa) => (p1) => f((p2) => wa(M.concat(p1, p2))),
    extract: (wa) => wa(M.empty)
  }
}
