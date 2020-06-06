/**
 * `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent an asynchronous computation that may fail, please see `TaskEither`.
 *
 * @since 2.0.0
 */
import { Applicative1 } from './Applicative'
import { Apply1 } from './Apply'
import { identity, pipe } from './function'
import { Functor1 } from './Functor'
import { IO } from './IO'
import { Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import { MonadTask1 } from './MonadTask'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'

/**
 * @since 2.0.0
 */
export const URI = 'Task'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Task<A>
  }
}

/**
 * @since 2.0.0
 */
export interface Task<A> {
  (): Promise<A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export function delay(millis: number): <A>(ma: Task<A>) => Task<A> {
  return (ma) => () =>
    new Promise((resolve) => {
      setTimeout(() => {
        // tslint:disable-next-line: no-floating-promises
        ma().then(resolve)
      }, millis)
    })
}

/**
 * @since 2.0.0
 */
export function fromIO<A>(ma: IO<A>): Task<A> {
  return () => Promise.resolve(ma())
}

/**
 * @since 2.4.0
 */
export function fromIOK<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>): (...a: A) => Task<B> {
  return (...a) => fromIO(f(...a))
}

// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const never: Task<never> = () => new Promise((_) => undefined)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export function getSemigroup<A>(S: Semigroup<A>): Semigroup<Task<A>> {
  return {
    concat: (x, y) => () => x().then((rx) => y().then((ry) => S.concat(rx, ry)))
  }
}

/**
 * @since 2.0.0
 */
export function getMonoid<A>(M: Monoid<A>): Monoid<Task<A>> {
  return {
    concat: getSemigroup(M).concat,
    empty: of(M.empty)
  }
}

/**
 * Note: uses `Promise.race` internally
 *
 * @since 2.0.0
 */
export function getRaceMonoid<A = never>(): Monoid<Task<A>> {
  return {
    concat: (x, y) => () => Promise.race([x(), y()]),
    empty: never
  }
}

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B> = (f) => (fa) => () => fa().then(f)

/**
 * @since 3.0.0
 */
export const functorTask: Functor1<URI> = {
  URI,
  map
}

/**
 * @since 2.0.0
 */
export const ap: <A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B> = (fa) => (fab) => () =>
  Promise.all([fab(), fa()]).then(([f, a]) => f(a))

/**
 * @since 3.0.0
 */
export const applyTask: Apply1<URI> = {
  URI,
  map,
  ap
}

/**
 * @since 2.0.0
 */
export const apFirst: <B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<A> = (fb) => (fa) =>
  pipe(
    fa,
    map((a) => () => a),
    ap(fb)
  )

/**
 * @since 2.0.0
 */
export const apSecond = <B>(fb: Task<B>) => <A>(fa: Task<A>): Task<B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @since 2.0.0
 */
export function of<A>(a: A): Task<A> {
  return () => Promise.resolve(a)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const applicativeTaskPar: Applicative1<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const applicativeTaskSeq: Applicative1<URI> = {
  URI,
  map,
  ap: (fa) => (fab) => () => fab().then((f) => fa().then((a) => f(a))),
  of
}

/**
 * @since 2.0.0
 */
export const chain: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<B> = (f) => (ma) => () =>
  ma().then((a) => f(a)())

/**
 * @since 3.0.0
 */
export const monadTask: Monad1<URI> = {
  URI,
  map,
  of,
  chain
}

/**
 * @since 2.0.0
 */
export const chainFirst: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @since 2.0.0
 */
export const flatten: <A>(mma: Task<Task<A>>) => Task<A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @since 2.4.0
 */
export function chainIOK<A, B>(f: (a: A) => IO<B>): (ma: Task<A>) => Task<B> {
  return chain(fromIOK(f))
}

/**
 * @since 3.0.0
 */
export const monadIOTask: MonadIO1<URI> = {
  URI,
  map,
  of,
  chain,
  fromIO
}

/**
 * @since 3.0.0
 */
export const monadTaskTask: MonadTask1<URI> = {
  URI,
  map,
  of,
  chain,
  fromIO,
  fromTask: identity
}
