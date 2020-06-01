---
title: TheseT.ts
nav_order: 87
parent: Modules
---

# TheseT overview

Added in v2.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [TheseT (interface)](#theset-interface)
- [TheseT1 (type alias)](#theset1-type-alias)
- [TheseT2 (type alias)](#theset2-type-alias)
- [chain](#chain)

---

# TheseT (interface)

**Signature**

```ts
export interface TheseT<M, E, A> extends HKT<M, TH.These<E, A>> {}
```

Added in v2.4.0

# TheseT1 (type alias)

**Signature**

```ts
export type TheseT1<M extends URIS, E, A> = Kind<M, TH.These<E, A>>
```

Added in v2.4.0

# TheseT2 (type alias)

**Signature**

```ts
export type TheseT2<M extends URIS2, R, E, A> = Kind2<M, R, TH.These<E, A>>
```

Added in v2.4.0

# chain

**Signature**

```ts
export declare function chain<M extends URIS2>(
  F: Monad2<M>
): <E>(
  S: Semigroup<E>
) => <A, R, B>(f: (a: A) => TheseT2<M, R, E, B>) => (fa: TheseT2<M, R, E, A>) => TheseT2<M, R, E, B>
export declare function chain<M extends URIS>(
  F: Monad1<M>
): <E>(S: Semigroup<E>) => <A, B>(f: (a: A) => TheseT1<M, E, B>) => (fa: TheseT1<M, E, A>) => TheseT1<M, E, B>
export declare function chain<M>(
  F: Monad<M>
): <E>(S: Semigroup<E>) => <A, B>(f: (a: A) => TheseT<M, E, B>) => (fa: TheseT<M, E, A>) => TheseT<M, E, B>
```

Added in v3.0.0
