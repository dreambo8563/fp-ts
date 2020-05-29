---
title: Filterable.ts
nav_order: 28
parent: Modules
---

# Filterable overview

`Filterable` represents data structures which can be _partitioned_/_filtered_.

Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Filter (interface)](#filter-interface)
- [Filter1 (interface)](#filter1-interface)
- [Filter2 (interface)](#filter2-interface)
- [Filter2C (interface)](#filter2c-interface)
- [Filter3 (interface)](#filter3-interface)
- [Filter3C (interface)](#filter3c-interface)
- [Filter4 (interface)](#filter4-interface)
- [Filterable (interface)](#filterable-interface)
- [Filterable1 (interface)](#filterable1-interface)
- [Filterable2 (interface)](#filterable2-interface)
- [Filterable2C (interface)](#filterable2c-interface)
- [Filterable3 (interface)](#filterable3-interface)
- [Filterable3C (interface)](#filterable3c-interface)
- [Filterable4 (interface)](#filterable4-interface)
- [FilterableComposition (interface)](#filterablecomposition-interface)
- [FilterableComposition11 (interface)](#filterablecomposition11-interface)
- [FilterableComposition12 (interface)](#filterablecomposition12-interface)
- [FilterableComposition12C (interface)](#filterablecomposition12c-interface)
- [FilterableComposition21 (interface)](#filterablecomposition21-interface)
- [FilterableComposition22 (interface)](#filterablecomposition22-interface)
- [FilterableComposition22C (interface)](#filterablecomposition22c-interface)
- [FilterableComposition23C (interface)](#filterablecomposition23c-interface)
- [FilterableComposition2C1 (interface)](#filterablecomposition2c1-interface)
- [Partition (interface)](#partition-interface)
- [Partition1 (interface)](#partition1-interface)
- [Partition2 (interface)](#partition2-interface)
- [Partition2C (interface)](#partition2c-interface)
- [Partition3 (interface)](#partition3-interface)
- [Partition3C (interface)](#partition3c-interface)
- [Partition4 (interface)](#partition4-interface)
- [getFilterableComposition](#getfilterablecomposition)

---

# Filter (interface)

**Signature**

```ts
export interface Filter<F> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => HKT<F, B>
  <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => HKT<F, A>
}
```

Added in v3.0.0

# Filter1 (interface)

**Signature**

```ts
export interface Filter1<F extends URIS> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind<F, A>) => Kind<F, B>
  <A>(predicate: Predicate<A>): (fa: Kind<F, A>) => Kind<F, A>
}
```

Added in v3.0.0

# Filter2 (interface)

**Signature**

```ts
export interface Filter2<F extends URIS2> {
  <A, B extends A>(refinement: Refinement<A, B>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, A>
}
```

Added in v3.0.0

# Filter2C (interface)

**Signature**

```ts
export interface Filter2C<F extends URIS2, E> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>): (fa: Kind2<F, E, A>) => Kind2<F, E, A>
}
```

Added in v3.0.0

# Filter3 (interface)

**Signature**

```ts
export interface Filter3<F extends URIS3> {
  <A, B extends A>(refinement: Refinement<A, B>): <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>): <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}
```

Added in v3.0.0

# Filter3C (interface)

**Signature**

```ts
export interface Filter3C<F extends URIS3, E> {
  <A, B extends A>(refinement: Refinement<A, B>): <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>): <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}
```

Added in v3.0.0

# Filter4 (interface)

**Signature**

```ts
export interface Filter4<F extends URIS4> {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
  <A>(predicate: Predicate<A>): <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
}
```

Added in v3.0.0

# Filterable (interface)

**Signature**

```ts
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
```

Added in v3.0.0

# Filterable1 (interface)

**Signature**

```ts
export interface Filterable1<F extends URIS> extends Functor1<F>, Compactable1<F> {
  readonly partitionMap: <A, B, C>(f: (a: A) => Either<B, C>) => (fa: Kind<F, A>) => Separated<Kind<F, B>, Kind<F, C>>
  readonly partition: Partition1<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind<F, A>) => Kind<F, B>
  readonly filter: Filter1<F>
}
```

Added in v3.0.0

# Filterable2 (interface)

**Signature**

```ts
export interface Filterable2<F extends URIS2> extends Functor2<F>, Compactable2<F> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partition: Partition2<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly filter: Filter2<F>
}
```

Added in v3.0.0

# Filterable2C (interface)

**Signature**

```ts
export interface Filterable2C<F extends URIS2, E> extends Functor2C<F, E>, Compactable2C<F, E> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partition: Partition2C<F, E>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly filter: Filter2C<F, E>
}
```

Added in v3.0.0

# Filterable3 (interface)

**Signature**

```ts
export interface Filterable3<F extends URIS3> extends Functor3<F>, Compactable3<F> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partition: Partition3<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly filter: Filter3<F>
}
```

Added in v3.0.0

# Filterable3C (interface)

**Signature**

```ts
export interface Filterable3C<F extends URIS3, E> extends Functor3C<F, E>, Compactable3C<F, E> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <R>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partition: Partition3C<F, E>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly filter: Filter3C<F, E>
}
```

Added in v3.0.0

# Filterable4 (interface)

**Signature**

```ts
export interface Filterable4<F extends URIS4> extends Functor4<F>, Compactable4<F> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, C>>
  readonly partition: Partition4<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
  readonly filter: Filter4<F>
}
```

Added in v3.0.0

# FilterableComposition (interface)

**Signature**

```ts
export interface FilterableComposition<F, G> extends FunctorComposition<F, G>, CompactableComposition<F, G> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => (fa: HKT<F, HKT<G, A>>) => Separated<HKT<F, HKT<G, B>>, HKT<F, HKT<G, C>>>
  readonly partition: <A>(
    predicate: Predicate<A>
  ) => (fa: HKT<F, HKT<G, A>>) => Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, A>>>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
  readonly filter: <A>(predicate: Predicate<A>) => (fa: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, A>>
}
```

Added in v3.0.0

# FilterableComposition11 (interface)

**Signature**

```ts
export interface FilterableComposition11<F extends URIS, G extends URIS>
  extends FunctorComposition11<F, G>,
    CompactableComposition11<F, G> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => (fa: Kind<F, Kind<G, A>>) => Separated<Kind<F, Kind<G, B>>, Kind<F, Kind<G, C>>>
  readonly partition: <A>(
    predicate: Predicate<A>
  ) => (fa: Kind<F, Kind<G, A>>) => Separated<Kind<F, Kind<G, A>>, Kind<F, Kind<G, A>>>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, B>>
  readonly filter: <A>(predicate: Predicate<A>) => (fa: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, A>>
}
```

Added in v3.0.0

# FilterableComposition12 (interface)

**Signature**

```ts
export interface FilterableComposition12<F extends URIS, G extends URIS2>
  extends FunctorComposition12<F, G>,
    CompactableComposition12<F, G> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <E>(fa: Kind<F, Kind2<G, E, A>>) => Separated<Kind<F, Kind2<G, E, B>>, Kind<F, Kind2<G, E, C>>>
  readonly partition: <A>(
    predicate: Predicate<A>
  ) => <E>(fa: Kind<F, Kind2<G, E, A>>) => Separated<Kind<F, Kind2<G, E, A>>, Kind<F, Kind2<G, E, A>>>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <E>(fa: Kind<F, Kind2<G, E, A>>) => Kind<F, Kind2<G, E, B>>
  readonly filter: <A>(predicate: Predicate<A>) => <E>(fa: Kind<F, Kind2<G, E, A>>) => Kind<F, Kind2<G, E, A>>
}
```

Added in v3.0.0

# FilterableComposition12C (interface)

**Signature**

```ts
export interface FilterableComposition12C<F extends URIS, G extends URIS2, E>
  extends FunctorComposition12C<F, G, E>,
    CompactableComposition12C<F, G, E> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => (fa: Kind<F, Kind2<G, E, A>>) => Separated<Kind<F, Kind2<G, E, B>>, Kind<F, Kind2<G, E, C>>>
  readonly partition: <A>(
    predicate: Predicate<A>
  ) => (fa: Kind<F, Kind2<G, E, A>>) => Separated<Kind<F, Kind2<G, E, A>>, Kind<F, Kind2<G, E, A>>>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind<F, Kind2<G, E, A>>) => Kind<F, Kind2<G, E, B>>
  readonly filter: <A>(predicate: Predicate<A>) => (fa: Kind<F, Kind2<G, E, A>>) => Kind<F, Kind2<G, E, A>>
}
```

Added in v3.0.0

# FilterableComposition21 (interface)

**Signature**

```ts
export interface FilterableComposition21<F extends URIS2, G extends URIS>
  extends FunctorComposition21<F, G>,
    CompactableComposition21<F, G> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <E>(fa: Kind2<F, E, Kind<G, A>>) => Separated<Kind2<F, E, Kind<G, B>>, Kind2<F, E, Kind<G, C>>>
  readonly partition: <A>(
    predicate: Predicate<A>
  ) => <E>(fa: Kind2<F, E, Kind<G, A>>) => Separated<Kind2<F, E, Kind<G, A>>, Kind2<F, E, Kind<G, A>>>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <E>(fa: Kind2<F, E, Kind<G, A>>) => Kind2<F, E, Kind<G, B>>
  readonly filter: <A>(predicate: Predicate<A>) => <E>(fa: Kind2<F, E, Kind<G, A>>) => Kind2<F, E, Kind<G, A>>
}
```

Added in v3.0.0

# FilterableComposition22 (interface)

**Signature**

```ts
export interface FilterableComposition22<F extends URIS2, G extends URIS2>
  extends FunctorComposition22<F, G>,
    CompactableComposition22<F, G> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <FE, GE>(
    fa: Kind2<F, FE, Kind2<G, GE, A>>
  ) => Separated<Kind2<F, FE, Kind2<G, GE, B>>, Kind2<F, FE, Kind2<G, GE, C>>>
  readonly partition: <A>(
    predicate: Predicate<A>
  ) => <FE, GE>(
    fa: Kind2<F, FE, Kind2<G, GE, A>>
  ) => Separated<Kind2<F, FE, Kind2<G, GE, A>>, Kind2<F, FE, Kind2<G, GE, A>>>
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <FE, GE>(fa: Kind2<F, FE, Kind2<G, GE, A>>) => Kind2<F, FE, Kind2<G, GE, B>>
  readonly filter: <A>(
    predicate: Predicate<A>
  ) => <FE, GE>(fa: Kind2<F, FE, Kind2<G, GE, A>>) => Kind2<F, FE, Kind2<G, GE, A>>
}
```

Added in v3.0.0

# FilterableComposition22C (interface)

**Signature**

```ts
export interface FilterableComposition22C<F extends URIS2, G extends URIS2, E>
  extends FunctorComposition22<F, G>,
    CompactableComposition22<F, G> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <FE>(fa: Kind2<F, FE, Kind2<G, E, A>>) => Separated<Kind2<F, FE, Kind2<G, E, B>>, Kind2<F, FE, Kind2<G, E, C>>>
  readonly partition: <A>(
    predicate: Predicate<A>
  ) => <FE>(fa: Kind2<F, FE, Kind2<G, E, A>>) => Separated<Kind2<F, FE, Kind2<G, E, A>>, Kind2<F, FE, Kind2<G, E, A>>>
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <FE>(fa: Kind2<F, FE, Kind2<G, E, A>>) => Kind2<F, FE, Kind2<G, E, B>>
  readonly filter: <A>(
    predicate: Predicate<A>
  ) => <FE>(fa: Kind2<F, FE, Kind2<G, E, A>>) => Kind2<F, FE, Kind2<G, E, A>>
}
```

Added in v3.0.0

# FilterableComposition23C (interface)

**Signature**

```ts
export interface FilterableComposition23C<F extends URIS2, G extends URIS3, E>
  extends FunctorComposition23<F, G>,
    CompactableComposition23<F, G> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <FE, GR>(
    fa: Kind2<F, FE, Kind3<G, GR, E, A>>
  ) => Separated<Kind2<F, FE, Kind3<G, GR, E, B>>, Kind2<F, FE, Kind3<G, GR, E, C>>>
  readonly partition: <A>(
    predicate: Predicate<A>
  ) => <FE, GR>(
    fa: Kind2<F, FE, Kind3<G, GR, E, A>>
  ) => Separated<Kind2<F, FE, Kind3<G, GR, E, A>>, Kind2<F, FE, Kind3<G, GR, E, A>>>
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <FE, GR>(fa: Kind2<F, FE, Kind3<G, GR, E, A>>) => Kind2<F, FE, Kind3<G, GR, E, B>>
  readonly filter: <A>(
    predicate: Predicate<A>
  ) => <FE, GR>(fa: Kind2<F, FE, Kind3<G, GR, E, A>>) => Kind2<F, FE, Kind3<G, GR, E, A>>
}
```

Added in v3.0.0

# FilterableComposition2C1 (interface)

**Signature**

```ts
export interface FilterableComposition2C1<F extends URIS2, G extends URIS, E>
  extends FunctorComposition21<F, G>,
    CompactableComposition21<F, G> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => (fa: Kind2<F, E, Kind<G, A>>) => Separated<Kind2<F, E, Kind<G, B>>, Kind2<F, E, Kind<G, C>>>
  readonly partition: <A>(
    predicate: Predicate<A>
  ) => (fa: Kind2<F, E, Kind<G, A>>) => Separated<Kind2<F, E, Kind<G, A>>, Kind2<F, E, Kind<G, A>>>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind2<F, E, Kind<G, A>>) => Kind2<F, E, Kind<G, B>>
  readonly filter: <A>(predicate: Predicate<A>) => (fa: Kind2<F, E, Kind<G, A>>) => Kind2<F, E, Kind<G, A>>
}
```

Added in v3.0.0

# Partition (interface)

**Signature**

```ts
export interface Partition<F> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, B>>
  <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, A>>
}
```

Added in v3.0.0

# Partition1 (interface)

**Signature**

```ts
export interface Partition1<F extends URIS> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, B>>
  <A>(predicate: Predicate<A>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, A>>
}
```

Added in v3.0.0

# Partition2 (interface)

**Signature**

```ts
export interface Partition2<F extends URIS2> {
  <A, B extends A>(refinement: Refinement<A, B>): <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(predicate: Predicate<A>): <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}
```

Added in v3.0.0

# Partition2C (interface)

**Signature**

```ts
export interface Partition2C<F extends URIS2, E> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(predicate: Predicate<A>): (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}
```

Added in v3.0.0

# Partition3 (interface)

**Signature**

```ts
export interface Partition3<F extends URIS3> {
  <A, B extends A>(refinement: Refinement<A, B>): <R, E>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <A>(predicate: Predicate<A>): <R, E>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}
```

Added in v3.0.0

# Partition3C (interface)

**Signature**

```ts
export interface Partition3C<F extends URIS3, E> {
  <A, B extends A>(refinement: Refinement<A, B>): <R>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <A>(predicate: Predicate<A>): <R>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}
```

Added in v3.0.0

# Partition4 (interface)

**Signature**

```ts
export interface Partition4<F extends URIS4> {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
  <A>(predicate: Predicate<A>): <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, A>>
}
```

Added in v3.0.0

# getFilterableComposition

**Signature**

```ts
export declare function getFilterableComposition<F extends URIS2, G extends URIS3, E>(
  F: Functor2<F>,
  G: Filterable3C<G, E>
): FilterableComposition23C<F, G, E>
export declare function getFilterableComposition<F extends URIS2, G extends URIS2, E>(
  F: Functor2<F>,
  G: Filterable2C<G, E>
): FilterableComposition22C<F, G, E>
export declare function getFilterableComposition<F extends URIS2, G extends URIS2>(
  F: Functor2<F>,
  G: Filterable2<G>
): FilterableComposition22<F, G>
export declare function getFilterableComposition<F extends URIS2, G extends URIS, E>(
  F: Functor2C<F, E>,
  G: Filterable1<G>
): FilterableComposition2C1<F, G, E>
export declare function getFilterableComposition<F extends URIS2, G extends URIS>(
  F: Functor2<F>,
  G: Filterable1<G>
): FilterableComposition21<F, G>
export declare function getFilterableComposition<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Filterable2C<G, E>
): FilterableComposition12C<F, G, E>
export declare function getFilterableComposition<F extends URIS, G extends URIS2>(
  F: Functor1<F>,
  G: Filterable2<G>
): FilterableComposition12<F, G>
export declare function getFilterableComposition<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Filterable1<G>
): FilterableComposition11<F, G>
export declare function getFilterableComposition<F, G>(F: Functor<F>, G: Filterable<G>): FilterableComposition<F, G>
```

Added in v3.0.0
