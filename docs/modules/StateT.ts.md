---
title: StateT.ts
nav_order: 81
parent: Modules
---

# StateT overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [StateT (interface)](#statet-interface)
- [StateT1 (interface)](#statet1-interface)
- [StateT2 (interface)](#statet2-interface)
- [StateT3 (interface)](#statet3-interface)
- [ap](#ap)
- [chain](#chain)
- [evalState](#evalstate)
- [execState](#execstate)
- [fromF](#fromf)
- [fromState](#fromstate)
- [get](#get)
- [gets](#gets)
- [map](#map)
- [modify](#modify)
- [of](#of)
- [put](#put)

---

# StateT (interface)

**Signature**

```ts
export interface StateT<M, S, A> {
  (s: S): HKT<M, [A, S]>
}
```

Added in v2.0.0

# StateT1 (interface)

**Signature**

```ts
export interface StateT1<M extends URIS, S, A> {
  (s: S): Kind<M, [A, S]>
}
```

Added in v2.0.0

# StateT2 (interface)

**Signature**

```ts
export interface StateT2<M extends URIS2, S, E, A> {
  (s: S): Kind2<M, E, [A, S]>
}
```

Added in v2.0.0

# StateT3 (interface)

**Signature**

```ts
export interface StateT3<M extends URIS3, S, R, E, A> {
  (s: S): Kind3<M, R, E, [A, S]>
}
```

Added in v2.0.0

# ap

**Signature**

```ts
export declare function ap<F extends URIS3>(
  M: Monad3<F>
): <S, R, E, A>(fa: StateT3<F, S, R, E, A>) => <B>(fab: StateT3<F, S, R, E, (a: A) => B>) => StateT3<F, S, R, E, B>
export declare function ap<F extends URIS2>(
  M: Monad2<F>
): <S, E, A>(fa: StateT2<F, S, E, A>) => <B>(fab: StateT2<F, S, E, (a: A) => B>) => StateT2<F, S, E, B>
export declare function ap<F extends URIS>(
  M: Monad1<F>
): <S, A>(fa: StateT1<F, S, A>) => <B>(fab: StateT1<F, S, (a: A) => B>) => StateT1<F, S, B>
export declare function ap<F>(
  M: Monad<F>
): <S, A>(fa: StateT<F, S, A>) => <B>(fab: StateT<F, S, (a: A) => B>) => StateT<F, S, B>
```

Added in v3.0.0

# chain

**Signature**

```ts
export declare function chain<F extends URIS3>(
  M: Monad3<F>
): <A, S, R, E, B>(f: (a: A) => StateT3<F, S, R, E, B>) => (fa: StateT3<F, S, R, E, A>) => StateT3<F, S, R, E, B>
export declare function chain<F extends URIS2>(
  M: Monad2<F>
): <A, S, E, B>(f: (a: A) => StateT2<F, S, E, B>) => (fa: StateT2<F, S, E, A>) => StateT2<F, S, E, B>
export declare function chain<F extends URIS>(
  M: Monad1<F>
): <A, S, B>(f: (a: A) => StateT1<F, S, B>) => (fa: StateT1<F, S, A>) => StateT1<F, S, B>
export declare function chain<F>(
  M: Monad<F>
): <A, S, B>(f: (a: A) => StateT<F, S, B>) => (fa: StateT<F, S, A>) => StateT<F, S, B>
```

Added in v3.0.0

# evalState

**Signature**

```ts
export declare function evalState<F extends URIS3>(
  F: Functor3<F>
): <S, R, E, A>(fsa: StateT3<F, S, R, E, A>, s: S) => Kind3<F, R, E, A>
export declare function evalState<F extends URIS2>(
  F: Functor2<F>
): <S, E, A>(fsa: StateT2<F, S, E, A>, s: S) => Kind2<F, E, A>
export declare function evalState<F extends URIS>(F: Functor1<F>): <S, A>(fsa: StateT1<F, S, A>, s: S) => Kind<F, A>
export declare function evalState<F>(F: Functor<F>): <S, A>(fsa: StateT<F, S, A>, s: S) => HKT<F, A>
```

Added in v3.0.0

# execState

**Signature**

```ts
export declare function execState<F extends URIS3>(
  F: Functor3<F>
): <S, R, E, A>(fsa: StateT3<F, S, R, E, A>, s: S) => Kind3<F, R, E, S>
export declare function execState<F extends URIS2>(
  F: Functor2<F>
): <S, E, A>(fsa: StateT2<F, S, E, A>, s: S) => Kind2<F, E, S>
export declare function execState<F extends URIS>(F: Functor1<F>): <S, A>(fsa: StateT1<F, S, A>, s: S) => Kind<F, S>
export declare function execState<F>(F: Functor<F>): <S, A>(fsa: StateT<F, S, A>, s: S) => HKT<F, S>
```

Added in v3.0.0

# fromF

**Signature**

```ts
export declare function fromF<F extends URIS3>(
  F: Functor3<F>
): <S, R, E, A>(fa: Kind3<F, R, E, A>) => StateT3<F, S, R, E, A>
export declare function fromF<F extends URIS2>(F: Functor2<F>): <S, E, A>(fa: Kind2<F, E, A>) => StateT2<F, S, E, A>
export declare function fromF<F extends URIS>(F: Functor1<F>): <S, A>(fa: Kind<F, A>) => StateT1<F, S, A>
export declare function fromF<F>(F: Functor<F>): <S, A>(fa: HKT<F, A>) => StateT<F, S, A>
```

Added in v3.0.0

# fromState

**Signature**

```ts
export declare function fromState<F extends URIS3>(
  A: Applicative3<F>
): <S, R, E, A>(sa: State<S, A>) => StateT3<F, S, R, E, A>
export declare function fromState<F extends URIS2>(
  A: Applicative2<F>
): <S, E, A>(sa: State<S, A>) => StateT2<F, S, E, A>
export declare function fromState<F extends URIS>(A: Applicative1<F>): <S, A>(sa: State<S, A>) => StateT1<F, S, A>
export declare function fromState<F>(A: Applicative<F>): <S, A>(sa: State<S, A>) => StateT<F, S, A>
```

Added in v3.0.0

# get

**Signature**

```ts
export declare function get<F extends URIS3>(A: Applicative3<F>): <S, R, E>() => StateT3<F, S, R, E, S>
export declare function get<F extends URIS2>(A: Applicative2<F>): <S, E>() => StateT2<F, S, E, S>
export declare function get<F extends URIS>(A: Applicative1<F>): <S>() => StateT1<F, S, S>
export declare function get<F>(A: Applicative<F>): <S>() => StateT<F, S, S>
```

Added in v3.0.0

# gets

**Signature**

```ts
export declare function gets<F extends URIS3>(
  A: Applicative3<F>
): <S, R, E, A>(f: (s: S) => A) => StateT3<F, S, R, E, A>
export declare function gets<F extends URIS2>(A: Applicative2<F>): <S, E, A>(f: (s: S) => A) => StateT2<F, S, E, A>
export declare function gets<F extends URIS>(A: Applicative1<F>): <S, A>(f: (s: S) => A) => StateT1<F, S, A>
export declare function gets<F>(A: Applicative<F>): <S, A>(f: (s: S) => A) => StateT<F, S, A>
```

Added in v3.0.0

# map

**Signature**

```ts
export declare function map<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: StateT3<F, S, R, E, A>) => StateT3<F, S, R, E, B>
export declare function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <S, E>(fa: StateT2<F, S, E, A>) => StateT2<F, S, E, B>
export declare function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <S>(fa: StateT1<F, S, A>) => StateT1<F, S, B>
export declare function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <S>(fa: StateT<F, S, A>) => StateT<F, S, B>
```

Added in v3.0.0

# modify

**Signature**

```ts
export declare function modify<F extends URIS3>(
  A: Applicative3<F>
): <S, R, E>(f: (s: S) => S) => StateT3<F, S, R, E, void>
export declare function modify<F extends URIS2>(A: Applicative2<F>): <S, E>(f: (s: S) => S) => StateT2<F, S, E, void>
export declare function modify<F extends URIS>(A: Applicative1<F>): <S>(f: (s: S) => S) => StateT1<F, S, void>
export declare function modify<F>(A: Applicative<F>): <S>(f: (s: S) => S) => StateT<F, S, void>
```

Added in v3.0.0

# of

**Signature**

```ts
export declare function of<F extends URIS3>(A: Applicative3<F>): <S, R, E, A>(a: A) => StateT3<F, S, R, E, A>
export declare function of<F extends URIS2>(A: Applicative2<F>): <S, E, A>(a: A) => StateT2<F, S, E, A>
export declare function of<F extends URIS>(A: Applicative1<F>): <S, A>(a: A) => StateT1<F, S, A>
export declare function of<F>(A: Applicative<F>): <S, A>(a: A) => StateT<F, S, A>
```

Added in v3.0.0

# put

**Signature**

```ts
export declare function put<F extends URIS3>(A: Applicative3<F>): <R, E, S>(s: S) => StateT3<F, S, R, E, void>
export declare function put<F extends URIS2>(A: Applicative2<F>): <S, E>(s: S) => StateT2<F, S, E, void>
export declare function put<F extends URIS>(A: Applicative1<F>): <S>(s: S) => StateT1<F, S, void>
export declare function put<F>(A: Applicative<F>): <S>(s: S) => StateT<F, S, void>
```

Added in v3.0.0
