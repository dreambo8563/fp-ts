/**
 * @since 2.4.0
 */
import { Bifunctor2 } from './Bifunctor'
import { flow, pipe } from './function'
import { Functor2 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2C } from './Monad'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import * as TH from './These'
import * as TheseT from './TheseT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import These = TH.These
import Task = T.Task

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
export const left: <E = never, A = never>(e: E) => TaskThese<E, A> = flow(TH.left, T.of)

/**
 * @since 2.4.0
 */
export const right: <E = never, A = never>(a: A) => TaskThese<E, A> = flow(TH.right, T.of)

/**
 * @since 2.4.0
 */
export const both: <E, A>(e: E, a: A) => TaskThese<E, A> = flow(TH.both, T.of)

/**
 * @since 2.4.0
 */
export const rightTask: <E = never, A = never>(ma: Task<A>) => TaskThese<E, A> = T.map(TH.right)

/**
 * @since 2.4.0
 */
export const leftTask: <E = never, A = never>(me: Task<E>) => TaskThese<E, A> = T.map(TH.left)

/**
 * @since 2.4.0
 */
export const rightIO: <E = never, A = never>(ma: IO<A>) => TaskThese<E, A> = flow(T.fromIO, rightTask)

/**
 * @since 2.4.0
 */
export const leftIO: <E = never, A = never>(me: IO<E>) => TaskThese<E, A> = flow(T.fromIO, leftTask)

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
) => (fa: TaskThese<E, A>) => Task<B> = flow(TH.fold, T.chain)

/**
 * @since 3.0.0
 */
export const toTuple: <E, A>(e: () => E, a: () => A) => (fa: TaskThese<E, A>) => Task<readonly [E, A]> = flow(
  TH.toTuple,
  T.map
)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 2.4.0
 */
export const swap: <E, A>(fa: TaskThese<E, A>) => TaskThese<A, E> =
  /*#__PURE__*/
  T.map(TH.swap)

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
export const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B> = (f) => T.map(TH.map(f))

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
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskThese<E, A>) => TaskThese<G, B> = (f, g) =>
  T.map(TH.bimap(f, g))

/**
 * @since 2.4.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskThese<E, A>) => TaskThese<G, A> = (f) =>
  T.map(TH.mapLeft(f))

/**
 * @since 3.0.0
 */
export const bifunctorTaskThese: Bifunctor2<URI> = {
  URI,
  bimap,
  mapLeft
}

/**
 * @since 3.0.0
 */
export function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> {
  const chain = TheseT.chain(T.monadTask)(S)
  return {
    URI,
    _E: undefined as any,
    map,
    ap: (fa) => (fab) =>
      pipe(
        fab,
        chain((f) => pipe(fa, map(f)))
      ),
    of: right,
    chain
  }
}
