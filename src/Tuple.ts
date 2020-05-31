/**
 * @since 2.0.0
 */
import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { Comonad2 } from './Comonad'
import { Foldable2 } from './Foldable'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import * as RT from './ReadonlyTuple'
import { Semigroup } from './Semigroup'
import { Semigroupoid2 } from './Semigroupoid'
import { Traversable2 } from './Traversable'
import { Extend2 } from './Extend'

// tslint:disable:readonly-array

/**
 * @since 2.0.0
 */
export const URI = 'Tuple'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: [A, E]
  }
}

/**
 * @since 2.0.0
 */
export const fst: <A, S>(sa: [A, S]) => A = RT.fst

/**
 * @since 2.0.0
 */
export const snd: <A, S>(sa: [A, S]) => S = RT.snd

/**
 * @since 2.0.0
 */
export const swap: <A, S>(sa: [A, S]) => [S, A] = RT.swap as any

/**
 * @since 2.0.0
 */
export const getApply: <S>(S: Semigroup<S>) => Apply2C<URI, S> = RT.getApply as any

/**
 * @since 2.0.0
 */
export const getApplicative: <S>(M: Monoid<S>) => Applicative2C<URI, S> = RT.getApplicative as any

/**
 * @since 2.0.0
 */
export const getChain: <S>(S: Semigroup<S>) => Chain2C<URI, S> = RT.getChain as any

/**
 * @since 2.0.0
 */
export const getMonad: <S>(M: Monoid<S>) => Monad2C<URI, S> = RT.getMonad as any

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: [A, E]) => [B, G] = RT.bimap as any

/**
 * @since 3.0.0
 */
export const pipe: <B, C>(fbc: [C, B]) => <A>(fab: [B, A]) => [C, A] = RT.pipe as any

/**
 * @since 2.0.0
 */
export const duplicate: <E, A>(ma: [A, E]) => [[A, E], E] =
  /*#__PURE__*/
  RT.duplicate as any

/**
 * @since 2.0.0
 */
export const extend: <E, A, B>(f: (wa: [A, E]) => B) => (wa: [A, E]) => [B, E] = RT.extend as any

/**
 * @since 2.6.2
 */
export const extract: <E, A>(wa: [A, E]) => A = RT.extract

/**
 * @since 2.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: [A, E]) => M = RT.foldMap

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: [A, E]) => [B, E] = RT.map as any

/**
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: [A, E]) => [A, G] = RT.mapLeft as any

/**
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: [A, E]) => B = RT.reduce

/**
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: [A, E]) => B = RT.reduceRight

/**
 * @since 3.0.0
 */
export const traverse: Traversable2<URI>['traverse'] = RT.traverse as any

/**
 * @since 3.0.0
 */
export const sequence: Traversable2<URI>['sequence'] = RT.sequence as any

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const semigroupoidTuple: Semigroupoid2<URI> = RT.semigroupoidReadonlyTuple as any

/**
 * @since 3.0.0
 */
export const bifunctorTuple: Bifunctor2<URI> = RT.semigroupoidReadonlyTuple as any

/**
 * @since 3.0.0
 */
export const extendTuple: Extend2<URI> = RT.semigroupoidReadonlyTuple as any

/**
 * @since 3.0.0
 */
export const comonadTuple: Comonad2<URI> = RT.semigroupoidReadonlyTuple as any

/**
 * @since 3.0.0
 */
export const foldableTuple: Foldable2<URI> = RT.semigroupoidReadonlyTuple as any

/**
 * @since 3.0.0
 */
export const traversableTuple: Traversable2<URI> = RT.semigroupoidReadonlyTuple as any
