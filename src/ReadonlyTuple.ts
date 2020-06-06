/**
 * @since 2.5.0
 */
import { Applicative, Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Comonad2 } from './Comonad'
import { Foldable2 } from './Foldable'
import * as F from './function'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Semigroupoid2 } from './Semigroupoid'
import { Traversable2 } from './Traversable'
import { Extend2 } from './Extend'

/**
 * @since 2.5.0
 */
export const URI = 'ReadonlyTuple'

/**
 * @since 2.5.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: readonly [A, E]
  }
}

/**
 * @since 2.5.0
 */
export function fst<A, S>(sa: readonly [A, S]): A {
  return sa[0]
}

/**
 * @since 2.5.0
 */
export function snd<A, S>(sa: readonly [A, S]): S {
  return sa[1]
}

/**
 * @since 2.5.0
 */
export function swap<A, S>(sa: readonly [A, S]): readonly [S, A] {
  return [snd(sa), fst(sa)]
}

/**
 * @since 2.5.0
 */
export function getApply<S>(S: Semigroup<S>): Apply2C<URI, S> {
  return {
    URI,
    _E: undefined as any,
    map,
    ap: (fa) => (fab) => [fst(fab)(fst(fa)), S.concat(snd(fab), snd(fa))]
  }
}

const of = <S>(M: Monoid<S>) => <A>(a: A): readonly [A, S] => {
  return [a, M.empty]
}

/**
 * @since 2.5.0
 */
export function getApplicative<S>(M: Monoid<S>): Applicative2C<URI, S> {
  const A = getApply(M)
  return {
    URI,
    _E: A._E,
    map: A.map,
    ap: A.ap,
    of: of(M)
  }
}

/**
 * @since 2.5.0
 */
export function getMonad<S>(M: Monoid<S>): Monad2C<URI, S> {
  return {
    URI,
    _E: undefined as any,
    map: map,
    chain: (f) => (ma) => {
      const [b, s] = f(fst(ma))
      return [b, M.concat(snd(ma), s)]
    },
    of: of(M)
  }
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @since 2.5.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: readonly [A, E]) => readonly [B, G] = (
  f,
  g
) => (fea) => [g(fst(fea)), f(snd(fea))]

/**
 * @since 3.0.0
 */
export const pipe: <B, C>(fbc: readonly [C, B]) => <A>(fab: readonly [B, A]) => readonly [C, A] = (fbc) => (fab) => [
  fst(fbc),
  snd(fab)
]

/**
 * @since 2.5.0
 */
export const extend: <E, A, B>(f: (fa: readonly [A, E]) => B) => (wa: readonly [A, E]) => readonly [B, E] = (f) => (
  wa
) => [f(wa), snd(wa)]

/**
 * @since 2.5.0
 */
export const duplicate: <E, A>(ma: readonly [A, E]) => readonly [readonly [A, E], E] =
  /*#__PURE__*/
  extend(F.identity)

/**
 * @since 2.6.2
 */
export const extract: <E, A>(wa: readonly [A, E]) => A = fst

/**
 * @since 2.5.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: readonly [A, E]) => M = () => (f) => (fa) =>
  f(fst(fa))

/**
 * @since 2.5.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: readonly [A, E]) => readonly [B, E] = (f) => (fa) => [
  f(fst(fa)),
  snd(fa)
]

/**
 * @since 2.5.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: readonly [A, E]) => readonly [A, G] = (f) => (fea) => [
  fst(fea),
  f(snd(fea))
]

/**
 * @since 2.5.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: readonly [A, E]) => B = (b, f) => (fa) =>
  f(b, fst(fa))

/**
 * @since 2.5.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: readonly [A, E]) => B = (b, f) => (fa) =>
  f(fst(fa), b)

/**
 * @since 3.0.0
 */
export const traverse: Traversable2<URI>['traverse'] = <F>(A: Applicative<F>) => <A, B>(f: (a: A) => HKT<F, B>) => <S>(
  as: readonly [A, S]
): HKT<F, readonly [B, S]> => {
  return F.pipe(
    f(fst(as)),
    A.map((b) => [b, snd(as)])
  )
}

/**
 * @since 3.0.0
 */
export const sequence: Traversable2<URI>['sequence'] = <F>(A: Applicative<F>) => <A, S>(
  fas: readonly [HKT<F, A>, S]
): HKT<F, readonly [A, S]> => {
  return F.pipe(
    fst(fas),
    A.map((a) => [a, snd(fas)])
  )
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const semigroupoidReadonlyTuple: Semigroupoid2<URI> = {
  URI,
  pipe
}

/**
 * @since 3.0.0
 */
export const bifunctorReadonlyTuple: Bifunctor2<URI> = {
  URI,
  bimap,
  mapLeft
}

/**
 * @since 3.0.0
 */
export const extendReadonlyTuple: Extend2<URI> = {
  URI,
  map,
  extend
}

/**
 * @since 3.0.0
 */
export const comonadReadonlyTuple: Comonad2<URI> = {
  URI,
  map,
  extend,
  extract
}

/**
 * @since 3.0.0
 */
export const foldableReadonlyTuple: Foldable2<URI> = {
  URI,
  reduce,
  foldMap,
  reduceRight
}

/**
 * @since 3.0.0
 */
export const traversableReadonlyTuple: Traversable2<URI> = {
  URI,
  map,
  reduce,
  foldMap,
  reduceRight,
  traverse,
  sequence
}
