/**
 * @since 2.0.0
 */
import {
  ApplicativeComposition12,
  ApplicativeComposition22,
  ApplicativeCompositionHKT2,
  getApplicativeComposition,
  Applicative,
  Applicative1,
  Applicative2
} from './Applicative'
import * as E from './Either'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
import { Functor2, Functor1, Functor } from './Functor'

/**
 * @since 2.0.0
 */
export interface EitherT<M, E, A> extends HKT<M, E.Either<E, A>> {}

/**
 * @since 3.0.0
 */
export interface EitherM<M> extends ApplicativeCompositionHKT2<M, E.URI> {
  readonly chain: <E, A, B>(f: (a: A) => EitherT<M, E, B>) => (ma: EitherT<M, E, A>) => EitherT<M, E, B>
  readonly alt: <E, A>(that: () => EitherT<M, E, A>) => (fa: EitherT<M, E, A>) => EitherT<M, E, A>
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: EitherT<M, E, A>) => EitherT<M, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: EitherT<M, E, A>) => EitherT<M, G, A>
  readonly fold: <E, A, R>(
    onLeft: (e: E) => HKT<M, R>,
    onRight: (a: A) => HKT<M, R>
  ) => (ma: EitherT<M, E, A>) => HKT<M, R>
  readonly getOrElse: <E, A>(onLeft: (e: E) => HKT<M, A>) => (ma: EitherT<M, E, A>) => HKT<M, A>
  readonly orElse: <E, N, A>(onLeft: (e: E) => EitherT<M, N, A>) => (ma: EitherT<M, E, A>) => EitherT<M, N, A>
  readonly swap: <E, A>(ma: EitherT<M, E, A>) => EitherT<M, A, E>
  readonly rightM: <E, A>(ma: HKT<M, A>) => EitherT<M, E, A>
  readonly leftM: <E, A>(me: HKT<M, E>) => EitherT<M, E, A>
  readonly left: <E, A>(e: E) => EitherT<M, E, A>
}

/**
 * @since 2.0.0
 */
export type EitherT1<M extends URIS, E, A> = Kind<M, E.Either<E, A>>

/**
 * @since 3.0.0
 */
export interface EitherM1<M extends URIS> extends ApplicativeComposition12<M, E.URI> {
  readonly chain: <E, A, B>(f: (a: A) => EitherT1<M, E, B>) => (ma: EitherT1<M, E, A>) => EitherT1<M, E, B>
  readonly alt: <E, A>(that: () => EitherT1<M, E, A>) => (fa: EitherT1<M, E, A>) => EitherT1<M, E, A>
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: EitherT1<M, E, A>) => EitherT1<M, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: EitherT1<M, E, A>) => EitherT1<M, G, A>
  readonly fold: <E, A, R>(
    onLeft: (e: E) => Kind<M, R>,
    onRight: (a: A) => Kind<M, R>
  ) => (ma: EitherT1<M, E, A>) => Kind<M, R>
  readonly getOrElse: <E, A>(onLeft: (e: E) => Kind<M, A>) => (ma: EitherT1<M, E, A>) => Kind<M, A>
  readonly orElse: <E, N, A>(onLeft: (e: E) => EitherT1<M, N, A>) => (ma: EitherT1<M, E, A>) => EitherT1<M, N, A>
  readonly swap: <E, A>(ma: EitherT1<M, E, A>) => EitherT1<M, A, E>
  readonly rightM: <E, A>(ma: Kind<M, A>) => EitherT1<M, E, A>
  readonly leftM: <E, A>(me: Kind<M, E>) => EitherT1<M, E, A>
  readonly left: <E, A>(e: E) => EitherT1<M, E, A>
}

/**
 * @since 2.0.0
 */
export type EitherT2<M extends URIS2, R, E, A> = Kind2<M, R, E.Either<E, A>>

/**
 * @since 3.0.0
 */
export interface EitherM2<M extends URIS2> extends ApplicativeComposition22<M, E.URI> {
  readonly chain: <R, E, A, B>(f: (a: A) => EitherT2<M, R, E, B>) => (ma: EitherT2<M, R, E, A>) => EitherT2<M, R, E, B>
  readonly alt: <R, E, A>(that: () => EitherT2<M, R, E, A>) => (fa: EitherT2<M, R, E, A>) => EitherT2<M, R, E, A>
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fea: EitherT2<M, R, E, A>) => EitherT2<M, R, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fea: EitherT2<M, R, E, A>) => EitherT2<M, R, G, A>
  readonly fold: <R, E, A, B>(
    onLeft: (e: E) => Kind2<M, R, B>,
    onRight: (a: A) => Kind2<M, R, B>
  ) => (ma: EitherT2<M, R, E, A>) => Kind2<M, R, B>
  readonly getOrElse: <R, E, A>(onLeft: (e: E) => Kind2<M, R, A>) => (ma: EitherT2<M, R, E, A>) => Kind2<M, R, A>
  readonly orElse: <E, R, F, A>(
    onLeft: (e: E) => EitherT2<M, R, F, A>
  ) => (ma: EitherT2<M, R, E, A>) => EitherT2<M, R, F, A>
  readonly swap: <R, E, A>(ma: EitherT2<M, R, E, A>) => EitherT2<M, R, A, E>
  readonly rightM: <R, E, A>(ma: Kind2<M, R, A>) => EitherT2<M, R, E, A>
  readonly leftM: <R, E, A>(me: Kind2<M, R, E>) => EitherT2<M, R, E, A>
  readonly left: <R, E, A>(e: E) => EitherT2<M, R, E, A>
}

/**
 * @since 2.0.0
 */
export function getEitherM<M extends URIS2>(M: Monad2<M>): EitherM2<M>
export function getEitherM<M extends URIS>(M: Monad1<M>): EitherM1<M>
export function getEitherM<M>(M: Monad<M>): EitherM<M>
export function getEitherM<M>(M: Monad<M>): EitherM<M> {
  const A = getApplicativeComposition(M, E.applicativeEither)

  return {
    map: A.map,
    ap: A.ap,
    of: A.of,
    chain: (f) => M.chain((e) => (E.isLeft(e) ? M.of(E.left(e.left)) : f(e.right))),
    alt: (that) => M.chain((e) => (E.isLeft(e) ? that() : A.of(e.right))),
    bimap: (f, g) => M.map(E.bifunctorEither.bimap(f, g)),
    mapLeft: (f) => M.map(E.bifunctorEither.mapLeft(f)),
    fold: (onLeft, onRight) => M.chain(E.fold(onLeft, onRight)),
    getOrElse: (onLeft) => M.chain(E.fold(onLeft, M.of)),
    orElse: (f) => M.chain(E.fold(f, (a) => A.of(a))),
    swap: M.map(E.swap),
    rightM: M.map(E.right),
    leftM: M.map(E.left),
    left: (e) => M.of(E.left(e))
  }
}

// ok, ma, chain

/**
 * @since 3.0.0
 */
export function of<F extends URIS2>(A: Applicative2<F>): <R, E, A>(a: A) => EitherT2<F, R, E, A>
export function of<F extends URIS>(A: Applicative1<F>): <E, A>(a: A) => EitherT1<F, E, A>
export function of<F>(A: Applicative<F>): <E, A>(a: A) => EitherT<F, E, A>
export function of<F>(A: Applicative<F>): <E, A>(a: A) => EitherT<F, E, A> {
  return (a) => A.of(E.right(a))
}

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
