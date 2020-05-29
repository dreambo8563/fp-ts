---
title: Foldable.ts
nav_order: 30
parent: Modules
---

# Foldable overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Foldable (interface)](#foldable-interface)
- [Foldable1 (interface)](#foldable1-interface)
- [Foldable2 (interface)](#foldable2-interface)
- [Foldable2C (interface)](#foldable2c-interface)
- [Foldable3 (interface)](#foldable3-interface)
- [Foldable3C (interface)](#foldable3c-interface)
- [Foldable4 (interface)](#foldable4-interface)
- [FoldableComposition (interface)](#foldablecomposition-interface)
- [FoldableComposition11 (interface)](#foldablecomposition11-interface)
- [FoldableComposition12 (interface)](#foldablecomposition12-interface)
- [FoldableComposition12C (interface)](#foldablecomposition12c-interface)
- [FoldableComposition21 (interface)](#foldablecomposition21-interface)
- [FoldableComposition22 (interface)](#foldablecomposition22-interface)
- [FoldableComposition22C (interface)](#foldablecomposition22c-interface)
- [FoldableComposition2C1 (interface)](#foldablecomposition2c1-interface)
- [foldM](#foldm)
- [getFoldableComposition](#getfoldablecomposition)
- [intercalate](#intercalate)

---

# Foldable (interface)

**Signature**

```ts
export interface Foldable<F> {
  readonly URI: F
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: HKT<F, A>) => B
}
```

Added in v3.0.0

# Foldable1 (interface)

**Signature**

```ts
export interface Foldable1<F extends URIS> {
  readonly URI: F
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Kind<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Kind<F, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Kind<F, A>) => B
}
```

Added in v3.0.0

# Foldable2 (interface)

**Signature**

```ts
export interface Foldable2<F extends URIS2> {
  readonly URI: F
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: Kind2<F, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Kind2<F, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: Kind2<F, E, A>) => B
}
```

Added in v3.0.0

# Foldable2C (interface)

**Signature**

```ts
export interface Foldable2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Kind2<F, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Kind2<F, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Kind2<F, E, A>) => B
}
```

Added in v3.0.0

# Foldable3 (interface)

**Signature**

```ts
export interface Foldable3<F extends URIS3> {
  readonly URI: F
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <R, E>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
}
```

Added in v3.0.0

# Foldable3C (interface)

**Signature**

```ts
export interface Foldable3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <R>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <R>(fa: Kind3<F, R, E, A>) => B
}
```

Added in v3.0.0

# Foldable4 (interface)

**Signature**

```ts
export interface Foldable4<F extends URIS4> {
  readonly URI: F
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
}
```

Added in v3.0.0

# FoldableComposition (interface)

**Signature**

```ts
export interface FoldableComposition<F, G> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fga: HKT<F, HKT<G, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fga: HKT<F, HKT<G, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fga: HKT<F, HKT<G, A>>) => B
}
```

Added in v3.0.0

# FoldableComposition11 (interface)

**Signature**

```ts
export interface FoldableComposition11<F extends URIS, G extends URIS> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fga: Kind<F, Kind<G, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fga: Kind<F, Kind<G, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fga: Kind<F, Kind<G, A>>) => B
}
```

Added in v3.0.0

# FoldableComposition12 (interface)

**Signature**

```ts
export interface FoldableComposition12<F extends URIS, G extends URIS2> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fga: Kind<F, Kind2<G, E, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fga: Kind<F, Kind2<G, E, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fga: Kind<F, Kind2<G, E, A>>) => B
}
```

Added in v3.0.0

# FoldableComposition12C (interface)

**Signature**

```ts
export interface FoldableComposition12C<F extends URIS, G extends URIS2, E> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fga: Kind<F, Kind2<G, E, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fga: Kind<F, Kind2<G, E, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fga: Kind<F, Kind2<G, E, A>>) => B
}
```

Added in v3.0.0

# FoldableComposition21 (interface)

**Signature**

```ts
export interface FoldableComposition21<F extends URIS2, G extends URIS> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fga: Kind2<F, E, Kind<G, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fga: Kind2<F, E, Kind<G, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fga: Kind2<F, E, Kind<G, A>>) => B
}
```

Added in v3.0.0

# FoldableComposition22 (interface)

**Signature**

```ts
export interface FoldableComposition22<F extends URIS2, G extends URIS2> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <D, E>(fga: Kind2<F, D, Kind2<G, E, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <D, E>(fga: Kind2<F, D, Kind2<G, E, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <D, E>(fga: Kind2<F, D, Kind2<G, E, A>>) => B
}
```

Added in v3.0.0

# FoldableComposition22C (interface)

**Signature**

```ts
export interface FoldableComposition22C<F extends URIS2, G extends URIS2, E> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <D>(fga: Kind2<F, D, Kind2<G, E, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <D>(fga: Kind2<F, D, Kind2<G, E, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <D>(fga: Kind2<F, D, Kind2<G, E, A>>) => B
}
```

Added in v3.0.0

# FoldableComposition2C1 (interface)

**Signature**

```ts
export interface FoldableComposition2C1<F extends URIS2, G extends URIS, E> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fga: Kind2<F, E, Kind<G, A>>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fga: Kind2<F, E, Kind<G, A>>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fga: Kind2<F, E, Kind<G, A>>) => B
}
```

Added in v3.0.0

# foldM

Similar to 'reduce', but the result is encapsulated in a monad.

Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.

**Signature**

```ts
export declare function foldM<M extends URIS3, F extends URIS>(
  M: Monad3<M>,
  F: Foldable1<F>
): <R, E, A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind3<M, R, E, B>) => Kind3<M, R, E, B>
export declare function foldM<M extends URIS3, F extends URIS, E>(
  M: Monad3C<M, E>,
  F: Foldable1<F>
): <R, A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind3<M, R, E, B>) => Kind3<M, R, E, B>
export declare function foldM<M extends URIS2, F extends URIS>(
  M: Monad2<M>,
  F: Foldable1<F>
): <E, A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind2<M, E, B>) => Kind2<M, E, B>
export declare function foldM<M extends URIS2, F extends URIS, E>(
  M: Monad2C<M, E>,
  F: Foldable1<F>
): <A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind2<M, E, B>) => Kind2<M, E, B>
export declare function foldM<M extends URIS, F extends URIS>(
  M: Monad1<M>,
  F: Foldable1<F>
): <A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind<M, B>) => Kind<M, B>
export declare function foldM<M, F>(
  M: Monad<M>,
  F: Foldable<F>
): <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => HKT<M, B>) => HKT<M, B>
```

**Example**

```ts
import { foldM } from 'fp-ts/lib/Foldable'
import { monadOption, some } from 'fp-ts/lib/Option'
import { make, tree } from 'fp-ts/lib/Tree'

const t = make(1, [make(2, []), make(3, []), make(4, [])])
assert.deepStrictEqual(
  foldM(monadOption, tree)(t, 0, (b, a) => (a > 2 ? some(b + a) : some(b))),
  some(7)
)
```

Added in v3.0.0

# getFoldableComposition

Returns the composition of two foldables

**Signature**

```ts
export declare function getFoldableComposition<F extends URIS2, G extends URIS2, E>(
  F: Foldable2<F>,
  G: Foldable2C<G, E>
): FoldableComposition22C<F, G, E>
export declare function getFoldableComposition<F extends URIS2, G extends URIS2>(
  F: Foldable2<F>,
  G: Foldable2<G>
): FoldableComposition22<F, G>
export declare function getFoldableComposition<F extends URIS2, G extends URIS, E>(
  F: Foldable2C<F, E>,
  G: Foldable1<G>
): FoldableComposition2C1<F, G, E>
export declare function getFoldableComposition<F extends URIS2, G extends URIS>(
  F: Foldable2<F>,
  G: Foldable1<G>
): FoldableComposition21<F, G>
export declare function getFoldableComposition<F extends URIS, G extends URIS2, E>(
  F: Foldable1<F>,
  G: Foldable2C<G, E>
): FoldableComposition12C<F, G, E>
export declare function getFoldableComposition<F extends URIS, G extends URIS2>(
  F: Foldable1<F>,
  G: Foldable2<G>
): FoldableComposition12<F, G>
export declare function getFoldableComposition<F extends URIS, G extends URIS>(
  F: Foldable1<F>,
  G: Foldable1<G>
): FoldableComposition11<F, G>
export declare function getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G>
```

**Example**

```ts
import { getFoldableComposition } from 'fp-ts/lib/Foldable'
import { array } from 'fp-ts/lib/Array'
import { foldableOption, some, none } from 'fp-ts/lib/Option'
import { monoidString } from 'fp-ts/lib/Monoid'
import { pipe } from 'fp-ts/lib/function'

const F = getFoldableComposition(array, foldableOption)
assert.strictEqual(pipe([some('a'), some('b'), some('c')], F.reduce('', monoidString.concat)), 'abc')
assert.strictEqual(pipe([some('a'), none, some('c')], F.reduce('', monoidString.concat)), 'ac')
```

Added in v3.0.0

# intercalate

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator

**Signature**

```ts
export declare function intercalate<M, F extends URIS3>(
  M: Monoid<M>,
  F: Foldable3<F>
): <R, E>(sep: M, fm: Kind3<F, R, E, M>) => M
export declare function intercalate<M, F extends URIS2>(
  M: Monoid<M>,
  F: Foldable2<F>
): <E>(sep: M, fm: Kind2<F, E, M>) => M
export declare function intercalate<M, F extends URIS2, E>(
  M: Monoid<M>,
  F: Foldable2C<F, E>
): (sep: M, fm: Kind2<F, E, M>) => M
export declare function intercalate<M, F extends URIS>(M: Monoid<M>, F: Foldable1<F>): (sep: M, fm: Kind<F, M>) => M
export declare function intercalate<M, F>(M: Monoid<M>, F: Foldable<F>): (sep: M, fm: HKT<F, M>) => M
```

**Example**

```ts
import { intercalate } from 'fp-ts/lib/Foldable'
import { monoidString } from 'fp-ts/lib/Monoid'
import { make, tree } from 'fp-ts/lib/Tree'

const t = make('a', [make('b', []), make('c', []), make('d', [])])
assert.strictEqual(intercalate(monoidString, tree)('|', t), 'a|b|c|d')
```

Added in v3.0.0
