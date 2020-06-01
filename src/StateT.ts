/**
 * @since 2.0.0
 */
import { Applicative, Applicative1, Applicative2, Applicative3 } from './Applicative'
import { pipe } from './function'
import { Functor, Functor1, Functor2, Functor3 } from './Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad3 } from './Monad'
import { State } from './State'

/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
export interface StateT<M, S, A> {
  (s: S): HKT<M, [A, S]>
}
/* tslint:enable:readonly-array */

/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
export interface StateT1<M extends URIS, S, A> {
  (s: S): Kind<M, [A, S]>
}
/* tslint:enable:readonly-array */

/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
export interface StateT2<M extends URIS2, S, E, A> {
  (s: S): Kind2<M, E, [A, S]>
}
/* tslint:enable:readonly-array */

/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
export interface StateT3<M extends URIS3, S, R, E, A> {
  (s: S): Kind3<M, R, E, [A, S]>
}
/* tslint:enable:readonly-array */

/**
 * @since 3.0.0
 */
export function map<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: StateT3<F, S, R, E, A>) => StateT3<F, S, R, E, B>
export function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <S, E>(fa: StateT2<F, S, E, A>) => StateT2<F, S, E, B>
export function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <S>(fa: StateT1<F, S, A>) => StateT1<F, S, B>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <S>(fa: StateT<F, S, A>) => StateT<F, S, B>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <S>(fa: StateT<F, S, A>) => StateT<F, S, B> {
  return (f) => (fa) => (s) =>
    pipe(
      fa(s),
      F.map(([a, s1]) => [f(a), s1])
    )
}

/**
 * @since 3.0.0
 */
export function ap<F extends URIS3>(
  M: Monad3<F>
): <S, R, E, A>(fa: StateT3<F, S, R, E, A>) => <B>(fab: StateT3<F, S, R, E, (a: A) => B>) => StateT3<F, S, R, E, B>
export function ap<F extends URIS2>(
  M: Monad2<F>
): <S, E, A>(fa: StateT2<F, S, E, A>) => <B>(fab: StateT2<F, S, E, (a: A) => B>) => StateT2<F, S, E, B>
export function ap<F extends URIS>(
  M: Monad1<F>
): <S, A>(fa: StateT1<F, S, A>) => <B>(fab: StateT1<F, S, (a: A) => B>) => StateT1<F, S, B>
export function ap<F>(
  M: Monad<F>
): <S, A>(fa: StateT<F, S, A>) => <B>(fab: StateT<F, S, (a: A) => B>) => StateT<F, S, B>
export function ap<F>(
  M: Monad<F>
): <S, A>(fa: StateT<F, S, A>) => <B>(fab: StateT<F, S, (a: A) => B>) => StateT<F, S, B> {
  return (fa) => (fab) => (s) =>
    pipe(
      fab(s),
      M.chain(([f, s]) =>
        pipe(
          fa(s),
          M.map(([a, s]) => [f(a), s])
        )
      )
    )
}

/**
 * @since 3.0.0
 */
export function of<F extends URIS3>(A: Applicative3<F>): <S, R, E, A>(a: A) => StateT3<F, S, R, E, A>
export function of<F extends URIS2>(A: Applicative2<F>): <S, E, A>(a: A) => StateT2<F, S, E, A>
export function of<F extends URIS>(A: Applicative1<F>): <S, A>(a: A) => StateT1<F, S, A>
export function of<F>(A: Applicative<F>): <S, A>(a: A) => StateT<F, S, A>
export function of<F>(A: Applicative<F>): <S, A>(a: A) => StateT<F, S, A> {
  return (a) => (s) => A.of([a, s])
}

/**
 * @since 3.0.0
 */
export function chain<F extends URIS3>(
  M: Monad3<F>
): <A, S, R, E, B>(f: (a: A) => StateT3<F, S, R, E, B>) => (fa: StateT3<F, S, R, E, A>) => StateT3<F, S, R, E, B>
export function chain<F extends URIS2>(
  M: Monad2<F>
): <A, S, E, B>(f: (a: A) => StateT2<F, S, E, B>) => (fa: StateT2<F, S, E, A>) => StateT2<F, S, E, B>
export function chain<F extends URIS>(
  M: Monad1<F>
): <A, S, B>(f: (a: A) => StateT1<F, S, B>) => (fa: StateT1<F, S, A>) => StateT1<F, S, B>
export function chain<F>(
  M: Monad<F>
): <A, S, B>(f: (a: A) => StateT<F, S, B>) => (fa: StateT<F, S, A>) => StateT<F, S, B>
export function chain<F>(
  M: Monad<F>
): <A, S, B>(f: (a: A) => StateT<F, S, B>) => (fa: StateT<F, S, A>) => StateT<F, S, B> {
  return (f) => (ma) => (s) =>
    pipe(
      ma(s),
      M.chain(([a, s1]) => f(a)(s1))
    )
}

/**
 * @since 3.0.0
 */
export function get<F extends URIS3>(A: Applicative3<F>): <S, R, E>() => StateT3<F, S, R, E, S>
export function get<F extends URIS2>(A: Applicative2<F>): <S, E>() => StateT2<F, S, E, S>
export function get<F extends URIS>(A: Applicative1<F>): <S>() => StateT1<F, S, S>
export function get<F>(A: Applicative<F>): <S>() => StateT<F, S, S>
export function get<F>(A: Applicative<F>): <S>() => StateT<F, S, S> {
  return () => (s) => A.of([s, s])
}

/**
 * @since 3.0.0
 */
