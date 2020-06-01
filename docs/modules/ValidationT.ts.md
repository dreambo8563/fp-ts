---
title: ValidationT.ts
nav_order: 94
parent: Modules
---

# ValidationT overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [ValidationM (interface)](#validationm-interface)
- [ValidationT (interface)](#validationt-interface)
- [ValidationT1 (type alias)](#validationt1-type-alias)
- [ValidationT2 (type alias)](#validationt2-type-alias)
- [alt](#alt)

---

# ValidationM (interface)

**Signature**

```ts
export interface ValidationM<M, E> {
  readonly alt: <A>(that: () => ValidationT<M, E, A>) => (fa: ValidationT<M, E, A>) => ValidationT<M, E, A>
}
```

Added in v3.0.0

# ValidationT (interface)

**Signature**

```ts
export interface ValidationT<M, E, A> extends HKT<M, Either<E, A>> {}
```

Added in v2.0.0

# ValidationT1 (type alias)

**Signature**

```ts
export type ValidationT1<M extends URIS, E, A> = Kind<M, Either<E, A>>
```

Added in v2.0.0

# ValidationT2 (type alias)

**Signature**

```ts
export type ValidationT2<M extends URIS2, R, E, A> = Kind2<M, R, Either<E, A>>
```

Added in v2.0.0

# alt

**Signature**

```ts
export declare function alt<E, M extends URIS2>(
  S: Semigroup<E>,
  M: Monad2<M>
): <R, A>(that: () => ValidationT2<M, R, E, A>) => (fa: ValidationT2<M, R, E, A>) => ValidationT2<M, R, E, A>
export declare function alt<E, M extends URIS>(
  S: Semigroup<E>,
  M: Monad1<M>
): <A>(that: () => ValidationT1<M, E, A>) => (fa: ValidationT1<M, E, A>) => ValidationT1<M, E, A>
export declare function alt<E, M>(
  S: Semigroup<E>,
  M: Monad<M>
): <A>(that: () => ValidationT<M, E, A>) => (fa: ValidationT<M, E, A>) => ValidationT<M, E, A>
```

Added in v3.0.0
