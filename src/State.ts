/**
 * The `State` monad is a synonym for the `StateT` monad transformer, applied to the `Identity` monad.
 *
 * @since 2.0.0
 */
import { Applicative2 } from './Applicative'
import { Apply2 } from './Apply'
import { identity, pipe } from './function'
import { Functor2 } from './Functor'
import { Monad2 } from './Monad'

/**
 * @since 2.0.0
 */
export const URI = 'State'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: State<E, A>
  }
}

/**
 * @since 2.0.0
 */
export interface State<S, A> {
  (s: S): readonly [A, S]
}

/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 3.0.0
 */
export const evaluate: <S>(s: S) => <A>(ma: State<S, A>) => A = (s) => (ma) => ma(s)[0]

/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 3.0.0
 */
export const execute: <S>(s: S) => <A>(ma: State<S, A>) => S = (s) => (ma) => ma(s)[1]

/**
 * Get the current state
 *
 * @since 2.0.0
 */
export const get: <S>() => State<S, S> = () => (s) => [s, s]

/**
 * Set the state
 *
 * @since 2.0.0
 */
export const put: <S>(s: S) => State<S, void> = (s) => () => [undefined, s]

/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export const modify: <S>(f: (s: S) => S) => State<S, void> = (f) => (s) => [undefined, f(s)]

/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export const gets: <S, A>(f: (s: S) => A) => State<S, A> = (f) => (s) => [f(s), s]

/**
 * @since 2.0.0
 */
export const of: <S, A>(a: A) => State<S, A> = (a) => (s) => [a, s]

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const ap: <E, A>(fa: State<E, A>) => <B>(fab: State<E, (a: A) => B>) => State<E, B> = (fa) => (fab) => (s1) => {
  const [f, s2] = fab(s1)
  const [a, s3] = fa(s2)
  return [f(a), s3]
}

/**
 * @since 2.0.0
 */
export const apFirst = <E, B>(fb: State<E, B>) => <A>(fa: State<E, A>): State<E, A> =>
  pipe(
    fa,
    map((a) => (_: B) => a),
    ap(fb)
  )

/**
 * @since 2.0.0
 */
export const apSecond = <E, B>(fb: State<E, B>) => <A>(fa: State<E, A>): State<E, B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @since 2.0.0
 */
export const chain: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, B> = (f) => (ma) => (s1) => {
  const [a, s2] = ma(s1)
  return f(a)(s2)
}

/**
 * @since 2.0.0
 */
export const chainFirst: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @since 2.0.0
 */
export const flatten: <E, A>(mma: State<E, State<E, A>>) => State<E, A> = chain(identity)

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: State<E, A>) => State<E, B> = (f) => (fa) => (s1) => {
  const [a, s2] = fa(s1)
  return [f(a), s2]
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const functorState: Functor2<URI> = {
  URI,
  map
}

/**
 * @since 3.0.0
 */
export const applyState: Apply2<URI> = {
  URI,
  map,
  ap
}

/**
 * @since 3.0.0
 */
export const applicativeState: Applicative2<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * @since 3.0.0
 */
export const monadState: Monad2<URI> = {
  URI,
  map,
  ap,
  of,
  chain
}
