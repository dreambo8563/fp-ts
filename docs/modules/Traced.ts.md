---
title: Traced.ts
nav_order: 78
parent: Modules
---

## Traced overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Traced (interface)](#traced-interface)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [censor](#censor)
  - [functorTraced](#functortraced)
  - [getComonad](#getcomonad)
  - [getExtend](#getextend)
  - [listen](#listen)
  - [listens](#listens)
  - [map](#map)
  - [tracks](#tracks)

---

# utils

## Traced (interface)

**Signature**

```ts
export interface Traced<P, A> {
  (p: P): A
}
```

Added in v2.0.0

## URI

**Signature**

```ts
export declare const URI: 'Traced'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## censor

Apply a function to the current position

**Signature**

```ts
export declare const censor: <P>(f: (p: P) => P) => <A>(wa: Traced<P, A>) => Traced<P, A>
```

Added in v2.0.0

## functorTraced

**Signature**

```ts
export declare const functorTraced: Functor2<'Traced'>
```

Added in v3.0.0

## getComonad

**Signature**

```ts
export declare function getComonad<P>(M: Monoid<P>): Comonad2C<URI, P>
```

Added in v2.0.0

## getExtend

**Signature**

```ts
export declare function getExtend<P>(S: Semigroup<P>): Extend2C<URI, P>
```

Added in v2.0.0

## listen

Get the current position

**Signature**

```ts
export declare const listen: <P, A>(wa: Traced<P, A>) => Traced<P, readonly [A, P]>
```

Added in v2.0.0

## listens

Get a value which depends on the current position

**Signature**

```ts
export declare const listens: <P, B>(f: (p: P) => B) => <A>(wa: Traced<P, A>) => Traced<P, readonly [A, B]>
```

Added in v2.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Traced<E, A>) => Traced<E, B>
```

Added in v2.0.0

## tracks

Extracts a value at a relative position which depends on the current value.

**Signature**

```ts
export declare const tracks: <P>(M: Monoid<P>) => <A>(f: (a: A) => P) => (wa: Traced<P, A>) => A
```

Added in v2.0.0
