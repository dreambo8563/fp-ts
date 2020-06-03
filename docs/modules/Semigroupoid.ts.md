---
title: Semigroupoid.ts
nav_order: 68
parent: Modules
---

# Semigroupoid overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Semigroupoid (interface)](#semigroupoid-interface)
- [Semigroupoid2 (interface)](#semigroupoid2-interface)
- [Semigroupoid2C (interface)](#semigroupoid2c-interface)
- [Semigroupoid3 (interface)](#semigroupoid3-interface)
- [Semigroupoid3C (interface)](#semigroupoid3c-interface)
- [Semigroupoid4 (interface)](#semigroupoid4-interface)

---

# Semigroupoid (interface)

**Signature**

```ts
export interface Semigroupoid<F> {
  readonly URI: F
  readonly pipe: <B, C>(fbc: HKT2<F, B, C>) => <A>(fab: HKT2<F, A, B>) => HKT2<F, A, C>
}
```

Added in v3.0.0

# Semigroupoid2 (interface)

**Signature**

```ts
export interface Semigroupoid2<F extends URIS2> {
  readonly URI: F
  readonly pipe: <B, C>(fbc: Kind2<F, B, C>) => <A>(fab: Kind2<F, A, B>) => Kind2<F, A, C>
}
```

Added in v3.0.0

# Semigroupoid2C (interface)

**Signature**

```ts
export interface Semigroupoid2C<F extends URIS2, A> {
  readonly URI: F
  readonly _E: A
  readonly pipe: <B, C>(fbc: Kind2<F, B, C>) => (fab: Kind2<F, A, B>) => Kind2<F, A, C>
}
```

Added in v3.0.0

# Semigroupoid3 (interface)

**Signature**

```ts
export interface Semigroupoid3<F extends URIS3> {
  readonly URI: F
  readonly pipe: <R, B, C>(fbc: Kind3<F, R, B, C>) => <A>(fab: Kind3<F, R, A, B>) => Kind3<F, R, A, C>
}
```

Added in v3.0.0

# Semigroupoid3C (interface)

**Signature**

```ts
export interface Semigroupoid3C<F extends URIS3, A> {
  readonly URI: F
  readonly _E: A
  readonly pipe: <R, B, C>(fbc: Kind3<F, R, B, C>) => (fab: Kind3<F, R, A, B>) => Kind3<F, R, A, C>
}
```

Added in v3.0.0

# Semigroupoid4 (interface)

**Signature**

```ts
export interface Semigroupoid4<F extends URIS4> {
  readonly URI: F
  readonly pipe: <S, R, B, C>(fbc: Kind4<F, S, R, B, C>) => <A>(fab: Kind4<F, S, R, A, B>) => Kind4<F, S, R, A, C>
}
```

Added in v3.0.0
