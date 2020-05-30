---
title: ReaderT.ts
nav_order: 63
parent: Modules
---

# ReaderT overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [ReaderM (interface)](#readerm-interface)
- [ReaderM1 (interface)](#readerm1-interface)
- [ReaderM2 (interface)](#readerm2-interface)
- [ReaderM2C (interface)](#readerm2c-interface)
- [ReaderM3 (interface)](#readerm3-interface)
- [ReaderT (interface)](#readert-interface)
- [ReaderT1 (interface)](#readert1-interface)
- [ReaderT2 (interface)](#readert2-interface)
- [ReaderT3 (interface)](#readert3-interface)
- [getReaderM](#getreaderm)

---

# ReaderM (interface)

**Signature**

```ts
export interface ReaderM<M> {
  readonly map: <A, B>(f: (a: A) => B) => <R>(ma: ReaderT<M, R, A>) => ReaderT<M, R, B>
  readonly of: <R, A>(a: A) => ReaderT<M, R, A>
  readonly ap: <R, A>(ma: ReaderT<M, R, A>) => <B>(mab: ReaderT<M, R, (a: A) => B>) => ReaderT<M, R, B>
  readonly chain: <A, R, B>(f: (a: A) => ReaderT<M, R, B>) => (ma: ReaderT<M, R, A>) => ReaderT<M, R, B>
  readonly ask: <R>() => ReaderT<M, R, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT<M, R, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <A>(ma: ReaderT<M, R, A>) => ReaderT<M, Q, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT<M, R, A>
  readonly fromM: <R, A>(ma: HKT<M, A>) => ReaderT<M, R, A>
}
```

Added in v3.0.0

# ReaderM1 (interface)

**Signature**

```ts
export interface ReaderM1<M extends URIS> {
  readonly map: <A, B>(f: (a: A) => B) => <R>(ma: ReaderT1<M, R, A>) => ReaderT1<M, R, B>
  readonly of: <R, A>(a: A) => ReaderT1<M, R, A>
  readonly ap: <R, A>(ma: ReaderT1<M, R, A>) => <B>(mab: ReaderT1<M, R, (a: A) => B>) => ReaderT1<M, R, B>
  readonly chain: <A, R, B>(f: (a: A) => ReaderT1<M, R, B>) => (ma: ReaderT1<M, R, A>) => ReaderT1<M, R, B>
  readonly ask: <R>() => ReaderT1<M, R, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT1<M, R, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <A>(ma: ReaderT1<M, R, A>) => ReaderT1<M, Q, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT1<M, R, A>
  readonly fromM: <R, A>(ma: Kind<M, A>) => ReaderT1<M, R, A>
}
```

Added in v3.0.0

# ReaderM2 (interface)

**Signature**

```ts
export interface ReaderM2<M extends URIS2> {
  readonly map: <A, B>(f: (a: A) => B) => <R, E>(ma: ReaderT2<M, R, E, A>) => ReaderT2<M, R, E, B>
  readonly of: <R, E, A>(a: A) => ReaderT2<M, R, E, A>
  readonly ap: <R, E, A>(ma: ReaderT2<M, R, E, A>) => <B>(mab: ReaderT2<M, R, E, (a: A) => B>) => ReaderT2<M, R, E, B>
  readonly chain: <A, R, E, B>(f: (a: A) => ReaderT2<M, R, E, B>) => (ma: ReaderT2<M, R, E, A>) => ReaderT2<M, R, E, B>
  readonly ask: <R, E>() => ReaderT2<M, R, E, R>
  readonly asks: <R, E, A>(f: (r: R) => A) => ReaderT2<M, R, E, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <E, A>(ma: ReaderT2<M, R, E, A>) => ReaderT2<M, Q, E, A>
  readonly fromReader: <R, E, A>(ma: Reader<R, A>) => ReaderT2<M, R, E, A>
  readonly fromM: <R, E, A>(ma: Kind2<M, E, A>) => ReaderT2<M, R, E, A>
}
```

Added in v3.0.0

# ReaderM2C (interface)

**Signature**

```ts
export interface ReaderM2C<M extends URIS2, E> {
  readonly map: <A, B>(f: (a: A) => B) => <R>(ma: ReaderT2<M, R, E, A>) => ReaderT2<M, R, E, B>
  readonly of: <R, A>(a: A) => ReaderT2<M, R, E, A>
  readonly ap: <R, A>(ma: ReaderT2<M, R, E, A>) => <B>(mab: ReaderT2<M, R, E, (a: A) => B>) => ReaderT2<M, R, E, B>
  readonly chain: <A, R, B>(f: (a: A) => ReaderT2<M, R, E, B>) => (ma: ReaderT2<M, R, E, A>) => ReaderT2<M, R, E, B>
  readonly ask: <R>() => ReaderT2<M, R, E, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT2<M, R, E, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <A>(ma: ReaderT2<M, R, E, A>) => ReaderT2<M, Q, E, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT2<M, R, E, A>
  readonly fromM: <R, A>(ma: Kind2<M, E, A>) => ReaderT2<M, R, E, A>
}
```

Added in v3.0.0

# ReaderM3 (interface)

**Signature**

```ts
export interface ReaderM3<M extends URIS3> {
  readonly map: <A, B>(f: (a: A) => B) => <R, U, E>(ma: ReaderT3<M, R, U, E, A>) => ReaderT3<M, R, U, E, B>
  readonly of: <R, U, E, A>(a: A) => ReaderT3<M, R, U, E, A>
  readonly ap: <R, U, E, A>(
    ma: ReaderT3<M, R, U, E, A>
  ) => <B>(mab: ReaderT3<M, R, U, E, (a: A) => B>) => ReaderT3<M, R, U, E, B>
  readonly chain: <A, R, U, E, B>(
    f: (a: A) => ReaderT3<M, R, U, E, B>
  ) => (ma: ReaderT3<M, R, U, E, A>) => ReaderT3<M, R, U, E, B>
  readonly ask: <R, U, E>() => ReaderT3<M, R, U, E, R>
  readonly asks: <R, U, E, A>(f: (r: R) => A) => ReaderT3<M, R, U, E, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <U, E, A>(ma: ReaderT3<M, R, U, E, A>) => ReaderT3<M, Q, U, E, A>
  readonly fromReader: <R, U, E, A>(ma: Reader<R, A>) => ReaderT3<M, R, U, E, A>
  readonly fromM: <R, U, E, A>(ma: Kind3<M, U, E, A>) => ReaderT3<M, R, U, E, A>
}
```

Added in v3.0.0

# ReaderT (interface)

**Signature**

```ts
export interface ReaderT<M, R, A> {
  (r: R): HKT<M, A>
}
```

Added in v2.0.0

# ReaderT1 (interface)

**Signature**

```ts
export interface ReaderT1<M extends URIS, R, A> {
  (r: R): Kind<M, A>
}
```

Added in v2.0.0

# ReaderT2 (interface)

**Signature**

```ts
export interface ReaderT2<M extends URIS2, R, E, A> {
  (r: R): Kind2<M, E, A>
}
```

Added in v2.0.0

# ReaderT3 (interface)

**Signature**

```ts
export interface ReaderT3<M extends URIS3, R, U, E, A> {
  (r: R): Kind3<M, U, E, A>
}
```

Added in v2.0.0

# getReaderM

**Signature**

```ts
export declare function getReaderM<M extends URIS3>(M: Monad3<M>): ReaderM3<M>
export declare function getReaderM<M extends URIS2>(M: Monad2<M>): ReaderM2<M>
export declare function getReaderM<M extends URIS2, E>(M: Monad2C<M, E>): ReaderM2C<M, E>
export declare function getReaderM<M extends URIS>(M: Monad1<M>): ReaderM1<M>
export declare function getReaderM<M>(M: Monad<M>): ReaderM<M>
```

Added in v2.0.0
