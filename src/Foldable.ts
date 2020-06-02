/**
 * @since 2.0.0
 */
import { pipe } from './function'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C } from './Monad'
import { Monoid } from './Monoid'

/**
 * @since 3.0.0
 */
export interface Foldable<F> {
  readonly URI: F
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: HKT<F, A>) => B
}

/**
 * @since 3.0.0
 */
export interface Foldable1<F extends URIS> {
  readonly URI: F
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Kind<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Kind<F, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Kind<F, A>) => B
}

/**
 * @since 3.0.0
 */
export interface Foldable2<F extends URIS2> {
  readonly URI: F
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: Kind2<F, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Kind2<F, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: Kind2<F, E, A>) => B
}

/**
 * @since 3.0.0
 */
export interface Foldable2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Kind2<F, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Kind2<F, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Kind2<F, E, A>) => B
}

/**
 * @since 3.0.0
 */
export interface Foldable3<F extends URIS3> {
  readonly URI: F
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <R, E>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
}

/**
 * @since 3.0.0
 */
export interface Foldable3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <R>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <R>(fa: Kind3<F, R, E, A>) => B
}

/**
 * @since 3.0.0
 */
export interface Foldable4<F extends URIS4> {
  readonly URI: F
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableComposition<F, G> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fga: HKT<F, HKT<G, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fga: HKT<F, HKT<G, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fga: HKT<F, HKT<G, A>>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableComposition11<F extends URIS, G extends URIS> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fga: Kind<F, Kind<G, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fga: Kind<F, Kind<G, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fga: Kind<F, Kind<G, A>>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableComposition12<F extends URIS, G extends URIS2> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fga: Kind<F, Kind2<G, E, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fga: Kind<F, Kind2<G, E, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fga: Kind<F, Kind2<G, E, A>>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableComposition12C<F extends URIS, G extends URIS2, E> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fga: Kind<F, Kind2<G, E, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fga: Kind<F, Kind2<G, E, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fga: Kind<F, Kind2<G, E, A>>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableComposition21<F extends URIS2, G extends URIS> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fga: Kind2<F, E, Kind<G, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fga: Kind2<F, E, Kind<G, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fga: Kind2<F, E, Kind<G, A>>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableComposition2C1<F extends URIS2, G extends URIS, E> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fga: Kind2<F, E, Kind<G, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fga: Kind2<F, E, Kind<G, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fga: Kind2<F, E, Kind<G, A>>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableComposition22<F extends URIS2, G extends URIS2> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <D, E>(fga: Kind2<F, D, Kind2<G, E, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <D, E>(fga: Kind2<F, D, Kind2<G, E, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <D, E>(fga: Kind2<F, D, Kind2<G, E, A>>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableComposition22C<F extends URIS2, G extends URIS2, E> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <D>(fga: Kind2<F, D, Kind2<G, E, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <D>(fga: Kind2<F, D, Kind2<G, E, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <D>(fga: Kind2<F, D, Kind2<G, E, A>>) => B
}

/**
 * Returns the composition of two foldables
 *
 * @example
 * import { getFoldableComposition } from 'fp-ts/lib/Foldable'
 * import { foldableReadonlyArray } from 'fp-ts/lib/ReadonlyArray'
 * import { foldableOption, some, none } from 'fp-ts/lib/Option'
 * import { monoidString } from 'fp-ts/lib/Monoid'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * const F = getFoldableComposition(foldableReadonlyArray, foldableOption)
 * assert.strictEqual(pipe([some('a'), some('b'), some('c')], F.reduce('', monoidString.concat)), 'abc')
 * assert.strictEqual(pipe([some('a'), none, some('c')], F.reduce('', monoidString.concat)), 'ac')
 *
 * @since 3.0.0
 */
export function getFoldableComposition<F extends URIS2, G extends URIS2, E>(
  F: Foldable2<F>,
  G: Foldable2C<G, E>
): FoldableComposition22C<F, G, E>
export function getFoldableComposition<F extends URIS2, G extends URIS2>(
  F: Foldable2<F>,
  G: Foldable2<G>
): FoldableComposition22<F, G>
export function getFoldableComposition<F extends URIS2, G extends URIS, E>(
  F: Foldable2C<F, E>,
  G: Foldable1<G>
): FoldableComposition2C1<F, G, E>
export function getFoldableComposition<F extends URIS2, G extends URIS>(
  F: Foldable2<F>,
  G: Foldable1<G>
): FoldableComposition21<F, G>
export function getFoldableComposition<F extends URIS, G extends URIS2, E>(
  F: Foldable1<F>,
  G: Foldable2C<G, E>
): FoldableComposition12C<F, G, E>
export function getFoldableComposition<F extends URIS, G extends URIS2>(
  F: Foldable1<F>,
  G: Foldable2<G>
): FoldableComposition12<F, G>
export function getFoldableComposition<F extends URIS, G extends URIS>(
  F: Foldable1<F>,
  G: Foldable1<G>
): FoldableComposition11<F, G>
export function getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G>
export function getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G> {
  return {
    reduce: (b, f) => F.reduce(b, (b, ga) => pipe(ga, G.reduce(b, f))),
    foldMap: (M) => {
      const foldMapF = F.foldMap(M)
      const foldMapG = G.foldMap(M)
      return (f) => foldMapF(foldMapG(f))
    },
    reduceRight: (b, f) => F.reduceRight(b, (ga, b) => pipe(ga, G.reduceRight(b, f)))
  }
}

/**
 * Similar to 'reduce', but the result is encapsulated in a monad.
 *
 * Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.
 *
 * @example
 * import { reduceM } from 'fp-ts/lib/Foldable'
 * import { monadOption, some } from 'fp-ts/lib/Option'
 * import { make, foldableTree } from 'fp-ts/lib/Tree'
 *
 * const t = make(1, [make(2, []), make(3, []), make(4, [])])
 * assert.deepStrictEqual(reduceM(monadOption, foldableTree)(t, 0, (b, a) => (a > 2 ? some(b + a) : some(b))), some(7))
 *
 * @since 3.0.0
 */
export function reduceM<M extends URIS3, F extends URIS>(
  M: Monad3<M>,
  F: Foldable1<F>
): <R, E, A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind3<M, R, E, B>) => Kind3<M, R, E, B>
export function reduceM<M extends URIS3, F extends URIS, E>(
  M: Monad3C<M, E>,
  F: Foldable1<F>
): <R, A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind3<M, R, E, B>) => Kind3<M, R, E, B>
export function reduceM<M extends URIS2, F extends URIS>(
  M: Monad2<M>,
  F: Foldable1<F>
): <E, A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind2<M, E, B>) => Kind2<M, E, B>
export function reduceM<M extends URIS2, F extends URIS, E>(
  M: Monad2C<M, E>,
  F: Foldable1<F>
): <A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind2<M, E, B>) => Kind2<M, E, B>
export function reduceM<M extends URIS, F extends URIS>(
  M: Monad1<M>,
  F: Foldable1<F>
): <A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind<M, B>) => Kind<M, B>
export function reduceM<M, F>(
  M: Monad<M>,
  F: Foldable<F>
): <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => HKT<M, B>) => HKT<M, B>
export function reduceM<M, F>(
  M: Monad<M>,
  F: Foldable<F>
): <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => HKT<M, B>) => HKT<M, B> {
  return (fa, b, f) =>
    pipe(
      fa,
      F.reduce(M.of(b), (mb, a) =>
        pipe(
          mb,
          M.chain((b) => f(b, a))
        )
      )
    )
}

