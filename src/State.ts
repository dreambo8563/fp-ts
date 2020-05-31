/**
 * The `State` monad is a synonym for the `StateT` monad transformer, applied to the `Identity` monad.
 *
 * @since 2.0.0
 */
import { monadIdentity } from './Identity'
import { Monad2 } from './Monad'
import { getStateM } from './StateT'
import { identity, pipe } from './function'
import { Functor2 } from './Functor'
import { Apply2 } from './Apply'
import { Applicative2 } from './Applicative'

const MT =
  /*#__PURE__*/
  getStateM(monadIdentity)

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

/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
export interface State<S, A> {
  (s: S): [A, S]
}
/* tslint:enable:readonly-array */

/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 2.0.0
 */
export const evalState: <S, A>(ma: State<S, A>, s: S) => A = MT.evalState

/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 2.0.0
 */
export const execState: <S, A>(ma: State<S, A>, s: S) => S = MT.execState

/**
 * Get the current state
 *
 * @since 2.0.0
 */
export const get: <S>() => State<S, S> = MT.get

/**
 * Set the state
 *
 * @since 2.0.0
 */
export const put: <S>(s: S) => State<S, void> = MT.put

/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export const modify: <S>(f: (s: S) => S) => State<S, void> = MT.modify

/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export const gets: <S, A>(f: (s: S) => A) => State<S, A> = MT.gets

/**
 * @since 2.0.0
 */
export const of: <S, A>(a: A) => State<S, A> = MT.of

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const ap: <E, A>(fa: State<E, A>) => <B>(fab: State<E, (a: A) => B>) => State<E, B> = MT.ap

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
export const chain: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, B> = MT.chain

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
export const map: <A, B>(f: (a: A) => B) => <E>(fa: State<E, A>) => State<E, B> = MT.map

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
