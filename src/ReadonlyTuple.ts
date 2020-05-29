/**
 * @since 2.5.0
 */
import { Applicative, Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { Comonad2 } from './Comonad'
import { Foldable2 } from './Foldable'
import * as F from './function'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Semigroupoid2 } from './Semigroupoid'
import { Traversable2 } from './Traversable'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly ReadonlyTuple: readonly [A, E]
  }
}

/**
 * @since 2.5.0
 */
export const URI = 'ReadonlyTuple'

/**
 * @since 2.5.0
 */
export type URI = typeof URI

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
  return {
    ...getApply(M),
    of: of(M)
  }
}

/**
 * @since 2.5.0
 */
export function getChain<S>(S: Semigroup<S>): Chain2C<URI, S> {
  return {
    ...getApply(S),
    chain: (f) => (ma) => {
      const [b, s] = f(fst(ma))
      return [b, S.concat(snd(ma), s)]
    }
  }
}

/**
 * @since 2.5.0
 */
export function getMonad<S>(M: Monoid<S>): Monad2C<URI, S> {
  return {
    ...getChain(M),
    of: of(M)
  }
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

const extend_: <E, A, B>(wa: readonly [A, E], f: (wa: readonly [A, E]) => B) => readonly [B, E] = (ae, f) => [
  f(ae),
  snd(ae)
]

const reduce_: <E, A, B>(fa: readonly [A, E], b: B, f: (b: B, a: A) => B) => B = (ae, b, f) => f(b, fst(ae))

const foldMap_: <M>(M: Monoid<M>) => <E, A>(fa: readonly [A, E], f: (a: A) => M) => M = (_) => (ae, f) => f(fst(ae))

const reduceRight_: <E, A, B>(fa: readonly [A, E], b: B, f: (a: A, b: B) => B) => B = (ae, b, f) => f(fst(ae), b)

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
export const duplicate: <E, A>(ma: readonly [A, E]) => readonly [readonly [A, E], E] = (ma) => extend_(ma, F.identity)

/**
 * @since 2.5.0
 */
export const extend: <E, A, B>(f: (fa: readonly [A, E]) => B) => (wa: readonly [A, E]) => readonly [B, E] = (f) => (
  ma
) => extend_(ma, f)

/**
 * @since 2.6.2
 */
export const extract: <E, A>(wa: readonly [A, E]) => A = fst

/**
 * @since 2.5.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: readonly [A, E]) => M = (M) => {
  const foldMapM = foldMap_(M)
  return (f) => (fa) => foldMapM(fa, f)
}

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
  reduce_(fa, b, f)

/**
 * @since 2.5.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: readonly [A, E]) => B = (b, f) => (fa) =>
  reduceRight_(fa, b, f)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.5.0
 */
export const readonlyTuple: Semigroupoid2<URI> &
  Bifunctor2<URI> &
  Comonad2<URI> &
  Foldable2<URI> &
  Traversable2<URI> = {
  URI,
  pipe,
  map,
  bimap,
  mapLeft,
  extract,
  extend: extend_,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  traverse: <F>(A: Applicative<F>) => <A, S, B>(
    as: readonly [A, S],
    f: (a: A) => HKT<F, B>
  ): HKT<F, readonly [B, S]> => {
    return F.pipe(
      f(fst(as)),
      A.map((b) => [b, snd(as)])
    )
  },
  sequence: <F>(A: Applicative<F>) => <A, S>(fas: readonly [HKT<F, A>, S]): HKT<F, readonly [A, S]> => {
    return F.pipe(
      fst(fas),
      A.map((a) => [a, snd(fas)])
    )
  }
}
