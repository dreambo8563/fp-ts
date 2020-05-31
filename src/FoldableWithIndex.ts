/**
 * A `Foldable` with an additional index.
 * A `FoldableWithIndex` instance must be compatible with its `Foldable` instance
 *
 * ```ts
 * reduce(fa, b, f) = reduceWithIndex(fa, b, (_, b, a) => f(b, a))
 * foldMap(M)(fa, f) = foldMapWithIndex(M)(fa, (_, a) => f(a))
 * reduceRight(fa, b, f) = reduceRightWithIndex(fa, b, (_, a, b) => f(a, b))
 * ```
 *
 * @since 2.0.0
 */
import {
  Foldable,
  Foldable1,
  Foldable2,
  Foldable2C,
  Foldable3,
  FoldableComposition,
  getFoldableComposition,
  FoldableComposition11,
  FoldableComposition12,
  FoldableComposition12C,
  FoldableComposition21,
  FoldableComposition2C1,
  FoldableComposition22,
  FoldableComposition22C,
  Foldable4,
  Foldable3C
} from './Foldable'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3, URIS4, Kind4 } from './HKT'
import { Monoid } from './Monoid'
import { pipe } from './function'

/* tslint:disable:readonly-array */

/**
 * @since 3.0.0
 */
export interface FoldableWithIndex<F, I> extends Foldable<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: HKT<F, A>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableWithIndex1<F extends URIS, I> extends Foldable1<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Kind<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Kind<F, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Kind<F, A>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableWithIndex2<F extends URIS2, I> extends Foldable2<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <E>(fa: Kind2<F, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <E>(fa: Kind2<F, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <E>(fa: Kind2<F, E, A>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableWithIndex2C<F extends URIS2, I, E> extends Foldable2C<F, E> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Kind2<F, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Kind2<F, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Kind2<F, E, A>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableWithIndex3<F extends URIS3, I> extends Foldable3<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <R, E>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
}

/**
 * @since 2.2.0
 */
export interface FoldableWithIndex3C<F extends URIS3, I, E> extends Foldable3C<F, E> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <R>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <R>(fa: Kind3<F, R, E, A>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableWithIndex4<F extends URIS4, I> extends Foldable4<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableWithIndexComposition<F, G, FI, GI> extends FoldableComposition<F, G> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: [FI, GI], b: B, a: A) => B) => (fga: HKT<F, HKT<G, A>>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: [FI, GI], a: A) => M) => (fga: HKT<F, HKT<G, A>>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: [FI, GI], a: A, b: B) => B) => (fga: HKT<F, HKT<G, A>>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableWithIndexComposition11<F extends URIS, G extends URIS, FI, GI>
  extends FoldableComposition11<F, G> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: [FI, GI], b: B, a: A) => B) => (fga: Kind<F, Kind<G, A>>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: [FI, GI], a: A) => M) => (fga: Kind<F, Kind<G, A>>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: [FI, GI], a: A, b: B) => B) => (fga: Kind<F, Kind<G, A>>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableWithIndexComposition12<F extends URIS, FI, G extends URIS2, GI>
  extends FoldableComposition12<F, G> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: [FI, GI], b: B, a: A) => B) => <GE>(fga: Kind<F, Kind2<G, GE, A>>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: [FI, GI], a: A) => M) => <GE>(fga: Kind<F, Kind2<G, GE, A>>) => M
  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => <GE>(fga: Kind<F, Kind2<G, GE, A>>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableWithIndexComposition12C<F extends URIS, G extends URIS2, FI, GI, GE>
  extends FoldableComposition12C<F, G, GE> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: [FI, GI], b: B, a: A) => B) => (fga: Kind<F, Kind2<G, GE, A>>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: [FI, GI], a: A) => M) => (fga: Kind<F, Kind2<G, GE, A>>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: [FI, GI], a: A, b: B) => B) => (fga: Kind<F, Kind2<G, GE, A>>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableWithIndexComposition21<F extends URIS2, G extends URIS, FI, GI>
  extends FoldableComposition21<F, G> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: [FI, GI], b: B, a: A) => B) => <FE>(fga: Kind2<F, FE, Kind<G, A>>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: [FI, GI], a: A) => M) => <FE>(fga: Kind2<F, FE, Kind<G, A>>) => M
  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => <FE>(fga: Kind2<F, FE, Kind<G, A>>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableWithIndexComposition2C1<F extends URIS2, G extends URIS, FE, FI, GI>
  extends FoldableComposition2C1<F, G, FE> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: [FI, GI], b: B, a: A) => B) => (fga: Kind2<F, FE, Kind<G, A>>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: [FI, GI], a: A) => M) => (fga: Kind2<F, FE, Kind<G, A>>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: [FI, GI], a: A, b: B) => B) => (fga: Kind2<F, FE, Kind<G, A>>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableWithIndexComposition22<F extends URIS2, G extends URIS2, FI, GI>
  extends FoldableComposition22<F, G> {
  readonly reduceWithIndex: <A, B>(
    b: B,
    f: (i: [FI, GI], b: B, a: A) => B
  ) => <FE, GE>(fga: Kind2<F, FE, Kind2<G, GE, A>>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: [FI, GI], a: A) => M) => <FE, GE>(fga: Kind2<F, FE, Kind2<G, GE, A>>) => M
  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => <FE, GE>(fga: Kind2<F, FE, Kind2<G, GE, A>>) => B
}

