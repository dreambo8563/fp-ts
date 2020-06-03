/**
 * @since 3.0.0
 */
import { Alt1 } from './Alt'
import { Alternative1 } from './Alternative'
import { Applicative1 } from './Applicative'
import { apComposition, Apply1 } from './Apply'
import { Compactable1 } from './Compactable'
import {
  Filterable1,
  filterComposition,
  filterMapComposition,
  partitionComposition,
  partitionMapComposition
} from './Filterable'
import { flow, identity, Lazy, pipe } from './function'
import { Functor1 } from './Functor'
import { Monad1 } from './Monad'
import * as O from './Option'
import * as T from './Task'
import { TaskEither } from './TaskEither'

import Option = O.Option
import Task = T.Task

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const URI = 'TaskOption'

/**
 * @since 3.0.0
 */
export type URI = typeof URI

/**
 * @since 3.0.0
 */
export interface TaskOption<A> extends Task<Option<A>> {}

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: TaskOption<A>
  }
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const none: TaskOption<never> =
  /*#__PURE__*/
  T.of(O.none)

/**
 * @since 3.0.0
 */
export const some: <A>(a: A) => TaskOption<A> =
  /*#__PURE__*/
  flow(O.some, T.of)

/**
 * @since 3.0.0
 */
export const fromTask: <A>(as: Task<A>) => TaskOption<A> =
  /*#__PURE__*/
  T.map(O.some)

/**
 * @since 3.0.0
 */
export const fromOption: <A>(ma: Option<A>) => TaskOption<A> =
  /*#__PURE__*/
  T.of

/**
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => TaskOption<NonNullable<A>> =
  /*#__PURE__*/
  flow(O.fromNullable, fromOption)

/**
 * @since 3.0.0
 */
export const fromTaskEither: <A>(ma: TaskEither<any, A>) => TaskOption<A> =
  /*#__PURE__*/
  T.map(O.fromEither)

/**
 * @since 3.0.0
 */
export function tryCatch<A>(f: Lazy<Promise<A>>): TaskOption<A> {
  return () =>
    f().then(
      (a) => O.some(a),
      () => O.none
    )
}

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const fold: <A, B>(onNone: () => Task<B>, onSome: (a: A) => Task<B>) => (as: TaskOption<A>) => Task<B> = (
  onNone,
  onSome
) => T.chain(O.fold(onNone, onSome))

/**
 * @since 3.0.0
 */
export const getOrElse: <A>(onNone: () => Task<A>) => (as: TaskOption<A>) => Task<A> = (onNone) =>
  T.chain(O.fold(onNone, T.of))

/**
 * @since 3.0.0
 */
export const toUndefined: <A>(ma: TaskOption<A>) => Task<A | undefined> =
  /*#__PURE__*/
  T.map(O.toUndefined)

/**
 * @since 3.0.0
 */
export const toNullable: <A>(ma: TaskOption<A>) => Task<A | null> =
  /*#__PURE__*/
  T.map(O.toNullable)

// -------------------------------------------------------------------------------------
// helpers
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function mapNullable<A, B>(f: (a: A) => B | null | undefined): (ma: TaskOption<A>) => TaskOption<B> {
  return T.map(O.mapNullable(f))
}

/**
 * @since 3.0.0
 */
export function fromOptionK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
): (...a: A) => TaskOption<B> {
  return (...a) => fromOption(f(...a))
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B> = flow(O.map, T.map)

/**
 * @since 3.0.0
 */
export const functorTaskOption: Functor1<URI> = {
  URI,
  map
}

/**
 * @since 3.0.0
 */
export const ap: <A>(fa: TaskOption<A>) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B> =
  /*#__PURE__*/
  apComposition(T.applyTask, O.applyOption)

/**
 * @since 3.0.0
 */
export const applyTaskOption: Apply1<URI> = {
  URI,
  map,
  ap
}

/**
 * @since 3.0.0
 */
export const apFirst: <B>(fb: TaskOption<B>) => <A>(fa: TaskOption<A>) => TaskOption<A> = (fb) => (fa) =>
  pipe(
    fa,
    map((a) => () => a),
    ap(fb)
  )

/**
 * @since 3.0.0
 */
export const apSecond = <B>(fb: TaskOption<B>) => <A>(fa: TaskOption<A>): TaskOption<B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @since 3.0.0
 */
export const of: <A>(a: A) => TaskOption<A> =
  /*#__PURE__*/
  flow(O.of, T.of)

/**
 * @since 3.0.0
 */
export const applicativeTaskOption: Applicative1<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * @since 3.0.0
 */
export const chain: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<B> = (f) =>
  T.chain(O.fold(() => none, f))

/**
 * @since 3.0.0
 */
export const monadTaskOption: Monad1<URI> = {
  URI,
  map,
  ap,
  of,
  chain
}

/**
 * @since 2.0.0
 */
export const chainFirst: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @since 2.0.0
 */
export const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @since 3.0.0
 */
export const chainTaskK: <A, B>(f: (a: A) => Task<B>) => (ma: TaskOption<A>) => TaskOption<B> = (f) =>
  chain(flow(f, fromTask))

/**
 * @since 3.0.0
 */
export const chainOptionK: <A, B>(f: (a: A) => Option<B>) => (ma: TaskOption<A>) => TaskOption<B> = (f) =>
  T.map(O.chain(f))

/**
 * @since 3.0.0
 */
export const alt: <A>(that: () => TaskOption<A>) => (fa: TaskOption<A>) => TaskOption<A> = (that) =>
  T.chain(O.fold(that, flow(O.some, T.of)))

/**
 * @since 3.0.0
 */
export const altTaskOption: Alt1<URI> = {
  URI,
  map,
  alt
}

/**
 * @since 3.0.0
 */
export const zero: Alternative1<URI>['zero'] = () => none

/**
 * @since 3.0.0
 */
export const alternativeTaskOption: Alternative1<URI> = {
  URI,
  map,
  ap,
  of,
  alt,
  zero
}

/**
 * @since 3.0.0
 */
export const compact: Compactable1<URI>['compact'] =
  /*#__PURE__*/
  T.map(O.compact)

/**
 * @since 3.0.0
 */
export const separate: Compactable1<URI>['separate'] = (fge) => ({
  left: pipe(fge, map(O.getLeft), compact),
  right: pipe(fge, map(O.getRight), compact)
})

/**
 * @since 3.0.0
 */
export const compactableTaskOption: Compactable1<URI> = {
  URI,
  compact,
  separate
}

/**
 * @since 3.0.0
 */
export const filter: Filterable1<URI>['filter'] =
  /*#__PURE__*/
  filterComposition(T.functorTask, O.filterableOption)

/**
 * @since 3.0.0
 */
export const filterMap: Filterable1<URI>['filterMap'] =
  /*#__PURE__*/
  filterMapComposition(T.functorTask, O.filterableOption)

/**
 * @since 3.0.0
 */
export const partition: Filterable1<URI>['partition'] =
  /*#__PURE__*/
  partitionComposition(T.functorTask, O.filterableOption)

/**
 * @since 3.0.0
 */
export const partitionMap: Filterable1<URI>['partitionMap'] =
  /*#__PURE__*/
  partitionMapComposition(T.functorTask, O.filterableOption)

/**
 * @since 3.0.0
 */
export const filterableTaskOption: Filterable1<URI> = {
  URI,
  compact,
  separate,
  map,
  filter,
  filterMap,
  partition,
  partitionMap
}
