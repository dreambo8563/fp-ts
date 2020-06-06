---
title: FilterableWithIndex.ts
nav_order: 26
parent: Modules
---

## FilterableWithIndex overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [FilterWithIndex (interface)](#filterwithindex-interface)
  - [FilterWithIndex1 (interface)](#filterwithindex1-interface)
  - [FilterWithIndex2 (interface)](#filterwithindex2-interface)
  - [FilterWithIndex2C (interface)](#filterwithindex2c-interface)
  - [FilterWithIndex3 (interface)](#filterwithindex3-interface)
  - [FilterWithIndex3C (interface)](#filterwithindex3c-interface)
  - [FilterWithIndex4 (interface)](#filterwithindex4-interface)
  - [FilterableWithIndex (interface)](#filterablewithindex-interface)
  - [FilterableWithIndex1 (interface)](#filterablewithindex1-interface)
  - [FilterableWithIndex2 (interface)](#filterablewithindex2-interface)
  - [FilterableWithIndex2C (interface)](#filterablewithindex2c-interface)
  - [FilterableWithIndex3 (interface)](#filterablewithindex3-interface)
  - [FilterableWithIndex3C (interface)](#filterablewithindex3c-interface)
  - [FilterableWithIndex4 (interface)](#filterablewithindex4-interface)
  - [PartitionWithIndex (interface)](#partitionwithindex-interface)
  - [PartitionWithIndex1 (interface)](#partitionwithindex1-interface)
  - [PartitionWithIndex2 (interface)](#partitionwithindex2-interface)
  - [PartitionWithIndex2C (interface)](#partitionwithindex2c-interface)
  - [PartitionWithIndex3 (interface)](#partitionwithindex3-interface)
  - [PartitionWithIndex3C (interface)](#partitionwithindex3c-interface)
  - [PartitionWithIndex4 (interface)](#partitionwithindex4-interface)
  - [PredicateWithIndex (type alias)](#predicatewithindex-type-alias)
  - [RefinementWithIndex (type alias)](#refinementwithindex-type-alias)

---

# utils

## FilterWithIndex (interface)

**Signature**

```ts
export interface FilterWithIndex<F, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (fa: HKT<F, A>) => HKT<F, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: HKT<F, A>) => HKT<F, A>
}
```

Added in v3.0.0

## FilterWithIndex1 (interface)

**Signature**

```ts
export interface FilterWithIndex1<F extends URIS, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (fa: Kind<F, A>) => Kind<F, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind<F, A>) => Kind<F, A>
}
```

Added in v3.0.0

## FilterWithIndex2 (interface)

**Signature**

```ts
export interface FilterWithIndex2<F extends URIS2, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, A>
}
```

Added in v3.0.0

## FilterWithIndex2C (interface)

**Signature**

```ts
export interface FilterWithIndex2C<F extends URIS2, I, E> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind2<F, E, A>) => Kind2<F, E, A>
}
```

Added in v3.0.0

## FilterWithIndex3 (interface)

**Signature**

```ts
export interface FilterWithIndex3<F extends URIS3, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <R, E>(
    fa: Kind3<F, R, E, A>
  ) => Kind3<F, R, E, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}
```

Added in v3.0.0

## FilterWithIndex3C (interface)

**Signature**

```ts
export interface FilterWithIndex3C<F extends URIS3, I, E> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}
```

Added in v2.2.0

## FilterWithIndex4 (interface)

**Signature**

```ts
export interface FilterWithIndex4<F extends URIS4, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Kind4<F, S, R, E, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
}
```

Added in v3.0.0

## FilterableWithIndex (interface)

**Signature**

```ts
export interface FilterableWithIndex<F, I> extends FunctorWithIndex<F, I>, Filterable<F> {
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => (fa: HKT<F, A>) => Separated<HKT<F, B>, HKT<F, C>>
  readonly partitionWithIndex: PartitionWithIndex<F, I>
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: HKT<F, A>) => HKT<F, B>
  readonly filterWithIndex: FilterWithIndex<F, I>
}
```

Added in v3.0.0

## FilterableWithIndex1 (interface)

**Signature**

```ts
export interface FilterableWithIndex1<F extends URIS, I> extends FunctorWithIndex1<F, I>, Filterable1<F> {
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => (fa: Kind<F, A>) => Separated<Kind<F, B>, Kind<F, C>>
  readonly partitionWithIndex: PartitionWithIndex1<F, I>
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: Kind<F, A>) => Kind<F, B>
  readonly filterWithIndex: FilterWithIndex1<F, I>
}
```

Added in v3.0.0

## FilterableWithIndex2 (interface)

**Signature**

```ts
export interface FilterableWithIndex2<F extends URIS2, I> extends FunctorWithIndex2<F, I>, Filterable2<F> {
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partitionWithIndex: PartitionWithIndex2<F, I>
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly filterWithIndex: FilterWithIndex2<F, I>
}
```

Added in v3.0.0

## FilterableWithIndex2C (interface)

**Signature**

```ts
export interface FilterableWithIndex2C<F extends URIS2, I, E> extends FunctorWithIndex2C<F, I, E>, Filterable2C<F, E> {
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partitionWithIndex: PartitionWithIndex2C<F, I, E>
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly filterWithIndex: FilterWithIndex2C<F, I, E>
}
```

Added in v3.0.0

## FilterableWithIndex3 (interface)

**Signature**

```ts
export interface FilterableWithIndex3<F extends URIS3, I> extends FunctorWithIndex3<F, I>, Filterable3<F> {
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partitionWithIndex: PartitionWithIndex3<F, I>
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly filterWithIndex: FilterWithIndex3<F, I>
}
```

Added in v3.0.0

## FilterableWithIndex3C (interface)

**Signature**

```ts
export interface FilterableWithIndex3C<F extends URIS3, I, E> extends FunctorWithIndex3C<F, I, E>, Filterable3C<F, E> {
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <R>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partitionWithIndex: PartitionWithIndex3C<F, I, E>
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly filterWithIndex: FilterWithIndex3C<F, I, E>
}
```

Added in v2.2.0

## FilterableWithIndex4 (interface)

**Signature**

```ts
export interface FilterableWithIndex4<F extends URIS4, I> extends FunctorWithIndex4<F, I>, Filterable4<F> {
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, C>>
  readonly partitionWithIndex: PartitionWithIndex4<F, I>
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
  readonly filterWithIndex: FilterWithIndex4<F, I>
}
```

Added in v3.0.0

## PartitionWithIndex (interface)

**Signature**

```ts
export interface PartitionWithIndex<F, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
    fa: HKT<F, A>
  ) => Separated<HKT<F, A>, HKT<F, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, A>>
}
```

Added in v3.0.0

## PartitionWithIndex1 (interface)

**Signature**

```ts
export interface PartitionWithIndex1<F extends URIS, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
    fa: Kind<F, A>
  ) => Separated<Kind<F, A>, Kind<F, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, A>>
}
```

Added in v3.0.0

## PartitionWithIndex2 (interface)

**Signature**

```ts
export interface PartitionWithIndex2<F extends URIS2, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <E>(
    fa: Kind2<F, E, A>
  ) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <E>(
    fa: Kind2<F, E, A>
  ) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}
```

Added in v3.0.0

## PartitionWithIndex2C (interface)

**Signature**

```ts
export interface PartitionWithIndex2C<F extends URIS2, I, E> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
    fa: Kind2<F, E, A>
  ) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}
```

Added in v3.0.0

## PartitionWithIndex3 (interface)

**Signature**

```ts
export interface PartitionWithIndex3<F extends URIS3, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <R, E>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <R, E>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}
```

Added in v3.0.0

## PartitionWithIndex3C (interface)

**Signature**

```ts
export interface PartitionWithIndex3C<F extends URIS3, I, E> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <R>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <R>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}
```

Added in v2.2.0

## PartitionWithIndex4 (interface)

**Signature**

```ts
export interface PartitionWithIndex4<F extends URIS4, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, A>>
}
```

Added in v3.0.0

## PredicateWithIndex (type alias)

**Signature**

```ts
export type PredicateWithIndex<I, A> = (i: I, a: A) => boolean
```

Added in v2.0.0

## RefinementWithIndex (type alias)

**Signature**

```ts
export type RefinementWithIndex<I, A, B extends A> = (i: I, a: A) => a is B
```

Added in v2.0.0
