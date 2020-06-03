/**
 * @since 2.0.0
 */
import { Functor2 } from './Functor'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'

/**
 * @since 2.0.0
 */
export const URI = 'Writer'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Writer<E, A>
  }
}

/**
 * @since 2.0.0
 */
export interface Writer<W, A> {
  (): readonly [A, W]
}

/**
 * @since 2.0.0
 */
export const evaluate: <W, A>(fa: Writer<W, A>) => A = (fa) => fa()[0]

/**
 * @since 2.0.0
 */
export const execute: <W, A>(fa: Writer<W, A>) => W = (fa) => fa()[1]

/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
export const tell: <W>(w: W) => Writer<W, void> = (w) => () => [undefined, w]

/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
export const listen: <W, A>(fa: Writer<W, A>) => Writer<W, readonly [A, W]> = (fa) => () => {
  const [a, w] = fa()
  return [[a, w], w]
}

/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
export const pass: <W, A>(fa: Writer<W, readonly [A, (w: W) => W]>) => Writer<W, A> = (fa) => () => {
  const [[a, f], w] = fa()
  return [a, f(w)]
}

/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
export const listens: <W, B>(f: (w: W) => B) => <A>(fa: Writer<W, A>) => Writer<W, readonly [A, B]> = (f) => (
  fa
) => () => {
  const [a, w] = fa()
  return [[a, f(w)], w]
}

/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
export const censor: <W>(f: (w: W) => W) => <A>(fa: Writer<W, A>) => Writer<W, A> = (f) => (fa) => () => {
  const [a, w] = fa()
  return [a, f(w)]
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Writer<E, A>) => Writer<E, B> = (f) => (fa) => () => {
  const [a, w] = fa()
  return [f(a), w]
}

/**
 * @since 3.0.0
 */
export const functorWriter: Functor2<URI> = {
  URI,
  map
}

/**
 * @since 2.0.0
 */
export function getMonad<W>(M: Monoid<W>): Monad2C<URI, W> {
  return {
    URI,
    _E: undefined as any,
    map,
    ap: (fa) => (fab) => () => {
      const [f, w1] = fab()
      const [a, w2] = fa()
      return [f(a), M.concat(w1, w2)]
    },
    of: (a) => () => [a, M.empty],
    chain: (f) => (fa) => () => {
      const [a, w1] = fa()
      const [b, w2] = f(a)()
      return [b, M.concat(w1, w2)]
    }
  }
}
