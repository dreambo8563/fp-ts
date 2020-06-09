---
title: ReaderEither.ts
nav_order: 56
parent: Modules
---

## ReaderEither overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [ReaderEither (interface)](#readereither-interface)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [alt](#alt)
  - [altReaderTask](#altreadertask)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [applicativeReaderTask](#applicativereadertask)
  - [applyReaderTask](#applyreadertask)
  - [ask](#ask)
  - [asks](#asks)
  - [bifunctorReaderTask](#bifunctorreadertask)
  - [bimap](#bimap)
  - [chain](#chain)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirst](#chainfirst)
  - [chainW](#chainw)
  - [filterOrElse](#filterorelse)
  - [flatten](#flatten)
  - [fold](#fold)
  - [fromEither](#fromeither)
  - [fromEitherK](#fromeitherk)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
  - [functorReaderTask](#functorreadertask)
  - [getApplyMonoid](#getapplymonoid)
  - [getApplySemigroup](#getapplysemigroup)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
  - [getReaderValidationAlt](#getreadervalidationalt)
  - [getReaderValidationApplicative](#getreadervalidationapplicative)
  - [getSemigroup](#getsemigroup)
  - [left](#left)
  - [leftReader](#leftreader)
  - [map](#map)
  - [mapLeft](#mapleft)
  - [monadReaderTask](#monadreadertask)
  - [monadThrowReaderTask](#monadthrowreadertask)
  - [orElse](#orelse)
  - [right](#right)
  - [rightReader](#rightreader)
  - [swap](#swap)

---

# utils

## ReaderEither (interface)

**Signature**

```ts
export interface ReaderEither<R, E, A> extends Reader<R, Either<E, A>> {}
```

Added in v2.0.0

## URI

**Signature**

```ts
export declare const URI: 'ReaderEither'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## alt

**Signature**

```ts
export declare const alt: <R, E, A>(
  that: () => ReaderEither<R, E, A>
) => (fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## altReaderTask

**Signature**

```ts
export declare const altReaderTask: Alt3<'ReaderEither'>
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <R, E, A>(
  fa: ReaderEither<R, E, A>
) => <B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B>
```

Added in v2.0.0

## apFirst

**Signature**

```ts
export declare const apFirst: <R, E, B>(
  fb: ReaderEither<R, E, B>
) => <A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## apSecond

**Signature**

```ts
export declare const apSecond: <R, E, B>(
  fb: ReaderEither<R, E, B>
) => <A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

## applicativeReaderTask

**Signature**

```ts
export declare const applicativeReaderTask: Applicative3<'ReaderEither'>
```

Added in v3.0.0

## applyReaderTask

**Signature**

```ts
export declare const applyReaderTask: Apply3<'ReaderEither'>
```

Added in v3.0.0

## ask

**Signature**

```ts
export declare const ask: <R, E = never>() => ReaderEither<R, E, R>
```

Added in v2.0.0

## asks

**Signature**

```ts
export declare const asks: <R, E = never, A = never>(f: (r: R) => A) => ReaderEither<R, E, A>
```

Added in v2.0.0

## bifunctorReaderTask

**Signature**

```ts
export declare const bifunctorReaderTask: Bifunctor3<'ReaderEither'>
```

Added in v3.0.0

## bimap

**Signature**

```ts
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, B>
```

Added in v2.0.0

## chain

**Signature**

```ts
export declare const chain: <A, R, E, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.4.0

## chainEitherKW

**Signature**

```ts
export declare const chainEitherKW: <D, A, B>(
  f: (a: A) => E.Either<D, B>
) => <R, E>(ma: ReaderEither<R, E, A>) => ReaderEither<R, D | E, B>
```

Added in v2.6.1

## chainFirst

**Signature**

```ts
export declare const chainFirst: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## chainW

**Signature**

```ts
export declare const chainW: <Q, D, A, B>(
  f: (a: A) => ReaderEither<Q, D, B>
) => <R, E>(ma: ReaderEither<R, E, A>) => ReaderEither<R & Q, D | E, B>
```

Added in v2.6.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: ReaderEither<R, E, A>
  ) => ReaderEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
}
```

Added in v2.0.0

## flatten

**Signature**

```ts
export declare const flatten: <R, E, A>(mma: ReaderEither<R, E, ReaderEither<R, E, A>>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## fold

**Signature**

```ts
export declare const fold: <R, E, A, B>(
  onLeft: (e: E) => R.Reader<R, B>,
  onRight: (a: A) => R.Reader<R, B>
) => (ma: ReaderEither<R, E, A>) => R.Reader<R, B>
```

Added in v2.0.0

## fromEither

**Signature**

```ts
export declare const fromEither: <R, E, A>(ma: E.Either<E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## fromEitherK

**Signature**

```ts
export declare function fromEitherK<A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
): <R>(...a: A) => ReaderEither<R, E, B>
```

Added in v2.4.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: () => E) => <R, A>(ma: Option<A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => ReaderEither<U, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderEither<R, E, A>
}
```

Added in v2.0.0

## functorReaderTask

**Signature**

```ts
export declare const functorReaderTask: Functor3<'ReaderEither'>
```

Added in v3.0.0

## getApplyMonoid

**Signature**

```ts
export declare function getApplyMonoid<R, E, A>(M: Monoid<A>): Monoid<ReaderEither<R, E, A>>
```

Added in v2.0.0

## getApplySemigroup

Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
are appended using the provided `Semigroup`

**Signature**

```ts
export declare function getApplySemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>>
```

Added in v2.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, R, A>(
  onLeft: (e: E) => R.Reader<R, A>
) => (ma: ReaderEither<R, E, A>) => R.Reader<R, A>
```

Added in v2.0.0

## getOrElseW

**Signature**

```ts
export declare const getOrElseW: <E, Q, B>(
  onLeft: (e: E) => R.Reader<Q, B>
) => <R, A>(ma: ReaderEither<R, E, A>) => R.Reader<R & Q, B | A>
```

Added in v2.6.0

## getReaderValidationAlt

**Signature**

```ts
export declare function getReaderValidationAlt<E>(S: Semigroup<E>): Alt3C<URI, E>
```

Added in v3.0.0

## getReaderValidationApplicative

**Signature**

```ts
export declare function getReaderValidationApplicative<E>(S: Semigroup<E>): Applicative3C<URI, E>
```

Added in v3.0.0

## getSemigroup

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
appended using the provided `Semigroup`

**Signature**

```ts
export declare function getSemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>>
```

Added in v2.0.0

## left

**Signature**

```ts
export declare const left: <R, E = never, A = never>(e: E) => ReaderEither<R, E, A>
```

Added in v2.0.0

## leftReader

**Signature**

```ts
export declare const leftReader: <R, E = never, A = never>(me: R.Reader<R, E>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

## mapLeft

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, A>
```

Added in v2.0.0

## monadReaderTask

**Signature**

```ts
export declare const monadReaderTask: Monad3<'ReaderEither'>
```

Added in v3.0.0

## monadThrowReaderTask

**Signature**

```ts
export declare const monadThrowReaderTask: MonadThrow3<'ReaderEither'>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <E, R, M, A>(
  onLeft: (e: E) => ReaderEither<R, M, A>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, M, A>
```

Added in v2.0.0

## right

**Signature**

```ts
export declare const right: <R, E = never, A = never>(a: A) => ReaderEither<R, E, A>
```

Added in v2.0.0

## rightReader

**Signature**

```ts
export declare const rightReader: <R, E = never, A = never>(ma: R.Reader<R, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## swap

**Signature**

```ts
export declare const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E>
```

Added in v2.0.0
