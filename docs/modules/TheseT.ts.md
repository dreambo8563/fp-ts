---
title: TheseT.ts
nav_order: 87
parent: Modules
---

# TheseT overview

Added in v2.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [TheseM (interface)](#thesem-interface)
- [TheseM1 (interface)](#thesem1-interface)
- [TheseM2 (interface)](#thesem2-interface)
- [TheseT (interface)](#theset-interface)
- [TheseT1 (type alias)](#theset1-type-alias)
- [TheseT2 (type alias)](#theset2-type-alias)
- [getTheseM](#getthesem)

---

# TheseM (interface)

**Signature**

```ts
export interface TheseM<M> {
  readonly map: <A, B>(f: (a: A) => B) => <E>(fa: TheseT<M, E, A>) => TheseT<M, E, B>
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TheseT<M, E, A>) => TheseT<M, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TheseT<M, E, A>) => TheseT<M, G, A>
  readonly fold: <E, R, A>(
    onLeft: (e: E) => HKT<M, R>,
    onRight: (a: A) => HKT<M, R>,
    onBoth: (e: E, a: A) => HKT<M, R>
  ) => (fa: TheseT<M, E, A>) => HKT<M, R>
  readonly swap: <E, A>(fa: TheseT<M, E, A>) => TheseT<M, A, E>
  readonly rightM: <E, A>(ma: HKT<M, A>) => TheseT<M, E, A>
  readonly leftM: <E, A>(me: HKT<M, E>) => TheseT<M, E, A>
  readonly left: <E, A>(e: E) => TheseT<M, E, A>
  readonly right: <E, A>(a: A) => TheseT<M, E, A>
  readonly both: <E, A>(e: E, a: A) => TheseT<M, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <E, A>(e: () => E, a: () => A) => (fa: TheseT<M, E, A>) => HKT<M, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <A, B>(f: (a: A) => B) => (ma: TheseT<M, E, A>) => TheseT<M, E, B>
    readonly of: <A>(a: A) => TheseT<M, E, A>
    readonly ap: <A>(ma: TheseT<M, E, A>) => <B>(mab: TheseT<M, E, (a: A) => B>) => TheseT<M, E, B>
    readonly chain: <A, B>(f: (a: A) => TheseT<M, E, B>) => (ma: TheseT<M, E, A>) => TheseT<M, E, B>
  }
}
```

Added in v3.0.0

# TheseM1 (interface)

**Signature**

```ts
export interface TheseM1<M extends URIS> {
  readonly map: <A, B>(f: (a: A) => B) => <E>(fa: TheseT1<M, E, A>) => TheseT1<M, E, B>
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TheseT1<M, E, A>) => TheseT1<M, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TheseT1<M, E, A>) => TheseT1<M, G, A>
  readonly fold: <E, R, A>(
    onLeft: (e: E) => Kind<M, R>,
    onRight: (a: A) => Kind<M, R>,
    onBoth: (e: E, a: A) => Kind<M, R>
  ) => (fa: TheseT1<M, E, A>) => Kind<M, R>
  readonly swap: <E, A>(fa: TheseT1<M, E, A>) => TheseT1<M, A, E>
  readonly rightM: <E, A>(ma: Kind<M, A>) => TheseT1<M, E, A>
  readonly leftM: <E, A>(me: Kind<M, E>) => TheseT1<M, E, A>
  readonly left: <E, A>(e: E) => TheseT1<M, E, A>
  readonly right: <E, A>(a: A) => TheseT1<M, E, A>
  readonly both: <E, A>(e: E, a: A) => TheseT1<M, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <E, A>(e: () => E, a: () => A) => (fa: TheseT1<M, E, A>) => Kind<M, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <A, B>(f: (a: A) => B) => (ma: TheseT1<M, E, A>) => TheseT1<M, E, B>
    readonly of: <A>(a: A) => TheseT1<M, E, A>
    readonly ap: <A>(ma: TheseT1<M, E, A>) => <B>(mab: TheseT1<M, E, (a: A) => B>) => TheseT1<M, E, B>
    readonly chain: <A, B>(f: (a: A) => TheseT1<M, E, B>) => (ma: TheseT1<M, E, A>) => TheseT1<M, E, B>
  }
}
```

Added in v3.0.0

# TheseM2 (interface)

**Signature**

```ts
export interface TheseM2<M extends URIS2> {
  readonly map: <A, B>(f: (a: A) => B) => <R, E>(fa: TheseT2<M, R, E, A>) => TheseT2<M, R, E, B>
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fa: TheseT2<M, R, E, A>) => TheseT2<M, R, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fa: TheseT2<M, R, E, A>) => TheseT2<M, R, G, A>
  readonly fold: <E, R, B, A>(
    onLeft: (e: E) => Kind2<M, R, B>,
    onRight: (a: A) => Kind2<M, R, B>,
    onBoth: (e: E, a: A) => Kind2<M, R, B>
  ) => (fa: TheseT2<M, R, E, A>) => Kind2<M, R, B>
  readonly swap: <R, E, A>(fa: TheseT2<M, R, E, A>) => TheseT2<M, R, A, E>
  readonly rightM: <R, E, A>(ma: Kind2<M, R, A>) => TheseT2<M, R, E, A>
  readonly leftM: <R, E, A>(me: Kind2<M, R, E>) => TheseT2<M, R, E, A>
  readonly left: <R, E, A>(e: E) => TheseT2<M, R, E, A>
  readonly right: <R, E, A>(a: A) => TheseT2<M, R, E, A>
  readonly both: <R, E, A>(e: E, a: A) => TheseT2<M, R, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <E, A>(e: () => E, a: () => A) => <R>(fa: TheseT2<M, R, E, A>) => Kind2<M, R, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <A, B>(f: (a: A) => B) => <R>(ma: TheseT2<M, R, E, A>) => TheseT2<M, R, E, B>
    readonly of: <R, A>(a: A) => TheseT2<M, R, E, A>
    readonly ap: <R, A>(ma: TheseT2<M, R, E, A>) => <B>(mab: TheseT2<M, R, E, (a: A) => B>) => TheseT2<M, R, E, B>
    readonly chain: <R, A, B>(f: (a: A) => TheseT2<M, R, E, B>) => (ma: TheseT2<M, R, E, A>) => TheseT2<M, R, E, B>
  }
}
```

Added in v3.0.0

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

# getTheseM

**Signature**

```ts
export declare function getTheseM<M extends URIS2>(M: Monad2<M>): TheseM2<M>
export declare function getTheseM<M extends URIS>(M: Monad1<M>): TheseM1<M>
export declare function getTheseM<M>(M: Monad<M>): TheseM<M>
```

Added in v2.4.0
