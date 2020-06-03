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
// FunctoWithIndex
//

export function mapWithIndexComposition<F, FI, G, GI>(
  F: FunctorWithIndex<F, FI>,
  G: FunctorWithIndex<G, GI>
): <A, B>(f: (i: readonly [FI, GI], a: A) => B) => (fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>> {
  return (f) =>
    F.mapWithIndex((fi, ga) =>
      pipe(
        ga,
        G.mapWithIndex((gi, a) => f([fi, gi], a))
      )
    )
}
