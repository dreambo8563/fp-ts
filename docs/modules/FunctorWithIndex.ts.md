---
title: FunctorWithIndex.ts
nav_order: 34
parent: Modules
---

# FunctorWithIndex overview

A `FunctorWithIndex` is a type constructor which supports a mapping operation `mapWithIndex`.

`mapWithIndex` can be used to turn functions `i -> a -> b` into functions `f a -> f b` whose argument and return types use the type
constructor `f` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `F.mapWithIndex(fa, (_i, a) => a) = fa`
2. Composition: `F.mapWithIndex(fa, (_i, a) => bc(ab(a))) = F.mapWithIndex(F.mapWithIndex(fa, ab), bc)`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [FunctorWithIndex (interface)](#functorwithindex-interface)
- [FunctorWithIndex1 (interface)](#functorwithindex1-interface)
- [FunctorWithIndex2 (interface)](#functorwithindex2-interface)
- [FunctorWithIndex2C (interface)](#functorwithindex2c-interface)
- [FunctorWithIndex3 (interface)](#functorwithindex3-interface)
- [FunctorWithIndex3C (interface)](#functorwithindex3c-interface)
- [FunctorWithIndex4 (interface)](#functorwithindex4-interface)
- [FunctorWithIndexComposition (interface)](#functorwithindexcomposition-interface)
- [FunctorWithIndexComposition11 (interface)](#functorwithindexcomposition11-interface)
- [FunctorWithIndexComposition12 (interface)](#functorwithindexcomposition12-interface)
- [FunctorWithIndexComposition12C (interface)](#functorwithindexcomposition12c-interface)
- [FunctorWithIndexComposition21 (interface)](#functorwithindexcomposition21-interface)
- [FunctorWithIndexComposition22 (interface)](#functorwithindexcomposition22-interface)
- [FunctorWithIndexComposition22C (interface)](#functorwithindexcomposition22c-interface)
- [FunctorWithIndexComposition2C1 (interface)](#functorwithindexcomposition2c1-interface)
- [getFunctorWithIndexComposition](#getfunctorwithindexcomposition)

---

# FunctorWithIndex (interface)

**Signature**

```ts
export interface FunctorWithIndex<F, I> extends Functor<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}
```

Added in v3.0.0

# FunctorWithIndex1 (interface)

**Signature**

```ts
export interface FunctorWithIndex1<F extends URIS, I> extends Functor1<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Kind<F, A>) => Kind<F, B>
}
```

Added in v3.0.0

# FunctorWithIndex2 (interface)

**Signature**

```ts
export interface FunctorWithIndex2<F extends URIS2, I> extends Functor2<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v3.0.0

# FunctorWithIndex2C (interface)

**Signature**

```ts
export interface FunctorWithIndex2C<F extends URIS2, I, E> extends Functor2C<F, E> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v3.0.0

# FunctorWithIndex3 (interface)

**Signature**

```ts
export interface FunctorWithIndex3<F extends URIS3, I> extends Functor3<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v3.0.0

# FunctorWithIndex3C (interface)

**Signature**

```ts
export interface FunctorWithIndex3C<F extends URIS3, I, E> extends Functor3C<F, E> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v2.2.0

# FunctorWithIndex4 (interface)

**Signature**

```ts
export interface FunctorWithIndex4<F extends URIS4, I> extends Functor4<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
```

Added in v3.0.0

# FunctorWithIndexComposition (interface)

**Signature**

```ts
export interface FunctorWithIndexComposition<F, FI, G, GI> extends FunctorComposition<F, G> {
  readonly mapWithIndex: <A, B>(f: (i: [FI, GI], a: A) => B) => (fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
}
```

Added in v3.0.0

# FunctorWithIndexComposition11 (interface)

**Signature**

```ts
export interface FunctorWithIndexComposition11<F extends URIS, G extends URIS, FI, GI>
  extends FunctorComposition11<F, G> {
  readonly mapWithIndex: <A, B>(f: (i: [FI, GI], a: A) => B) => (fa: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, B>>
}
```

Added in v3.0.0

# FunctorWithIndexComposition12 (interface)

**Signature**

```ts
export interface FunctorWithIndexComposition12<F extends URIS, G extends URIS2, FI, GI>
  extends FunctorComposition12<F, G> {
  readonly mapWithIndex: <A, B>(
    f: (i: [FI, GI], a: A) => B
  ) => <GE>(fa: Kind<F, Kind2<G, GE, A>>) => Kind<F, Kind2<G, GE, B>>
}
```

Added in v3.0.0

# FunctorWithIndexComposition12C (interface)

**Signature**

```ts
export interface FunctorWithIndexComposition12C<F extends URIS, G extends URIS2, GE, FI, GI>
  extends FunctorComposition12C<F, G, GE> {
  readonly mapWithIndex: <A, B>(
    f: (i: [FI, GI], a: A) => B
  ) => (fa: Kind<F, Kind2<G, GE, A>>) => Kind<F, Kind2<G, GE, B>>
}
```

Added in v3.0.0

# FunctorWithIndexComposition21 (interface)

**Signature**

```ts
export interface FunctorWithIndexComposition21<F extends URIS2, G extends URIS, FI, GI>
  extends FunctorComposition21<F, G> {
  readonly mapWithIndex: <A, B>(
    f: (i: [FI, GI], a: A) => B
  ) => <FE>(fa: Kind2<F, FE, Kind<G, A>>) => Kind2<F, FE, Kind<G, B>>
}
```

Added in v3.0.0

# FunctorWithIndexComposition22 (interface)

**Signature**

```ts
export interface FunctorWithIndexComposition22<F extends URIS2, G extends URIS2, FI, GI>
  extends FunctorComposition22<F, G> {
  readonly mapWithIndex: <A, B>(
    f: (i: [FI, GI], a: A) => B
  ) => <FE, GE>(fa: Kind2<F, FE, Kind2<G, GE, A>>) => Kind2<F, FE, Kind2<G, GE, B>>
}
```

Added in v3.0.0

# FunctorWithIndexComposition22C (interface)

**Signature**

```ts
export interface FunctorWithIndexComposition22C<F extends URIS2, G extends URIS2, GE, FI, GI>
  extends FunctorComposition22C<F, G, GE> {
  readonly mapWithIndex: <FE, A, B>(
    f: (i: [FI, GI], a: A) => B
  ) => (fa: Kind2<F, FE, Kind2<G, GE, A>>) => Kind2<F, FE, Kind2<G, GE, B>>
}
```

Added in v3.0.0

# FunctorWithIndexComposition2C1 (interface)

**Signature**

```ts
export interface FunctorWithIndexComposition2C1<F extends URIS2, G extends URIS, FE, FI, GI>
  extends FunctorComposition2C1<F, G, FE> {
  readonly mapWithIndex: <A, B>(
    f: (i: [FI, GI], a: A) => B
  ) => (fa: Kind2<F, FE, Kind<G, A>>) => Kind2<F, FE, Kind<G, B>>
}
```

Added in v3.0.0

# getFunctorWithIndexComposition

**Signature**

```ts
export declare function getFunctorWithIndexComposition<F extends URIS2, FI, G extends URIS2, GE, GI>(
  F: FunctorWithIndex2<F, FI>,
  G: FunctorWithIndex2C<G, GI, GE>
): FunctorWithIndexComposition22C<F, G, GE, FI, GI>
export declare function getFunctorWithIndexComposition<F extends URIS2, FI, G extends URIS2, GI>(
  F: FunctorWithIndex2<F, FI>,
  G: FunctorWithIndex2<G, GI>
): FunctorWithIndexComposition22<F, G, FI, GI>
export declare function getFunctorWithIndexComposition<F extends URIS2, FI, FE, G extends URIS, GI>(
  F: FunctorWithIndex2C<F, FI, FE>,
  G: FunctorWithIndex1<G, GI>
): FunctorWithIndexComposition2C1<F, G, FE, FI, GI>
export declare function getFunctorWithIndexComposition<F extends URIS2, FI, G extends URIS, GI>(
  F: FunctorWithIndex2<F, FI>,
  G: FunctorWithIndex1<G, GI>
): FunctorWithIndexComposition21<F, G, FI, GI>
export declare function getFunctorWithIndexComposition<F extends URIS, FI, G extends URIS2, GI, GE>(
  F: FunctorWithIndex1<F, FI>,
  G: FunctorWithIndex2C<G, GI, GE>
): FunctorWithIndexComposition12C<F, G, GE, FI, GI>
export declare function getFunctorWithIndexComposition<F extends URIS, FI, G extends URIS2, GI>(
  F: FunctorWithIndex1<F, FI>,
  G: FunctorWithIndex2<G, GI>
): FunctorWithIndexComposition12<F, G, FI, GI>
export declare function getFunctorWithIndexComposition<F extends URIS, FI, G extends URIS, GI>(
  F: FunctorWithIndex1<F, FI>,
  G: FunctorWithIndex1<G, GI>
): FunctorWithIndexComposition11<F, G, FI, GI>
export declare function getFunctorWithIndexComposition<F, FI, G, GI>(
  F: FunctorWithIndex<F, FI>,
  G: FunctorWithIndex<G, GI>
): FunctorWithIndexComposition<F, FI, G, GI>
```

Added in v3.0.0
