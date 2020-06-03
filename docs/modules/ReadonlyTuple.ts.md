---
title: ReadonlyTuple.ts
nav_order: 65
parent: Modules
---

# ReadonlyTuple overview

Added in v2.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [bifunctorReadonlyTuple](#bifunctorreadonlytuple)
- [bimap](#bimap)
- [comonadReadonlyTuple](#comonadreadonlytuple)
- [duplicate](#duplicate)
- [extend](#extend)
- [extendReadonlyTuple](#extendreadonlytuple)
- [extract](#extract)
- [foldMap](#foldmap)
- [foldableReadonlyTuple](#foldablereadonlytuple)
- [fst](#fst)
- [getApplicative](#getapplicative)
- [getApply](#getapply)
- [getChain](#getchain)
- [getMonad](#getmonad)
- [map](#map)
- [mapLeft](#mapleft)
- [pipe](#pipe)
- [reduce](#reduce)
- [reduceRight](#reduceright)
- [semigroupoidReadonlyTuple](#semigroupoidreadonlytuple)
- [sequence](#sequence)
- [snd](#snd)
- [swap](#swap)
- [traversableReadonlyTuple](#traversablereadonlytuple)
- [traverse](#traverse)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.5.0

# URI

**Signature**

```ts
export declare const URI: 'ReadonlyTuple'
```

Added in v2.5.0

# bifunctorReadonlyTuple

**Signature**

```ts
export declare const bifunctorReadonlyTuple: Bifunctor2<'ReadonlyTuple'>
```

Added in v3.0.0

# bimap

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: readonly [A, E]) => readonly [B, G]
```

Added in v2.5.0

# comonadReadonlyTuple

**Signature**

```ts
export declare const comonadReadonlyTuple: Comonad2<'ReadonlyTuple'>
```

Added in v3.0.0

# duplicate

**Signature**

```ts
export declare const duplicate: <E, A>(ma: readonly [A, E]) => readonly [readonly [A, E], E]
```

Added in v2.5.0

# extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (fa: readonly [A, E]) => B) => (wa: readonly [A, E]) => readonly [B, E]
```

Added in v2.5.0

# extendReadonlyTuple

**Signature**

```ts
export declare const extendReadonlyTuple: Extend2<'ReadonlyTuple'>
```

Added in v3.0.0

# extract

**Signature**

```ts
export declare const extract: <E, A>(wa: readonly [A, E]) => A
```

Added in v2.6.2

# foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: readonly [A, E]) => M
```

Added in v2.5.0

# foldableReadonlyTuple

**Signature**

```ts
export declare const foldableReadonlyTuple: Foldable2<'ReadonlyTuple'>
```

Added in v3.0.0

# fst

**Signature**

```ts
export declare function fst<A, S>(sa: readonly [A, S]): A
```

Added in v2.5.0

# getApplicative

**Signature**

```ts
export declare function getApplicative<S>(M: Monoid<S>): Applicative2C<URI, S>
```

Added in v2.5.0

# getApply

**Signature**

```ts
export declare function getApply<S>(S: Semigroup<S>): Apply2C<URI, S>
```

Added in v2.5.0

# getChain

**Signature**

```ts
export declare function getChain<S>(S: Semigroup<S>): Chain2C<URI, S>
```

Added in v2.5.0

# getMonad

**Signature**

```ts
export declare function getMonad<S>(M: Monoid<S>): Monad2C<URI, S>
```

Added in v2.5.0

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: readonly [A, E]) => readonly [B, E]
```

Added in v2.5.0

# mapLeft

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: readonly [A, E]) => readonly [A, G]
```

Added in v2.5.0

# pipe

**Signature**

```ts
export declare const pipe: <B, C>(fbc: readonly [C, B]) => <A>(fab: readonly [B, A]) => readonly [C, A]
```

Added in v3.0.0

# reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: readonly [A, E]) => B
```

Added in v2.5.0

# reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: readonly [A, E]) => B
```

Added in v2.5.0

# semigroupoidReadonlyTuple

**Signature**

```ts
export declare const semigroupoidReadonlyTuple: Semigroupoid2<'ReadonlyTuple'>
```

Added in v3.0.0

# sequence

**Signature**

```ts
export declare const sequence: Sequence2<'ReadonlyTuple'>
```

Added in v3.0.0

# snd

**Signature**

```ts
export declare function snd<A, S>(sa: readonly [A, S]): S
```

Added in v2.5.0

# swap

**Signature**

```ts
export declare function swap<A, S>(sa: readonly [A, S]): readonly [S, A]
```

Added in v2.5.0

# traversableReadonlyTuple

**Signature**

```ts
export declare const traversableReadonlyTuple: Traversable2<'ReadonlyTuple'>
```

Added in v3.0.0

# traverse

**Signature**

```ts
export declare const traverse: Traverse2<'ReadonlyTuple'>
```

Added in v3.0.0
