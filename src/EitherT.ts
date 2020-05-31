/**
 * @since 2.0.0
 */
import { Applicative, Applicative1, Applicative2 } from './Applicative'
import { Apply, Apply1, Apply2 } from './Apply'
import { Chain, Chain1, Chain2 } from './Chain'
import * as E from './Either'
import { pipe } from './function'
import { Functor, Functor1, Functor2 } from './Functor'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'

/**
 * @since 2.0.0
 */
export interface EitherT<M, E, A> extends HKT<M, E.Either<E, A>> {}

/**
 * @since 2.0.0
 */
export type EitherT1<M extends URIS, E, A> = Kind<M, E.Either<E, A>>

/**
 * @since 2.0.0
 */
export type EitherT2<M extends URIS2, R, E, A> = Kind2<M, R, E.Either<E, A>>

/**
 * @since 3.0.0
 */
export function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <R, E>(fa: EitherT2<F, R, E, A>) => EitherT2<F, R, E, B>
export function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <E>(fa: EitherT1<F, E, A>) => EitherT1<F, E, B>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <E>(fa: EitherT<F, E, A>) => EitherT<F, E, B>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <E>(fa: EitherT<F, E, A>) => EitherT<F, E, B> {
  return (f) => F.map(E.map(f))
}

/**
 * @since 3.0.0
 */
export function ap<F extends URIS2>(
  F: Apply2<F>
): <R, E, A>(fa: EitherT2<F, R, E, A>) => <B>(fab: EitherT2<F, R, E, (a: A) => B>) => EitherT2<F, R, E, B>
export function ap<F extends URIS>(
  F: Apply1<F>
): <E, A>(fa: EitherT1<F, E, A>) => <B>(fab: EitherT1<F, E, (a: A) => B>) => EitherT1<F, E, B>
export function ap<F>(
  F: Apply<F>
): <E, A>(fa: EitherT<F, E, A>) => <B>(fab: EitherT<F, E, (a: A) => B>) => EitherT<F, E, B>
export function ap<F>(
  F: Apply<F>
): <E, A>(fa: EitherT<F, E, A>) => <B>(fab: EitherT<F, E, (a: A) => B>) => EitherT<F, E, B> {
  return <E, A>(fa: EitherT<F, E, A>) => <B>(fab: EitherT<F, E, (a: A) => B>) =>
    pipe(
      fab,
      F.map((h) => (ga: E.Either<E, A>) => pipe(h, E.ap(ga))),
      F.ap(fa)
    )
}

/**
 * @since 3.0.0
 */
export function right<F extends URIS2>(A: Applicative2<F>): <R, E, A>(a: A) => EitherT2<F, R, E, A>
export function right<F extends URIS>(A: Applicative1<F>): <E, A>(a: A) => EitherT1<F, E, A>
export function right<F>(A: Applicative<F>): <E, A>(a: A) => EitherT<F, E, A>
export function right<F>(A: Applicative<F>): <E, A>(a: A) => EitherT<F, E, A> {
  return (a) => A.of(E.right(a))
}

/**
 * @since 3.0.0
 */
export function left<F extends URIS2>(A: Applicative2<F>): <R, E, A>(e: E) => EitherT2<F, R, E, A>
export function left<F extends URIS>(A: Applicative1<F>): <E, A>(e: E) => EitherT1<F, E, A>
export function left<F>(A: Applicative<F>): <E, A>(e: E) => EitherT<F, E, A>
export function left<F>(A: Applicative<F>): <E, A>(e: E) => EitherT<F, E, A> {
  return (a) => A.of(E.left(a))
}

/**
 * @since 3.0.0
 */
export function chain<F extends URIS2>(
  M: Monad2<F>
): <A, R, E, B>(f: (a: A) => EitherT2<F, R, E, B>) => (fa: EitherT2<F, R, E, A>) => EitherT2<F, R, E, B>
export function chain<F extends URIS>(
  M: Monad1<F>
): <A, E, B>(f: (a: A) => EitherT1<F, E, B>) => (fa: EitherT1<F, E, A>) => EitherT1<F, E, B>
export function chain<F>(
  M: Monad<F>
): <A, E, B>(f: (a: A) => EitherT<F, E, B>) => (fa: EitherT<F, E, A>) => EitherT<F, E, B>
export function chain<F>(
  M: Monad<F>
): <A, E, B>(f: (a: A) => EitherT<F, E, B>) => (fa: EitherT<F, E, A>) => EitherT<F, E, B> {
  return (f) => M.chain((e) => (E.isLeft(e) ? M.of(E.left(e.left)) : f(e.right)))
}

/**
 * @since 3.0.0
 */
