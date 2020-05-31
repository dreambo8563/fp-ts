/**
 * `TaskEither<E, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`. If you want to represent an asynchronous computation that never fails, please see `Task`.
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
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2 } from './Monad'
import { MonadIO2 } from './MonadIO'
import { MonadTask2 } from './MonadTask'
import { MonadThrow2 } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import { getValidationM } from './ValidationT'

import Either = E.Either
import Task = T.Task

const MT =
  /*#__PURE__*/
  (() => EitherT.getEitherM(T.monadTask))()

/**
 * @since 2.0.0
 */
export const URI = 'TaskEither'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: TaskEither<E, A>
  }
}

/**
 * @since 2.0.0
 */
export interface TaskEither<E, A> extends Task<Either<E, A>> {}

/**
 * @since 2.0.0
 */
export const left: <E = never, A = never>(e: E) => TaskEither<E, A> =
  /*#__PURE__*/
  (() => MT.left)()

/**
 * @since 2.0.0
 */
export const right: <E = never, A = never>(a: A) => TaskEither<E, A> =
  /*#__PURE__*/
  (() => EitherT.of(T.applicativeTask))()

/**
 * @since 2.0.0
 */
export function rightIO<E = never, A = never>(ma: IO<A>): TaskEither<E, A> {
  return rightTask(T.fromIO(ma))
}

/**
 * @since 2.0.0
 */
export function leftIO<E = never, A = never>(me: IO<E>): TaskEither<E, A> {
  return leftTask(T.fromIO(me))
}

/**
 * @since 2.0.0
 */
export const rightTask: <E = never, A = never>(ma: Task<A>) => TaskEither<E, A> =
  /*#__PURE__*/
  (() => MT.rightM)()

/**
 * @since 2.0.0
 */
export const leftTask: <E = never, A = never>(me: Task<E>) => TaskEither<E, A> =
  /*#__PURE__*/
  (() => MT.leftM)()

/**
 * @since 2.0.0
 */
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskEither<E, A> =
  /*#__PURE__*/
  (() => T.fromIO)()

/**
 * @since 2.0.0
 */
export const fold: <E, A, B>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>
) => (ma: TaskEither<E, A>) => Task<B> =
  /*#__PURE__*/
  (() => MT.fold)()

/**
 * @since 2.0.0
 */
export const getOrElse: <E, A>(onLeft: (e: E) => Task<A>) => (ma: TaskEither<E, A>) => Task<A> =
  /*#__PURE__*/
  (() => MT.getOrElse)()

/**
 * @since 2.6.0
 */
export const getOrElseW: <E, B>(
  onLeft: (e: E) => Task<B>
) => <A>(ma: TaskEither<E, A>) => Task<A | B> = getOrElse as any

/**
 * @since 2.0.0
 */
export const orElse: <E, A, M>(onLeft: (e: E) => TaskEither<M, A>) => (ma: TaskEither<E, A>) => TaskEither<M, A> =
  /*#__PURE__*/
  (() => MT.orElse)()

/**
 * @since 2.0.0
 */
export const swap: <E, A>(ma: TaskEither<E, A>) => TaskEither<A, E> =
  /*#__PURE__*/
  (() => MT.swap)()

/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>> {
  return T.getSemigroup(E.getSemigroup<E, A>(S))
}

/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>> {
  return T.getSemigroup(E.getApplySemigroup<E, A>(S))
}

/**
 * @since 2.0.0
 */
export function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<TaskEither<E, A>> {
  return {
    concat: getApplySemigroup<E, A>(M).concat,
    empty: right(M.empty)
  }
}

/**
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.
 *
 * Note: `f` should never `throw` errors, they are not caught.
 *
 * @example
 * import { left, right } from 'fp-ts/lib/Either'
 * import { tryCatch } from 'fp-ts/lib/TaskEither'
 *
 * tryCatch(() => Promise.resolve(1), String)().then(result => {
 *   assert.deepStrictEqual(result, right(1))
 * })
 * tryCatch(() => Promise.reject('error'), String)().then(result => {
 *   assert.deepStrictEqual(result, left('error'))
 * })
 *
 * @since 2.0.0
 */
