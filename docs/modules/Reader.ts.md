---
title: Reader.ts
nav_order: 56
parent: Modules
---

# Reader overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Reader (interface)](#reader-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [applicativeReader](#applicativereader)
- [applyReader](#applyreader)
- [ask](#ask)
- [asks](#asks)
- [categoryReader](#categoryreader)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [chainW](#chainw)
- [flatten](#flatten)
- [functorReader](#functorreader)
- [getMonoid](#getmonoid)
- [getSemigroup](#getsemigroup)
- [local](#local)
- [map](#map)
- [monadReader](#monadreader)
- [of](#of)
- [pipe](#pipe)
- [profunctorReader](#profunctorreader)
- [promap](#promap)
- [semigroupoidReader](#semigroupoidreader)

---

# Reader (interface)

**Signature**

```ts
export interface Reader<R, A> {
  (r: R): A
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
export declare const URI: 'Reader'
```

Added in v2.0.0

# ap

**Signature**

```ts
export declare const ap: <R, A>(fa: Reader<R, A>) => <B>(fab: Reader<R, (a: A) => B>) => Reader<R, B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
export declare const apFirst: <R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>) => Reader<R, A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
export declare const apSecond: <R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>) => Reader<R, B>
```

Added in v2.0.0

# applicativeReader

**Signature**

```ts
export declare const applicativeReader: Applicative2<'Reader'>
```

Added in v3.0.0

# applyReader

**Signature**

```ts
export declare const applyReader: Apply2<'Reader'>
```

Added in v3.0.0

# ask

Reads the current context

**Signature**

```ts
export declare const ask: <R>() => Reader<R, R>
```

Added in v2.0.0

# asks

Projects a value from the global context in a Reader

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => Reader<R, A>
```

Added in v2.0.0

# categoryReader

**Signature**

```ts
export declare const categoryReader: Category2<'Reader'>
```

Added in v3.0.0

# chain

**Signature**

```ts
export declare const chain: <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, B>
```

Added in v2.0.0

# chainFirst

**Signature**

```ts
export declare const chainFirst: <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, A>
```

Added in v2.0.0

# chainW

**Signature**

```ts
export declare const chainW: <A, Q, B>(f: (a: A) => Reader<Q, B>) => <R>(ma: Reader<R, A>) => Reader<R & Q, B>
```

Added in v2.6.0

# flatten

**Signature**

```ts
export declare const flatten: <R, A>(mma: Reader<R, Reader<R, A>>) => Reader<R, A>
```

Added in v2.0.0

# functorReader

**Signature**

```ts
export declare const functorReader: Functor2<'Reader'>
```

Added in v3.0.0

# getMonoid

**Signature**

```ts
export declare function getMonoid<R, A>(M: Monoid<A>): Monoid<Reader<R, A>>
```

Added in v2.0.0

# getSemigroup

**Signature**

```ts
export declare function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<Reader<R, A>>
```

Added in v2.0.0

# local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <Q, R>(f: (d: Q) => R) => <A>(ma: Reader<R, A>) => Reader<Q, A>
```

Added in v2.0.0

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B>
```

Added in v2.0.0

# monadReader

**Signature**

```ts
export declare const monadReader: Monad2<'Reader'>
```

Added in v3.0.0

# of

**Signature**

```ts
export declare const of: <R, A>(a: A) => Reader<R, A>
```

Added in v2.0.0

# pipe

**Signature**

```ts
export declare const pipe: <B, C>(fbc: Reader<B, C>) => <A>(fab: Reader<A, B>) => Reader<A, C>
```

Added in v2.0.0

# profunctorReader

**Signature**

```ts
export declare const profunctorReader: Profunctor2<'Reader'>
```

Added in v3.0.0

# promap

**Signature**

```ts
export declare const promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Reader<E, A>) => Reader<D, B>
```

Added in v2.0.0

# semigroupoidReader

**Signature**

```ts
export declare const semigroupoidReader: Semigroupoid2<'Reader'>
```

Added in v3.0.0
