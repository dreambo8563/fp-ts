---
title: FoldableWithIndex.ts
nav_order: 31
parent: Modules
---

# FoldableWithIndex overview

A `Foldable` with an additional index.
A `FoldableWithIndex` instance must be compatible with its `Foldable` instance

```ts
reduce(fa, b, f) = reduceWithIndex(fa, b, (_, b, a) => f(b, a))
foldMap(M)(fa, f) = foldMapWithIndex(M)(fa, (_, a) => f(a))
reduceRight(fa, b, f) = reduceRightWithIndex(fa, b, (_, a, b) => f(a, b))
```

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [FoldableWithIndex (interface)](#foldablewithindex-interface)
- [FoldableWithIndex1 (interface)](#foldablewithindex1-interface)
- [FoldableWithIndex2 (interface)](#foldablewithindex2-interface)
- [FoldableWithIndex2C (interface)](#foldablewithindex2c-interface)
- [FoldableWithIndex3 (interface)](#foldablewithindex3-interface)
- [FoldableWithIndex3C (interface)](#foldablewithindex3c-interface)
- [FoldableWithIndex4 (interface)](#foldablewithindex4-interface)
- [FoldableWithIndexComposition (interface)](#foldablewithindexcomposition-interface)
- [FoldableWithIndexComposition11 (interface)](#foldablewithindexcomposition11-interface)
- [FoldableWithIndexComposition12 (interface)](#foldablewithindexcomposition12-interface)
- [FoldableWithIndexComposition12C (interface)](#foldablewithindexcomposition12c-interface)
- [FoldableWithIndexComposition21 (interface)](#foldablewithindexcomposition21-interface)
- [FoldableWithIndexComposition22 (interface)](#foldablewithindexcomposition22-interface)
- [FoldableWithIndexComposition22C (interface)](#foldablewithindexcomposition22c-interface)
- [FoldableWithIndexComposition2C1 (interface)](#foldablewithindexcomposition2c1-interface)
- [getFoldableWithIndexComposition](#getfoldablewithindexcomposition)

---

# FoldableWithIndex (interface)

**Signature**

```ts
export interface FoldableWithIndex<F, I> extends Foldable<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: HKT<F, A>) => B
}
```

Added in v3.0.0

# FoldableWithIndex1 (interface)

**Signature**

```ts
export interface FoldableWithIndex1<F extends URIS, I> extends Foldable1<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Kind<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Kind<F, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Kind<F, A>) => B
}
```

Added in v3.0.0

# FoldableWithIndex2 (interface)

**Signature**

```ts
export interface FoldableWithIndex2<F extends URIS2, I> extends Foldable2<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <E>(fa: Kind2<F, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <E>(fa: Kind2<F, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <E>(fa: Kind2<F, E, A>) => B
}
```

Added in v3.0.0

# FoldableWithIndex2C (interface)

**Signature**

```ts
export interface FoldableWithIndex2C<F extends URIS2, I, E> extends Foldable2C<F, E> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Kind2<F, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Kind2<F, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Kind2<F, E, A>) => B
}
```

Added in v3.0.0

# FoldableWithIndex3 (interface)

**Signature**

```ts
export interface FoldableWithIndex3<F extends URIS3, I> extends Foldable3<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <R, E>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
}
```

Added in v3.0.0

# FoldableWithIndex3C (interface)

**Signature**

```ts
export interface FoldableWithIndex3C<F extends URIS3, I, E> extends Foldable3C<F, E> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <R>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <R>(fa: Kind3<F, R, E, A>) => B
}
```

Added in v2.2.0

# FoldableWithIndex4 (interface)

**Signature**

```ts
export interface FoldableWithIndex4<F extends URIS4, I> extends Foldable4<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
}
```

Added in v3.0.0

# FoldableWithIndexComposition (interface)

**Signature**

```ts
export interface FoldableWithIndexComposition<F, G, FI, GI> extends FoldableComposition<F, G> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: [FI, GI], b: B, a: A) => B) => (fga: HKT<F, HKT<G, A>>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: [FI, GI], a: A) => M) => (fga: HKT<F, HKT<G, A>>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: [FI, GI], a: A, b: B) => B) => (fga: HKT<F, HKT<G, A>>) => B
}
```

Added in v3.0.0

# FoldableWithIndexComposition11 (interface)

**Signature**

```ts
export interface FoldableWithIndexComposition11<F extends URIS, G extends URIS, FI, GI>
  extends FoldableComposition11<F, G> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: [FI, GI], b: B, a: A) => B) => (fga: Kind<F, Kind<G, A>>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: [FI, GI], a: A) => M) => (fga: Kind<F, Kind<G, A>>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: [FI, GI], a: A, b: B) => B) => (fga: Kind<F, Kind<G, A>>) => B
}
```

Added in v3.0.0

# FoldableWithIndexComposition12 (interface)

**Signature**

```ts
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
```

Added in v3.0.0

# FoldableWithIndexComposition12C (interface)

**Signature**

```ts
export interface FoldableWithIndexComposition12C<F extends URIS, G extends URIS2, FI, GI, GE>
  extends FoldableComposition12C<F, G, GE> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: [FI, GI], b: B, a: A) => B) => (fga: Kind<F, Kind2<G, GE, A>>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: [FI, GI], a: A) => M) => (fga: Kind<F, Kind2<G, GE, A>>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: [FI, GI], a: A, b: B) => B) => (fga: Kind<F, Kind2<G, GE, A>>) => B
}
```

Added in v3.0.0

# FoldableWithIndexComposition21 (interface)

**Signature**

```ts
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
```

Added in v3.0.0

# FoldableWithIndexComposition22 (interface)

**Signature**

```ts
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
```

Added in v3.0.0

# FoldableWithIndexComposition22C (interface)

**Signature**

```ts
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
```

Added in v3.0.0

# FoldableWithIndexComposition2C1 (interface)

**Signature**

```ts
export interface FoldableWithIndexComposition2C1<F extends URIS2, G extends URIS, FE, FI, GI>
  extends FoldableComposition2C1<F, G, FE> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: [FI, GI], b: B, a: A) => B) => (fga: Kind2<F, FE, Kind<G, A>>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: [FI, GI], a: A) => M) => (fga: Kind2<F, FE, Kind<G, A>>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: [FI, GI], a: A, b: B) => B) => (fga: Kind2<F, FE, Kind<G, A>>) => B
}
```

Added in v3.0.0

# getFoldableWithIndexComposition

**Signature**

```ts
export declare function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS2, GI, GE>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex2C<G, GI, GE>
): FoldableWithIndexComposition22C<F, G, GE, FI, GI>
export declare function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS2, GI>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition22<F, G, FI, GI>
export declare function getFoldableWithIndexComposition<F extends URIS2, FI, FE, G extends URIS, GI>(
  F: FoldableWithIndex2C<F, FI, FE>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition2C1<F, G, FE, FI, GI>
export declare function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS, GI>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition21<F, G, FI, GI>
export declare function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS2, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition12<F, FI, G, GI>
export declare function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS2, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition12<F, FI, G, GI>
export declare function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition11<F, G, FI, GI>
export declare function getFoldableWithIndexComposition<F, FI, G, GI>(
  F: FoldableWithIndex<F, FI>,
  G: FoldableWithIndex<G, GI>
): FoldableWithIndexComposition<F, G, FI, GI>
```

Added in v3.0.0