/**
 * @since 3.0.0
 */
export interface FoldableWithIndexComposition22C<F extends URIS2, G extends URIS2, GE, FI, GI>
  extends FoldableComposition22C<F, G, GE> {
  readonly reduceWithIndex: <A, B>(
    b: B,
    f: (i: [FI, GI], b: B, a: A) => B
  ) => <FE>(fga: Kind2<F, FE, Kind2<G, GE, A>>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: [FI, GI], a: A) => M) => <FE>(fga: Kind2<F, FE, Kind2<G, GE, A>>) => M
  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => <FE>(fga: Kind2<F, FE, Kind2<G, GE, A>>) => B
}

/* tslint:enable:readonly-array */

/**
 * @since 3.0.0
 */
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS2, GI, GE>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex2C<G, GI, GE>
): FoldableWithIndexComposition22C<F, G, GE, FI, GI>
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS2, GI>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition22<F, G, FI, GI>
export function getFoldableWithIndexComposition<F extends URIS2, FI, FE, G extends URIS, GI>(
  F: FoldableWithIndex2C<F, FI, FE>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition2C1<F, G, FE, FI, GI>
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS, GI>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition21<F, G, FI, GI>
export function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS2, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition12<F, FI, G, GI>
export function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS2, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition12<F, FI, G, GI>
export function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition11<F, G, FI, GI>
export function getFoldableWithIndexComposition<F, FI, G, GI>(
  F: FoldableWithIndex<F, FI>,
  G: FoldableWithIndex<G, GI>
): FoldableWithIndexComposition<F, G, FI, GI>
export function getFoldableWithIndexComposition<F, FI, G, GI>(
  F: FoldableWithIndex<F, FI>,
  G: FoldableWithIndex<G, GI>
): FoldableWithIndexComposition<F, G, FI, GI> {
  const FC = getFoldableComposition(F, G)
  return {
    reduce: FC.reduce,
    foldMap: FC.foldMap,
    reduceRight: FC.reduceRight,
    reduceWithIndex: (b, f) =>
      F.reduceWithIndex(b, (fi, b, ga) =>
        pipe(
          ga,
          G.reduceWithIndex(b, (gi, b, a) => f([fi, gi], b, a))
        )
      ),
    foldMapWithIndex: (M) => {
      const foldMapWithIndexF = F.foldMapWithIndex(M)
      const foldMapWithIndexG = G.foldMapWithIndex(M)
      return (f) =>
        foldMapWithIndexF((fi, ga) =>
          pipe(
            ga,
            foldMapWithIndexG((gi, a) => f([fi, gi], a))
          )
        )
    },
    reduceRightWithIndex: (b, f) =>
      F.reduceRightWithIndex(b, (fi, ga, b) =>
        pipe(
          ga,
          G.reduceRightWithIndex(b, (gi, a, b) => f([fi, gi], a, b))
        )
      )
  }
}
