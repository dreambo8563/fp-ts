/**
 * @since 2.4.0
 */
import { Bifunctor2 } from './Bifunctor'
import { Functor2 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2C } from './Monad'
import { MonadTask2C } from './MonadTask'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import * as TH from './These'
import { getTheseM } from './TheseT'

import These = TH.These
import Task = T.Task

const MT =
  /*#__PURE__*/
  getTheseM(T.monadTask)

/**
 * @since 2.4.0
 */
export const URI = 'TaskThese'

/**
 * @since 2.4.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: TaskThese<E, A>
  }
}

/**
 * @since 2.4.0
 */
export interface TaskThese<E, A> extends Task<These<E, A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 2.4.0
 */
export const left: <E = never, A = never>(e: E) => TaskThese<E, A> = MT.left

/**
 * @since 2.4.0
 */
export const right: <E = never, A = never>(a: A) => TaskThese<E, A> = MT.right

/**
 * @since 2.4.0
 */
export const both: <E, A>(e: E, a: A) => TaskThese<E, A> = MT.both

/**
 * @since 2.4.0
 */
export function rightIO<E = never, A = never>(ma: IO<A>): TaskThese<E, A> {
  return rightTask(T.fromIO(ma))
}

/**
 * @since 2.4.0
 */
export function leftIO<E = never, A = never>(me: IO<E>): TaskThese<E, A> {
  return leftTask(T.fromIO(me))
}

/**
 * @since 2.4.0
 */
export const leftTask: <E = never, A = never>(me: Task<E>) => TaskThese<E, A> = MT.leftM

/**
 * @since 2.4.0
 */
export const rightTask: <E = never, A = never>(ma: Task<A>) => TaskThese<E, A> = MT.rightM

/**
 * @since 2.4.0
 */
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A> = T.fromIO

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 2.4.0
 */
export const fold: <E, B, A>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>,
  onBoth: (e: E, a: A) => Task<B>
) => (fa: TaskThese<E, A>) => Task<B> = MT.fold

/* tslint:disable:readonly-array */
/**
 * @since 3.0.0
 */
export const toTuple: <E, A>(e: () => E, a: () => A) => (fa: TaskThese<E, A>) => Task<[E, A]> = MT.toTuple
/* tslint:enable:readonly-array */

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 2.4.0
 */
export const swap: <E, A>(fa: TaskThese<E, A>) => TaskThese<A, E> = MT.swap

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.4.0
 */
export function getSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<TaskThese<E, A>> {
  return T.getSemigroup(TH.getSemigroup<E, A>(SE, SA))
}

/**
 * @since 2.4.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B> = MT.map

/**
 * @since 3.0.0
 */
export const functorTaskThese: Functor2<URI> = {
  URI,
  map
}

/**
 * @since 2.4.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskThese<E, A>) => TaskThese<G, B> = MT.bimap

/**
 * @since 2.4.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskThese<E, A>) => TaskThese<G, A> = MT.mapLeft

/**
 * @since 3.0.0
 */
export const bifunctorTaskThese: Bifunctor2<URI> = {
  URI,
  bimap,
  mapLeft
}

/**
 * @since 2.4.0
 */
export function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> & MonadTask2C<URI, E> {
  const M = MT.getMonad(S)
  return {
    URI,
    _E: M._E,
    map: M.map,
    ap: M.ap,
    of: M.of,
    chain: M.chain,
    fromIO: rightIO,
    fromTask: rightTask
  }
}