export function alt<M extends URIS2>(
  M: Monad2<M>
): <R, E, A>(that: () => EitherT2<M, R, E, A>) => (fa: EitherT2<M, R, E, A>) => EitherT2<M, R, E, A>
export function alt<M extends URIS>(
  M: Monad1<M>
): <E, A>(that: () => EitherT1<M, E, A>) => (fa: EitherT1<M, E, A>) => EitherT1<M, E, A>
export function alt<M>(M: Monad<M>): <E, A>(that: () => EitherT<M, E, A>) => (fa: EitherT<M, E, A>) => EitherT<M, E, A>
export function alt<M>(
  M: Monad<M>
): <E, A>(that: () => EitherT<M, E, A>) => (fa: EitherT<M, E, A>) => EitherT<M, E, A> {
  const ofM = right(M)
  return (that) => M.chain((e) => (E.isLeft(e) ? that() : ofM(e.right)))
}

/**
 * @since 3.0.0
 */
export function bimap<F extends URIS2>(
  F: Functor2<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fea: EitherT2<F, R, E, A>) => EitherT2<F, R, G, B>
export function bimap<F extends URIS>(
  F: Functor1<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: EitherT1<F, E, A>) => EitherT1<F, G, B>
export function bimap<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: EitherT<F, E, A>) => EitherT<F, G, B>
export function bimap<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: EitherT<F, E, A>) => EitherT<F, G, B> {
  return (f, g) => F.map(E.bifunctorEither.bimap(f, g))
}

/**
 * @since 3.0.0
 */
export function mapLeft<F extends URIS2>(
  F: Functor2<F>
): <E, G>(f: (e: E) => G) => <R, A>(fea: EitherT2<F, R, E, A>) => EitherT2<F, R, G, A>
export function mapLeft<F extends URIS>(
  F: Functor1<F>
): <E, G>(f: (e: E) => G) => <A>(fea: EitherT1<F, E, A>) => EitherT1<F, G, A>
export function mapLeft<F>(F: Functor<F>): <E, G>(f: (e: E) => G) => <A>(fea: EitherT<F, E, A>) => EitherT<F, G, A>
export function mapLeft<F>(F: Functor<F>): <E, G>(f: (e: E) => G) => <A>(fea: EitherT<F, E, A>) => EitherT<F, G, A> {
  return (f) => F.map(E.bifunctorEither.mapLeft(f))
}

/**
 * @since 3.0.0
 */
export function fold<M extends URIS2>(
  M: Chain2<M>
): <E, B, R, A>(
  onLeft: (e: E) => Kind2<M, R, B>,
  onRight: (a: A) => Kind2<M, R, B>
) => (ma: EitherT2<M, R, E, A>) => Kind2<M, R, B>
export function fold<M extends URIS>(
  M: Chain1<M>
): <E, B, A>(onLeft: (e: E) => Kind<M, B>, onRight: (a: A) => Kind<M, B>) => (ma: EitherT1<M, E, A>) => Kind<M, B>
export function fold<M>(
  M: Chain<M>
): <E, B, A>(onLeft: (e: E) => HKT<M, B>, onRight: (a: A) => HKT<M, B>) => (ma: EitherT<M, E, A>) => HKT<M, B>
export function fold<M>(
  M: Chain<M>
): <E, B, A>(onLeft: (e: E) => HKT<M, B>, onRight: (a: A) => HKT<M, B>) => (ma: EitherT<M, E, A>) => HKT<M, B> {
  return (onLeft, onRight) => M.chain(E.fold(onLeft, onRight))
}

/**
 * @since 3.0.0
 */
export function getOrElse<M extends URIS2>(
  M: Monad2<M>
): <E, R, A>(onLeft: (e: E) => Kind2<M, R, A>) => (ma: EitherT2<M, R, E, A>) => Kind2<M, R, A>
export function getOrElse<M extends URIS>(
  M: Monad1<M>
): <E, A>(onLeft: (e: E) => Kind<M, A>) => (ma: EitherT1<M, E, A>) => Kind<M, A>
export function getOrElse<M>(M: Monad<M>): <E, A>(onLeft: (e: E) => HKT<M, A>) => (ma: EitherT<M, E, A>) => HKT<M, A>
export function getOrElse<M>(M: Monad<M>): <E, A>(onLeft: (e: E) => HKT<M, A>) => (ma: EitherT<M, E, A>) => HKT<M, A> {
  return (onLeft) => M.chain(E.fold(onLeft, M.of))
}

/**
 * @since 3.0.0
 */
export function orElse<M extends URIS2>(
  M: Monad2<M>
): <E, R, N, A>(onLeft: (e: E) => EitherT2<M, R, N, A>) => (ma: EitherT2<M, R, E, A>) => EitherT2<M, R, N, A>
export function orElse<M extends URIS>(
  M: Monad1<M>
): <E, N, A>(onLeft: (e: E) => EitherT1<M, N, A>) => (ma: EitherT1<M, E, A>) => EitherT1<M, N, A>
export function orElse<M>(
  M: Monad<M>
): <E, N, A>(onLeft: (e: E) => EitherT<M, N, A>) => (ma: EitherT<M, E, A>) => EitherT<M, N, A>
export function orElse<M>(
  M: Monad<M>
): <E, N, A>(onLeft: (e: E) => EitherT<M, N, A>) => (ma: EitherT<M, E, A>) => EitherT<M, N, A> {
  const ofM = right(M)
  return (f) => M.chain(E.fold(f, (a) => ofM(a)))
}
