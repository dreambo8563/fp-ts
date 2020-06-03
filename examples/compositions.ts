import { Apply } from '../src/Apply'
import { HKT } from '../src/HKT'
import { pipe, flow } from '../src/function'
import { Functor } from '../src/Functor'
import { Foldable } from '../src/Foldable'
import { Monoid } from '../src/Monoid'
import { Compactable, Separated } from '../src/Compactable'
import { Either } from '../src/Either'
import * as O from '../src/Option'

import Option = O.Option
import { FunctorWithIndex } from '../src/FunctorWithIndex'
import { FoldableWithIndex } from '../src/FoldableWithIndex'
import { Traversable } from '../src/Traversable'
import { Applicative } from '../src/Applicative'

//
// Functor
//

export const mapComposition = <F, G>(
  F: Functor<F>,
  G: Functor<G>
): (<A, B>(f: (a: A) => B) => (fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>) => flow(G.map, F.map)

//
// Apply
//

export const apComposition = <F, G>(F: Apply<F>, G: Apply<G>) => <A>(fga: HKT<F, HKT<G, A>>) => <B>(
  fgab: HKT<F, HKT<G, (a: A) => B>>
): HKT<F, HKT<G, B>> =>
  pipe(
    fgab,
    F.map((h) => (ga: HKT<G, A>) => pipe(h, G.ap(ga))),
    F.ap(fga)
  )

//
// Compactable
//

export const compactComposition = <F, G>(
  F: Functor<F>,
  G: Compactable<G>
): (<A>(fgo: HKT<F, HKT<G, Option<A>>>) => HKT<F, HKT<G, A>>) => F.map(G.compact)

export const separateComposition = <F, G>(F: Functor<F>, G: Compactable<G> & Functor<G>) => <A, B>(
  fge: HKT<F, HKT<G, Either<A, B>>>
): Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, B>>> => {
  const map = mapComposition(F, G)
  const compact = compactComposition(F, G)
  return {
    left: pipe(fge, map(O.getLeft), compact),
    right: pipe(fge, map(O.getRight), compact)
  }
}

//
// Foldable
//

export const reduceComposition: <F, G>(
  F: Foldable<F>,
  G: Foldable<G>
) => <A, B>(b: B, f: (b: B, a: A) => B) => (fga: HKT<F, HKT<G, A>>) => B = (F, G) => (b, f) =>
  F.reduce(b, (b, ga) => pipe(ga, G.reduce(b, f)))

export const foldMapComposition: <F, G>(
  F: Foldable<F>,
  G: Foldable<G>
) => <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fga: HKT<F, HKT<G, A>>) => M = (F, G) => (M) => {
  const foldMapF = F.foldMap(M)
  const foldMapG = G.foldMap(M)
  return (f) => foldMapF(foldMapG(f))
}

export const reduceRightComposition: <F, G>(
  F: Foldable<F>,
  G: Foldable<G>
) => <A, B>(b: B, f: (a: A, b: B) => B) => (fga: HKT<F, HKT<G, A>>) => B = (F, G) => (b, f) =>
  F.reduceRight(b, (ga, b) => pipe(ga, G.reduceRight(b, f)))

//
// Traversable
//

/**
 * @since 3.0.0
 */
export const traverseComposition: <F, G>(
  F: Traversable<F>,
  G: Traversable<G>
) => <H>(
  H: Applicative<H>
) => <A, B>(f: (a: A) => HKT<H, B>) => (fga: HKT<F, HKT<G, A>>) => HKT<H, HKT<F, HKT<G, B>>> = (F, G) => (H) => {
  const traverseF = F.traverse(H)
  const traverseG = G.traverse(H)
  return (f) => traverseF((ga) => pipe(ga, traverseG(f)))
}

/**
 * @since 3.0.0
 */
export const sequenceComposition: <F, G>(
  F: Traversable<F>,
  G: Traversable<G>
) => <H>(H: Applicative<H>) => <A>(fga: HKT<F, HKT<G, HKT<H, A>>>) => HKT<H, HKT<F, HKT<G, A>>> = (F, G) => (H) => {
  const sequenceF = F.sequence(H)
  const sequenceG = G.sequence(H)
  return (fgha) => sequenceF(pipe(fgha, F.map(sequenceG)))
}

//
// FunctoWithIndex
//

export const mapWithIndexComposition: <F, FI, G, GI>(
  F: FunctorWithIndex<F, FI>,
  G: FunctorWithIndex<G, GI>
) => <A, B>(f: (i: readonly [FI, GI], a: A) => B) => (fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>> = (F, G) => (f) =>
  F.mapWithIndex((fi, ga) =>
    pipe(
      ga,
      G.mapWithIndex((gi, a) => f([fi, gi], a))
    )
  )

//
// FoldableWithIndex
//

/**
 * @since 3.0.0
 */
export const reduceWithIndexComposition: <F, FI, G, GI>(
  F: FoldableWithIndex<F, FI>,
  G: FoldableWithIndex<G, GI>
) => <A, B>(b: B, f: (i: readonly [FI, GI], b: B, a: A) => B) => (fga: HKT<F, HKT<G, A>>) => B = (F, G) => (b, f) =>
  F.reduceWithIndex(b, (fi, b, ga) =>
    pipe(
      ga,
      G.reduceWithIndex(b, (gi, b, a) => f([fi, gi], b, a))
    )
  )

/**
 * @since 3.0.0
 */
export const foldMapWithIndexComposition: <F, FI, G, GI>(
  F: FoldableWithIndex<F, FI>,
  G: FoldableWithIndex<G, GI>
) => <M>(M: Monoid<M>) => <A>(f: (i: readonly [FI, GI], a: A) => M) => (fga: HKT<F, HKT<G, A>>) => M = (F, G) => (
  M
) => {
  const foldMapWithIndexF = F.foldMapWithIndex(M)
  const foldMapWithIndexG = G.foldMapWithIndex(M)
  return (f) =>
    foldMapWithIndexF((fi, ga) =>
      pipe(
        ga,
        foldMapWithIndexG((gi, a) => f([fi, gi], a))
      )
    )
}

/**
 * @since 3.0.0
 */
export const reduceRigthWithIndexComposition: <F, FI, G, GI>(
  F: FoldableWithIndex<F, FI>,
  G: FoldableWithIndex<G, GI>
) => <A, B>(b: B, f: (i: readonly [FI, GI], a: A, b: B) => B) => (fga: HKT<F, HKT<G, A>>) => B = (F, G) => (b, f) =>
  F.reduceRightWithIndex(b, (fi, ga, b) =>
    pipe(
      ga,
      G.reduceRightWithIndex(b, (gi, a, b) => f([fi, gi], a, b))
    )
  )