export function tryCatch<E, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => E): TaskEither<E, A> {
  return () => f().then(E.right, (reason) => E.left(onRejected(reason)))
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
  acquire: TaskEither<E, A>,
  use: (a: A) => TaskEither<E, B>,
  release: (a: A, e: Either<E, B>) => TaskEither<E, void>
): TaskEither<E, B> {
  return pipe(
    acquire,
    chain((a) =>
      pipe(
        pipe(use(a), T.map(E.right)),
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
 * Convert a node style callback function to one returning a `TaskEither`
 *
 * **Note**. If the function `f` admits multiple overloadings, `taskify` will pick last one. If you want a different
 * behaviour, add an explicit type annotation
 *
 * ```ts
 * // readFile admits multiple overloadings
 *
 * // const readFile: (a: string) => TaskEither<NodeJS.ErrnoException, Buffer>
 * const readFile = taskify(fs.readFile)
 *
 * const readFile2: (filename: string, encoding: string) => TaskEither<NodeJS.ErrnoException, Buffer> = taskify(
 *   fs.readFile
 * )
 * ```
 *
 * @example
 * import { taskify } from 'fp-ts/lib/TaskEither'
 * import * as fs from 'fs'
 *
 * // const stat: (a: string | Buffer) => TaskEither<NodeJS.ErrnoException, fs.Stats>
 * const stat = taskify(fs.stat)
 * assert.strictEqual(stat.length, 0)
 *
 * @since 2.0.0
 */
export function taskify<L, R>(f: (cb: (e: L | null | undefined, r?: R) => void) => void): () => TaskEither<L, R>
export function taskify<A, L, R>(
  f: (a: A, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A) => TaskEither<L, R>
export function taskify<A, B, L, R>(
  f: (a: A, b: B, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B) => TaskEither<L, R>
export function taskify<A, B, C, L, R>(
  f: (a: A, b: B, c: C, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C) => TaskEither<L, R>
export function taskify<A, B, C, D, L, R>(
  f: (a: A, b: B, c: C, d: D, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D) => TaskEither<L, R>
export function taskify<A, B, C, D, E, L, R>(
  f: (a: A, b: B, c: C, d: D, e: E, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D, e: E) => TaskEither<L, R>
export function taskify<L, R>(f: Function): () => TaskEither<L, R> {
  return function () {
    const args = Array.prototype.slice.call(arguments)
    return () =>
      new Promise((resolve) => {
        const cbResolver = (e: L, r: R) => (e != null ? resolve(E.left(e)) : resolve(E.right(r)))
        f.apply(null, args.concat(cbResolver))
      })
  }
}

/**
 * @since 2.0.0
 */
export function getTaskValidation<E>(S: Semigroup<E>): Applicative2C<URI, E> & Alt2C<URI, E> {
  const V = getValidationM(S, T.monadTask)
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
  const F = getFilterableComposition(T.monadTask, E.getWitherable(M))
  return {
    URI,
    _E: undefined as any,
    map: F.map,
    compact: F.compact,
    separate: F.separate,
    filter: F.filter,
    filterMap: F.filterMap,
    partition: F.partition,
    partitionMap: F.partitionMap
  }
}

/**
 * @since 2.4.0
 */
export function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): (...a: A) => TaskEither<E, B> {
  return (...a) => fromEither(f(...a))
}

/**
 * @since 2.4.0
 */
export function chainEitherK<E, A, B>(f: (a: A) => Either<E, B>): (ma: TaskEither<E, A>) => TaskEither<E, B> {
  return chain(fromEitherK(f))
}

/**
 * @since 2.4.0
 */
export function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): (...a: A) => TaskEither<E, B> {
  return (...a) => fromIOEither(f(...a))
}

/**
 * @since 2.4.0
 */
export function chainIOEitherK<E, A, B>(f: (a: A) => IOEither<E, B>): (ma: TaskEither<E, A>) => TaskEither<E, B> {
  return chain(fromIOEitherK(f))
}

/**
 * Converts a function returning a `Promise` to one returning a `TaskEither`.
 *
 * @since 2.5.0
 */
export function tryCatchK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Promise<B>,
  onRejected: (reason: unknown) => E
): (...a: A) => TaskEither<E, B> {
  return (...a) => tryCatch(() => f(...a), onRejected)
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const fromEither: <E, A>(ma: E.Either<E, A>) => TaskEither<E, A> = (ma) =>
  E.isLeft(ma) ? left(ma.left) : right(ma.right)

/**
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: () => E) => <A>(ma: Option<A>) => TaskEither<E, A> = (onNone) => (ma) =>
  ma._tag === 'None' ? left(onNone()) : right(ma.value)

/**
 * @since 2.0.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => TaskEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => TaskEither<E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (a: A) => (predicate(a) ? right(a) : left(onFalse(a)))

/**
 * @since 2.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (ma: TaskEither<E, A>) =>
  pipe(
    ma,
    chain((a) => (predicate(a) ? right(a) : left(onFalse(a))))
  )

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskEither<E, A>) => TaskEither<E, B> =
  /*#__PURE__*/
  (() => EitherT.map(T.functorTask))()

/**
 * @since 3.0.0
 */
export const functorTaskEither: Functor2<URI> = {
  URI,
  map
}

/**
 * @since 2.0.0
 */
export const ap: <E, A>(fa: TaskEither<E, A>) => <B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B> =
  /*#__PURE__*/
  (() => MT.ap)()

/**
 * @since 3.0.0
 */
export const applyTaskEither: Apply2<URI> = {
  URI,
  map,
  ap
}

/**
 * @since 2.0.0
 */
export const apFirst: <E, B>(fb: TaskEither<E, B>) => <A>(fa: TaskEither<E, A>) => TaskEither<E, A> = (fb) => (fa) =>
  pipe(
    fa,
    map((a) => () => a),
    ap(fb)
  )

/**
 * @since 2.0.0
 */
export const apSecond = <E, B>(fb: TaskEither<E, B>) => <A>(fa: TaskEither<E, A>): TaskEither<E, B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

const of = right

/**
 * @since 3.0.0
 */
export const applicativeTaskEither: Applicative2<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * @since 2.0.0
 */
export const chain: <E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, B> =
  /*#__PURE__*/
  (() => EitherT.chain(T.monadTask))()

/**
 * @since 3.0.0
 */
export const monadTaskEither: Monad2<URI> = {
  URI,
  map,
  ap,
  of,
  chain
}

/**
 * @since 2.6.0
 */
export const chainW: <D, A, B>(
  f: (a: A) => TaskEither<D, B>
) => <E>(ma: TaskEither<E, A>) => TaskEither<E | D, B> = chain as any

/**
 * @since 2.6.1
 */
export const chainEitherKW: <D, A, B>(
  f: (a: A) => Either<D, B>
) => <E>(ma: TaskEither<E, A>) => TaskEither<E | D, B> = chainEitherK as any

/**
 * @since 2.6.1
 */
export const chainIOEitherKW: <D, A, B>(
  f: (a: A) => IOEither<D, B>
) => <E>(ma: TaskEither<E, A>) => TaskEither<E | D, B> = chainIOEitherK as any

/**
 * @since 2.0.0
 */
export const chainFirst: <E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @since 2.0.0
 */
export const flatten: <E, A>(mma: TaskEither<E, TaskEither<E, A>>) => TaskEither<E, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskEither<E, A>) => TaskEither<G, B> =
  /*#__PURE__*/
  (() => MT.bimap)()

/**
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskEither<E, A>) => TaskEither<G, A> =
  /*#__PURE__*/
  (() => MT.mapLeft)()

/**
 * @since 3.0.0
 */
export const bifunctorTaskEither: Bifunctor2<URI> = {
  URI,
  bimap,
  mapLeft
}

/**
 * @since 2.0.0
 */
export const alt: <E, A>(that: () => TaskEither<E, A>) => (fa: TaskEither<E, A>) => TaskEither<E, A> =
  /*#__PURE__*/
  (() => MT.alt)()

/**
 * @since 3.0.0
 */
export const altTaskEither: Alt2<URI> = {
  URI,
  map,
  alt
}

const fromIO = rightIO

/**
 * @since 3.0.0
 */
export const monadIOTaskEither: MonadIO2<URI> = {
  URI,
  map,
  ap,
  of,
  chain,
  fromIO
}

const fromTask = rightTask

/**
 * @since 3.0.0
 */
export const monadTaskTaskEither: MonadTask2<URI> = {
  URI,
  map,
  ap,
  of,
  chain,
  fromIO,
  fromTask
}

const throwError = left

/**
 * @since 3.0.0
 */
export const monadThrowTaskEither: MonadThrow2<URI> = {
  URI,
  map,
  ap,
  of,
  chain,
  throwError
}

/**
 * TODO
 * @since 2.0.0
 */
export const monadTaskEitherSeq: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadTask2<URI> & MonadThrow2<URI> = {
  URI,
  bimap,
  mapLeft,
  map,
  of,
  ap: (fa) => (fab) =>
    pipe(
      fab,
      chain((f) => pipe(fa, map(f)))
    ),
  chain,
  alt,
  fromIO,
  fromTask,
  throwError
}
