/**
 * @since 2.0.0
 */
import { Functor2 } from './Functor'
import { monadIdentity } from './Identity'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { getWriterM } from './WriterT'

const MT =
  /*#__PURE__*/
  getWriterM(monadIdentity)

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
export const evalWriter: <W, A>(fa: Writer<W, A>) => A =
  /*#__PURE__*/
  (() => MT.evalWriter)()

/**
 * @since 2.0.0
 */
export const execWriter: <W, A>(fa: Writer<W, A>) => W =
  /*#__PURE__*/
  (() => MT.execWriter)()

/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
export const tell: <W>(w: W) => Writer<W, void> =
  /*#__PURE__*/
  (() => MT.tell)()

/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
export const listen: <W, A>(fa: Writer<W, A>) => Writer<W, readonly [A, W]> =
  /*#__PURE__*/
  (() => MT.listen)()

/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
export const pass: <W, A>(fa: Writer<W, readonly [A, (w: W) => W]>) => Writer<W, A> =
  /*#__PURE__*/
  (() => MT.pass)()

/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
export function listens<W, B>(f: (w: W) => B): <A>(fa: Writer<W, A>) => Writer<W, readonly [A, B]> {
  return (fa) => MT.listens(fa, f)
}

/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
export function censor<W>(f: (w: W) => W): <A>(fa: Writer<W, A>) => Writer<W, A> {
  return (fa) => MT.censor(fa, f)
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Writer<E, A>) => Writer<E, B> =
  /*#__PURE__*/
  (() => MT.map)()

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
  const _ = MT.getMonad(M)
  return {
    URI,
    _E: undefined as any,
    map: _.map,
    ap: _.ap,
    of: _.of,
    chain: _.chain
  }
}
