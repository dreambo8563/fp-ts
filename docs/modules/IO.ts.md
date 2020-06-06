---
title: IO.ts
nav_order: 38
parent: Modules
---

## IO overview

`IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
type `A` and **never fails**. If you want to represent a synchronous computation that may fail, please see
`IOEither`.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [IO (interface)](#io-interface)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [applicativeIO](#applicativeio)
  - [applyIO](#applyio)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
  - [fromIO](#fromio)
  - [functorIO](#functorio)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [map](#map)
  - [monadIO](#monadio)
  - [monadIOIO](#monadioio)
  - [of](#of)

---

# utils

## IO (interface)

**Signature**

```ts
export interface IO<A> {
  (): A
}
```

Added in v2.0.0

## URI

**Signature**

```ts
export declare const URI: 'IO'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## ap

**Signature**

```ts
export declare const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B>
```

Added in v2.0.0

## apFirst

**Signature**

```ts
export declare const apFirst: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<A>
```

Added in v2.0.0

## apSecond

**Signature**

```ts
export declare const apSecond: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<B>
```

Added in v2.0.0

## applicativeIO

**Signature**

```ts
export declare const applicativeIO: Applicative1<'IO'>
```

Added in v3.0.0

## applyIO

**Signature**

```ts
export declare const applyIO: Apply1<'IO'>
```

Added in v3.0.0

## chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<B>
```

Added in v2.0.0

## chainFirst

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<A>
```

Added in v2.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: IO<IO<A>>) => IO<A>
```

Added in v2.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: IO<A>) => IO<A>
```

Added in v3.0.0

## functorIO

**Signature**

```ts
export declare const functorIO: Functor1<'IO'>
```

Added in v3.0.0

## getMonoid

**Signature**

```ts
export declare function getMonoid<A>(M: Monoid<A>): Monoid<IO<A>>
```

Added in v2.0.0

## getSemigroup

**Signature**

```ts
export declare function getSemigroup<A>(S: Semigroup<A>): Semigroup<IO<A>>
```

Added in v2.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B>
```

Added in v2.0.0

## monadIO

**Signature**

```ts
export declare const monadIO: Monad1<'IO'>
```

Added in v3.0.0

## monadIOIO

**Signature**

```ts
export declare const monadIOIO: MonadIO1<'IO'>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => IO<A>
```

Added in v2.0.0