export function put<F extends URIS3>(A: Applicative3<F>): <R, E, S>(s: S) => StateT3<F, S, R, E, void>
export function put<F extends URIS2>(A: Applicative2<F>): <S, E>(s: S) => StateT2<F, S, E, void>
export function put<F extends URIS>(A: Applicative1<F>): <S>(s: S) => StateT1<F, S, void>
export function put<F>(A: Applicative<F>): <S>(s: S) => StateT<F, S, void>
export function put<F>(A: Applicative<F>): <S>(s: S) => StateT<F, S, void> {
  return (s) => () => A.of([undefined, s])
}

/**
 * @since 3.0.0
 */
export function modify<F extends URIS3>(A: Applicative3<F>): <S, R, E>(f: (s: S) => S) => StateT3<F, S, R, E, void>
export function modify<F extends URIS2>(A: Applicative2<F>): <S, E>(f: (s: S) => S) => StateT2<F, S, E, void>
export function modify<F extends URIS>(A: Applicative1<F>): <S>(f: (s: S) => S) => StateT1<F, S, void>
export function modify<F>(A: Applicative<F>): <S>(f: (s: S) => S) => StateT<F, S, void>
export function modify<F>(A: Applicative<F>): <S>(f: (s: S) => S) => StateT<F, S, void> {
  return (f) => (s) => A.of([undefined, f(s)])
}

/**
 * @since 3.0.0
 */
export function gets<F extends URIS3>(A: Applicative3<F>): <S, R, E, A>(f: (s: S) => A) => StateT3<F, S, R, E, A>
export function gets<F extends URIS2>(A: Applicative2<F>): <S, E, A>(f: (s: S) => A) => StateT2<F, S, E, A>
export function gets<F extends URIS>(A: Applicative1<F>): <S, A>(f: (s: S) => A) => StateT1<F, S, A>
export function gets<F>(A: Applicative<F>): <S, A>(f: (s: S) => A) => StateT<F, S, A>
export function gets<F>(A: Applicative<F>): <S, A>(f: (s: S) => A) => StateT<F, S, A> {
  return (f) => (s) => A.of([f(s), s])
}

/**
 * @since 3.0.0
 */
export function fromState<F extends URIS3>(A: Applicative3<F>): <S, R, E, A>(sa: State<S, A>) => StateT3<F, S, R, E, A>
export function fromState<F extends URIS2>(A: Applicative2<F>): <S, E, A>(sa: State<S, A>) => StateT2<F, S, E, A>
export function fromState<F extends URIS>(A: Applicative1<F>): <S, A>(sa: State<S, A>) => StateT1<F, S, A>
export function fromState<F>(A: Applicative<F>): <S, A>(sa: State<S, A>) => StateT<F, S, A>
export function fromState<F>(A: Applicative<F>): <S, A>(sa: State<S, A>) => StateT<F, S, A> {
  return (sa) => (s) => A.of(sa(s))
}

/**
 * @since 3.0.0
 */
export function fromF<F extends URIS3>(F: Functor3<F>): <S, R, E, A>(fa: Kind3<F, R, E, A>) => StateT3<F, S, R, E, A>
export function fromF<F extends URIS2>(F: Functor2<F>): <S, E, A>(fa: Kind2<F, E, A>) => StateT2<F, S, E, A>
export function fromF<F extends URIS>(F: Functor1<F>): <S, A>(fa: Kind<F, A>) => StateT1<F, S, A>
export function fromF<F>(F: Functor<F>): <S, A>(fa: HKT<F, A>) => StateT<F, S, A>
export function fromF<F>(F: Functor<F>): <S, A>(fa: HKT<F, A>) => StateT<F, S, A> {
  return (fa) => (s) =>
    pipe(
      fa,
      F.map((a) => [a, s])
    )
}

/**
 * @since 3.0.0
 */
export function evalState<F extends URIS3>(
  F: Functor3<F>
): <S, R, E, A>(fsa: StateT3<F, S, R, E, A>, s: S) => Kind3<F, R, E, A>
export function evalState<F extends URIS2>(F: Functor2<F>): <S, E, A>(fsa: StateT2<F, S, E, A>, s: S) => Kind2<F, E, A>
export function evalState<F extends URIS>(F: Functor1<F>): <S, A>(fsa: StateT1<F, S, A>, s: S) => Kind<F, A>
export function evalState<F>(F: Functor<F>): <S, A>(fsa: StateT<F, S, A>, s: S) => HKT<F, A>
export function evalState<F>(F: Functor<F>): <S, A>(fsa: StateT<F, S, A>, s: S) => HKT<F, A> {
  return (fsa, s) =>
    pipe(
      fsa(s),
      F.map(([a]) => a)
    )
}

/**
 * @since 3.0.0
 */
export function execState<F extends URIS3>(
  F: Functor3<F>
): <S, R, E, A>(fsa: StateT3<F, S, R, E, A>, s: S) => Kind3<F, R, E, S>
export function execState<F extends URIS2>(F: Functor2<F>): <S, E, A>(fsa: StateT2<F, S, E, A>, s: S) => Kind2<F, E, S>
export function execState<F extends URIS>(F: Functor1<F>): <S, A>(fsa: StateT1<F, S, A>, s: S) => Kind<F, S>
export function execState<F>(F: Functor<F>): <S, A>(fsa: StateT<F, S, A>, s: S) => HKT<F, S>
export function execState<F>(F: Functor<F>): <S, A>(fsa: StateT<F, S, A>, s: S) => HKT<F, S> {
  return (fsa, s) =>
    pipe(
      fsa(s),
      F.map(([_, s]) => s)
    )
}
