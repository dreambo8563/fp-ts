---
title: ReaderTask.ts
nav_order: 57
parent: Modules
---

## ReaderTask overview

Added in v2.3.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [applicativeReaderTaskPar](#applicativereadertaskpar)
  - [applicativeReaderTaskSeq](#applicativereadertaskseq)
- [utils](#utils)
  - [ReaderTask (interface)](#readertask-interface)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [applyReaderTask](#applyreadertask)
  - [ask](#ask)
  - [asks](#asks)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [chainIOK](#chainiok)
  - [chainTaskK](#chaintaskk)
  - [flatten](#flatten)
  - [fromIO](#fromio)
  - [fromIOK](#fromiok)
  - [fromReader](#fromreader)
  - [fromTask](#fromtask)
  - [fromTaskK](#fromtaskk)
  - [functorReaderTask](#functorreadertask)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [map](#map)
  - [monadIOReaderTask](#monadioreadertask)
  - [monadReaderTask](#monadreadertask)
  - [monadTaskReaderTask](#monadtaskreadertask)
  - [of](#of)

---

# instances

## applicativeReaderTaskPar

**Signature**

```ts
export declare const applicativeReaderTaskPar: Applicative2<'ReaderTask'>
```

Added in v3.0.0

## applicativeReaderTaskSeq

**Signature**

```ts
export declare const applicativeReaderTaskSeq: Applicative2<'ReaderTask'>
```

Added in v3.0.0

# utils

## ReaderTask (interface)

**Signature**

```ts
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}
```

Added in v2.3.0

## URI

**Signature**

```ts
export declare const URI: 'ReaderTask'
```

Added in v2.3.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.3.0

## ap

**Signature**

```ts
export declare const ap: <R, A>(fa: ReaderTask<R, A>) => <B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B>
```

Added in v2.3.0

## apFirst

**Signature**

```ts
export declare const apFirst: <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v2.3.0

## apSecond

**Signature**

```ts
export declare const apSecond: <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.3.0

## applyReaderTask

**Signature**

```ts
export declare const applyReaderTask: Apply2<'ReaderTask'>
```

Added in v3.0.0

## ask

**Signature**

```ts
export declare const ask: <R>() => ReaderTask<R, R>
```

Added in v2.3.0

## asks

**Signature**

```ts
export declare const asks: <R, A = never>(f: (r: R) => A) => ReaderTask<R, A>
```

Added in v2.3.0

## chain

**Signature**

```ts
export declare const chain: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.3.0

## chainFirst

**Signature**

```ts
export declare const chainFirst: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v2.3.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.4.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(f: (a: A) => T.Task<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.4.0

## flatten

**Signature**

```ts
export declare const flatten: <R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A>
```

Added in v2.3.0

## fromIO

**Signature**

```ts
export declare const fromIO: <R, A>(ma: IO<A>) => ReaderTask<R, A>
```

Added in v2.3.0

## fromIOK

**Signature**

```ts
export declare function fromIOK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
): <R>(...a: A) => ReaderTask<R, B>
```

Added in v2.4.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A = never>(ma: R.Reader<R, A>) => ReaderTask<R, A>
```

Added in v2.3.0

## fromTask

**Signature**

```ts
export declare const fromTask: <R, A>(ma: T.Task<A>) => ReaderTask<R, A>
```

Added in v2.3.0

## fromTaskK

**Signature**

```ts
export declare function fromTaskK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
): <R>(...a: A) => ReaderTask<R, B>
```

Added in v2.4.0

## functorReaderTask

**Signature**

```ts
export declare const functorReaderTask: Functor2<'ReaderTask'>
```

Added in v3.0.0

## getMonoid

**Signature**

```ts
export declare function getMonoid<R, A>(M: Monoid<A>): Monoid<ReaderTask<R, A>>
```

Added in v2.3.0

## getSemigroup

**Signature**

```ts
export declare function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>>
```

Added in v2.3.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.3.0

## monadIOReaderTask

**Signature**

```ts
export declare const monadIOReaderTask: MonadIO2<'ReaderTask'>
```

Added in v3.0.0

## monadReaderTask

**Signature**

```ts
export declare const monadReaderTask: Monad2<'ReaderTask'>
```

Added in v3.0.0

## monadTaskReaderTask

**Signature**

```ts
export declare const monadTaskReaderTask: MonadTask2<'ReaderTask'>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <R, A>(a: A) => ReaderTask<R, A>
```

Added in v2.3.0
