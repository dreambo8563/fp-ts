/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs
 *
 * @since 2.0.0
 */
import {
  Compactable,
  Compactable1,
  Compactable2,
  Compactable2C,
  Compactable3,
  Compactable3C,
  Compactable4,
  Separated
} from './Compactable'
import { Either } from './Either'
import { pipe, Predicate, Refinement, flow } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { getLeft, getRight, Option } from './Option'

/**
 * @since 3.0.0
 */
export interface Filter<F> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => HKT<F, B>
  <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => HKT<F, A>
}

/**
 * @since 3.0.0
 */
export interface Partition<F> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, B>>
  <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, A>>
}

/**
 * @since 3.0.0
 */
export interface Filterable<F> extends Functor<F>, Compactable<F> {
  /**
   * Partition a data structure based on an either predicate.
   */
  readonly partitionMap: <A, B, C>(f: (a: A) => Either<B, C>) => (fa: HKT<F, A>) => Separated<HKT<F, B>, HKT<F, C>>
  /**
   * Partition a data structure based on a boolean predicate.
   */
  readonly partition: Partition<F>
  /**
   * Map over a data structure and filter based on an option predicate.
   */
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: HKT<F, A>) => HKT<F, B>
  /**
   * Filter a data structure based on a boolean predicate.
   */
  readonly filter: Filter<F>
}

/**
 * @since 3.0.0
 */
export interface Filter1<F extends URIS> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind<F, A>) => Kind<F, B>
  <A>(predicate: Predicate<A>): (fa: Kind<F, A>) => Kind<F, A>
}

/**
 * @since 3.0.0
 */
export interface Partition1<F extends URIS> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, B>>
  <A>(predicate: Predicate<A>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, A>>
}

/**
 * @since 3.0.0
 */
export interface Filterable1<F extends URIS> extends Functor1<F>, Compactable1<F> {
  readonly partitionMap: <A, B, C>(f: (a: A) => Either<B, C>) => (fa: Kind<F, A>) => Separated<Kind<F, B>, Kind<F, C>>
  readonly partition: Partition1<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind<F, A>) => Kind<F, B>
  readonly filter: Filter1<F>
}

/**
 * @since 3.0.0
 */
export interface Filter2<F extends URIS2> {
  <A, B extends A>(refinement: Refinement<A, B>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, A>
}

/**
 * @since 3.0.0
 */
export interface Partition2<F extends URIS2> {
  <A, B extends A>(refinement: Refinement<A, B>): <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(predicate: Predicate<A>): <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}

/**
 * @since 3.0.0
 */
export interface Filterable2<F extends URIS2> extends Functor2<F>, Compactable2<F> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partition: Partition2<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly filter: Filter2<F>
}

/**
 * @since 3.0.0
 */
export interface Filter2C<F extends URIS2, E> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>): (fa: Kind2<F, E, A>) => Kind2<F, E, A>
}

/**
 * @since 3.0.0
 */
export interface Partition2C<F extends URIS2, E> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(predicate: Predicate<A>): (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}

/**
 * @since 3.0.0
 */
export interface Filterable2C<F extends URIS2, E> extends Functor2C<F, E>, Compactable2C<F, E> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partition: Partition2C<F, E>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly filter: Filter2C<F, E>
}

/**
 * @since 3.0.0
 */
export interface Filter3<F extends URIS3> {
  <A, B extends A>(refinement: Refinement<A, B>): <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>): <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface Partition3<F extends URIS3> {
  <A, B extends A>(refinement: Refinement<A, B>): <R, E>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <A>(predicate: Predicate<A>): <R, E>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}

/**
 * @since 3.0.0
 */
export interface Filterable3<F extends URIS3> extends Functor3<F>, Compactable3<F> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partition: Partition3<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly filter: Filter3<F>
}

/**
 * @since 3.0.0
 */
export interface Filter3C<F extends URIS3, E> {
  <A, B extends A>(refinement: Refinement<A, B>): <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>): <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface Partition3C<F extends URIS3, E> {
  <A, B extends A>(refinement: Refinement<A, B>): <R>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <A>(predicate: Predicate<A>): <R>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}

/**
 * @since 3.0.0
 */
export interface Filterable3C<F extends URIS3, E> extends Functor3C<F, E>, Compactable3C<F, E> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <R>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partition: Partition3C<F, E>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly filter: Filter3C<F, E>
}

/**
 * @since 3.0.0
 */