/**
 * Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator
 *
 * @example
 * import { intercalate } from 'fp-ts/lib/Foldable'
 * import { monoidString } from 'fp-ts/lib/Monoid'
 * import { make, foldableTree } from 'fp-ts/lib/Tree'
 *
 * const t = make('a', [make('b', []), make('c', []), make('d', [])])
 * assert.strictEqual(intercalate(monoidString, foldableTree)('|', t), 'a|b|c|d')
 *
 * @since 3.0.0
 */
export function intercalate<M, F extends URIS3>(
  M: Monoid<M>,
  F: Foldable3<F>
): <R, E>(sep: M, fm: Kind3<F, R, E, M>) => M
export function intercalate<M, F extends URIS2>(M: Monoid<M>, F: Foldable2<F>): <E>(sep: M, fm: Kind2<F, E, M>) => M
export function intercalate<M, F extends URIS2, E>(M: Monoid<M>, F: Foldable2C<F, E>): (sep: M, fm: Kind2<F, E, M>) => M
export function intercalate<M, F extends URIS>(M: Monoid<M>, F: Foldable1<F>): (sep: M, fm: Kind<F, M>) => M
export function intercalate<M, F>(M: Monoid<M>, F: Foldable<F>): (sep: M, fm: HKT<F, M>) => M
export function intercalate<M, F>(M: Monoid<M>, F: Foldable<F>): (sep: M, fm: HKT<F, M>) => M {
  interface Acc<M> {
    readonly init: boolean
    readonly acc: M
  }
  return (sep, fm) => {
    const go = ({ init, acc }: Acc<M>, x: M): Acc<M> =>
      init ? { init: false, acc: x } : { init: false, acc: M.concat(M.concat(acc, sep), x) }
    return pipe(fm, F.reduce({ init: true, acc: M.empty }, go)).acc
  }
}
