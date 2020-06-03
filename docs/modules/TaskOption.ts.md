---
title: TaskOption.ts
nav_order: 76
parent: Modules
---

# TaskOption overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [TaskOption (interface)](#taskoption-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [alt](#alt)
- [altTaskOption](#alttaskoption)
- [alternativeTaskOption](#alternativetaskoption)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [applicativeTaskOption](#applicativetaskoption)
- [applyTaskOption](#applytaskoption)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [chainOptionK](#chainoptionk)
- [chainTaskK](#chaintaskk)
- [compact](#compact)
- [compactableTaskOption](#compactabletaskoption)
- [filter](#filter)
- [filterMap](#filtermap)
- [filterableTaskOption](#filterabletaskoption)
- [flatten](#flatten)
- [fold](#fold)
- [fromNullable](#fromnullable)
- [fromOption](#fromoption)
- [fromOptionK](#fromoptionk)
- [fromTask](#fromtask)
- [fromTaskEither](#fromtaskeither)
- [functorTaskOption](#functortaskoption)
- [getOrElse](#getorelse)
- [map](#map)
- [mapNullable](#mapnullable)
- [monadTaskOption](#monadtaskoption)
- [none](#none)
- [of](#of)
- [partition](#partition)
- [partitionMap](#partitionmap)
- [separate](#separate)
- [some](#some)
- [toNullable](#tonullable)
- [toUndefined](#toundefined)
- [tryCatch](#trycatch)
- [zero](#zero)

---

# TaskOption (interface)

**Signature**

```ts
export interface TaskOption<A> extends Task<Option<A>> {}
```

Added in v3.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v3.0.0

# URI

**Signature**

```ts
export declare const URI: 'TaskOption'
```

Added in v3.0.0

# alt

**Signature**

```ts
export declare const alt: <A>(that: () => TaskOption<A>) => (fa: TaskOption<A>) => TaskOption<A>
```

Added in v3.0.0

# altTaskOption

**Signature**

```ts
export declare const altTaskOption: Alt1<'TaskOption'>
```

Added in v3.0.0

# alternativeTaskOption

**Signature**

```ts
export declare const alternativeTaskOption: Alternative1<'TaskOption'>
```

Added in v3.0.0

# ap

**Signature**

```ts
export declare const ap: <A>(fa: TaskOption<A>) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v3.0.0

# apFirst

**Signature**

```ts
export declare const apFirst: <B>(fb: TaskOption<B>) => <A>(fa: TaskOption<A>) => TaskOption<A>
```

Added in v3.0.0

# apSecond

**Signature**

```ts
export declare const apSecond: <B>(fb: TaskOption<B>) => <A>(fa: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

# applicativeTaskOption

**Signature**

```ts
export declare const applicativeTaskOption: Applicative1<'TaskOption'>
```

Added in v3.0.0

# applyTaskOption

**Signature**

```ts
export declare const applyTaskOption: Apply1<'TaskOption'>
```

Added in v3.0.0

# chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

# chainFirst

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<A>
```

Added in v2.0.0

# chainOptionK

**Signature**

```ts
export declare const chainOptionK: <A, B>(f: (a: A) => O.Option<B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

# chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(f: (a: A) => T.Task<B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

# compact

**Signature**

```ts
export declare const compact: <A>(fa: TaskOption<O.Option<A>>) => TaskOption<A>
```

Added in v3.0.0

# compactableTaskOption

**Signature**

```ts
export declare const compactableTaskOption: Compactable1<'TaskOption'>
```

Added in v3.0.0

# filter

**Signature**

```ts
export declare const filter: Filter1<'TaskOption'>
```

Added in v3.0.0

# filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

# filterableTaskOption

**Signature**

```ts
export declare const filterableTaskOption: Filterable1<'TaskOption'>
```

Added in v3.0.0

# flatten

**Signature**

```ts
export declare const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A>
```

Added in v2.0.0

# fold

**Signature**

```ts
export declare const fold: <A, B>(
  onNone: () => T.Task<B>,
  onSome: (a: A) => T.Task<B>
) => (as: TaskOption<A>) => T.Task<B>
```

Added in v3.0.0

# fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => TaskOption<NonNullable<A>>
```

Added in v3.0.0

# fromOption

**Signature**

```ts
export declare const fromOption: <A>(ma: O.Option<A>) => TaskOption<A>
```

Added in v3.0.0

# fromOptionK

**Signature**

```ts
export declare function fromOptionK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
): (...a: A) => TaskOption<B>
```

Added in v3.0.0

# fromTask

**Signature**

```ts
export declare const fromTask: <A>(as: T.Task<A>) => TaskOption<A>
```

Added in v3.0.0

# fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <A>(ma: TaskEither<any, A>) => TaskOption<A>
```

Added in v3.0.0

# functorTaskOption

**Signature**

```ts
export declare const functorTaskOption: Functor1<'TaskOption'>
```

Added in v3.0.0

# getOrElse

**Signature**

```ts
export declare const getOrElse: <A>(onNone: () => T.Task<A>) => (as: TaskOption<A>) => T.Task<A>
```

Added in v3.0.0

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

# mapNullable

**Signature**

```ts
export declare function mapNullable<A, B>(f: (a: A) => B | null | undefined): (ma: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

# monadTaskOption

**Signature**

```ts
export declare const monadTaskOption: Monad1<'TaskOption'>
```

Added in v3.0.0

# none

**Signature**

```ts
export declare const none: TaskOption<never>
```

Added in v3.0.0

# of

**Signature**

```ts
export declare const of: <A>(a: A) => TaskOption<A>
```

Added in v3.0.0

# partition

**Signature**

```ts
export declare const partition: Partition1<'TaskOption'>
```

Added in v3.0.0

# partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: TaskOption<A>) => Separated<TaskOption<B>, TaskOption<C>>
```

Added in v3.0.0

# separate

**Signature**

```ts
export declare const separate: <A, B>(fa: TaskOption<Either<A, B>>) => Separated<TaskOption<A>, TaskOption<B>>
```

Added in v3.0.0

# some

**Signature**

```ts
export declare const some: <A>(a: A) => TaskOption<A>
```

Added in v3.0.0

# toNullable

**Signature**

```ts
export declare const toNullable: <A>(ma: TaskOption<A>) => T.Task<A>
```

Added in v3.0.0

# toUndefined

**Signature**

```ts
export declare const toUndefined: <A>(ma: TaskOption<A>) => T.Task<A>
```

Added in v3.0.0

# tryCatch

**Signature**

```ts
export declare function tryCatch<A>(f: Lazy<Promise<A>>): TaskOption<A>
```

Added in v3.0.0

# zero

**Signature**

```ts
export declare const zero: <A>() => TaskOption<A>
```

Added in v3.0.0
