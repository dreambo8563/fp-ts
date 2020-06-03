---
title: IO.ts
nav_order: 39
parent: Modules
---

# IO overview

`IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
type `A` and **never fails**. If you want to represent a synchronous computation that may fail, please see
`IOEither`.

`IO` actions are _thunks_ so they are terminated by calling their `()` function application that executes the
computation and returns the result. Ideally each application should call `()` only once for a root value of type
`Task` or `IO` that represents the entire application. However, this might vary a bit depending on how you construct
your application. An application framework with `fp-ts` types might take care of calling `()` for you, while another
application framework without `fp-ts` typing might force you to call `()` at multiple locations whenever the
framework demands less strictly typed values as inputs for its method calls.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [IO (interface)](#io-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
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

# IO (interface)

**Signature**

```ts
export interface IO<A> {
  (): A
}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI

**Signature**

```ts
export declare const URI: 'IO'
```

Added in v2.0.0

# ap

**Signature**

```ts
export declare const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
export declare const apFirst: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
export declare const apSecond: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<B>
```

Added in v2.0.0

# applicativeIO

**Signature**

```ts
export declare const applicativeIO: Applicative1<'IO'>
```

Added in v3.0.0

# applyIO

**Signature**

```ts
export declare const applyIO: Apply1<'IO'>
```

Added in v3.0.0

# chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<B>
```

Added in v2.0.0

# chainFirst

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<A>
```

Added in v2.0.0

# flatten

**Signature**

```ts
export declare const flatten: <A>(mma: IO<IO<A>>) => IO<A>
```

Added in v2.0.0

# fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: IO<A>) => IO<A>
```

Added in v3.0.0

# functorIO

**Signature**

```ts
export declare const functorIO: Functor1<'IO'>
```

Added in v3.0.0

# getMonoid

**Signature**

```ts
export declare function getMonoid<A>(M: Monoid<A>): Monoid<IO<A>>
```

Added in v2.0.0

# getSemigroup

**Signature**

```ts
export declare function getSemigroup<A>(S: Semigroup<A>): Semigroup<IO<A>>
```

Added in v2.0.0

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B>
```

Added in v2.0.0

# monadIO

**Signature**

```ts
export declare const monadIO: Monad1<'IO'>
```

Added in v3.0.0

# monadIOIO

**Signature**

```ts
export declare const monadIOIO: MonadIO1<'IO'>
```

Added in v3.0.0

# of

**Signature**

```ts
export declare const of: <A>(a: A) => IO<A>
```

Added in v2.0.0