export interface Filter4<F extends URIS4> {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
  <A>(predicate: Predicate<A>): <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface Partition4<F extends URIS4> {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
  <A>(predicate: Predicate<A>): <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, A>>
}

/**
 * @since 3.0.0
 */
export interface Filterable4<F extends URIS4> extends Functor4<F>, Compactable4<F> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, C>>
  readonly partition: Partition4<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
  readonly filter: Filter4<F>
}

/**
 * @since 3.0.0
 */
export function filterComposition<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Filterable2C<G, E>
): <A>(predicate: Predicate<A>) => (fga: Kind<F, Kind2<G, E, A>>) => Kind<F, Kind2<G, E, A>>
export function filterComposition<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Filterable1<G>
): <A>(predicate: Predicate<A>) => (fga: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, A>>
export function filterComposition<F, G>(
  F: Functor<F>,
  G: Filterable<G>
): <A>(predicate: Predicate<A>) => (fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, A>>
export function filterComposition<F, G>(
  F: Functor<F>,
  G: Filterable<G>
): <A>(predicate: Predicate<A>) => (fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, A>> {
  return (predicate) => F.map(G.filter(predicate))
}

/**
 * @since 3.0.0
 */
export function filterMapComposition<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Filterable2C<G, E>
): <A, B>(f: (a: A) => Option<B>) => (fga: Kind<F, Kind2<G, E, A>>) => Kind<F, Kind2<G, E, B>>
export function filterMapComposition<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Filterable1<G>
): <A, B>(f: (a: A) => Option<B>) => (fga: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, B>>
export function filterMapComposition<F, G>(
  F: Functor<F>,
  G: Filterable<G>
): <A, B>(f: (a: A) => Option<B>) => (fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
export function filterMapComposition<F, G>(
  F: Functor<F>,
  G: Filterable<G>
): <A, B>(f: (a: A) => Option<B>) => (fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>> {
  return flow(G.filterMap, F.map)
}

/**
 * @since 3.0.0
 */
export function partitionComposition<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Filterable2C<G, E>
): <A>(
  predicate: Predicate<A>
) => (fga: Kind<F, Kind2<G, E, A>>) => Separated<Kind<F, Kind2<G, E, A>>, Kind<F, Kind2<G, E, A>>>
export function partitionComposition<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Filterable1<G>
): <A>(predicate: Predicate<A>) => (fga: Kind<F, Kind<G, A>>) => Separated<Kind<F, Kind<G, A>>, Kind<F, Kind<G, A>>>
export function partitionComposition<F, G>(
  F: Functor<F>,
  G: Filterable<G>
): <A>(predicate: Predicate<A>) => (fga: HKT<F, HKT<G, A>>) => Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, A>>>
export function partitionComposition<F, G>(
  F: Functor<F>,
  G: Filterable<G>
): <A>(predicate: Predicate<A>) => (fga: HKT<F, HKT<G, A>>) => Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, A>>> {
  const filter = filterComposition(F, G)
  return (predicate) => (fga) => ({
    left: pipe(
      fga,
      filter((a) => !predicate(a))
    ),
    right: pipe(fga, filter(predicate))
  })
}

/**
 * @since 3.0.0
 */
export function partitionMapComposition<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Filterable2C<G, E>
): <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Kind<F, Kind2<G, E, A>>) => Separated<Kind<F, Kind2<G, E, B>>, Kind<F, Kind2<G, E, C>>>
export function partitionMapComposition<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Filterable1<G>
): <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Kind<F, Kind<G, A>>) => Separated<Kind<F, Kind<G, B>>, Kind<F, Kind<G, C>>>
export function partitionMapComposition<F, G>(
  F: Functor<F>,
  G: Filterable<G>
): <A, B, C>(f: (a: A) => Either<B, C>) => (fa: HKT<F, HKT<G, A>>) => Separated<HKT<F, HKT<G, B>>, HKT<F, HKT<G, C>>>
export function partitionMapComposition<F, G>(
  F: Functor<F>,
  G: Filterable<G>
): <A, B, C>(f: (a: A) => Either<B, C>) => (fa: HKT<F, HKT<G, A>>) => Separated<HKT<F, HKT<G, B>>, HKT<F, HKT<G, C>>> {
  const filterMap = filterMapComposition(F, G)
  return (f) => (fga) => {
    return {
      left: pipe(
        fga,
        filterMap((a) => getLeft(f(a)))
      ),
      right: pipe(
        fga,
        filterMap((a) => getRight(f(a)))
      )
    }
  }
}
