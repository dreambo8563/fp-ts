/**
 * @since 2.0.0
 */
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3 } from './Monad'
import { Reader } from './Reader'
import { pipe } from './function'

/**
 * @since 2.0.0
 */
export interface ReaderT<M, R, A> {
  (r: R): HKT<M, A>
}

/**
 * @since 3.0.0
 */
export interface ReaderM<M> {
  readonly map: <A, B>(f: (a: A) => B) => <R>(ma: ReaderT<M, R, A>) => ReaderT<M, R, B>
  readonly of: <R, A>(a: A) => ReaderT<M, R, A>
  readonly ap: <R, A>(ma: ReaderT<M, R, A>) => <B>(mab: ReaderT<M, R, (a: A) => B>) => ReaderT<M, R, B>
  readonly chain: <A, R, B>(f: (a: A) => ReaderT<M, R, B>) => (ma: ReaderT<M, R, A>) => ReaderT<M, R, B>
  readonly ask: <R>() => ReaderT<M, R, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT<M, R, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <A>(ma: ReaderT<M, R, A>) => ReaderT<M, Q, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT<M, R, A>
  readonly fromM: <R, A>(ma: HKT<M, A>) => ReaderT<M, R, A>
}

/**
 * @since 2.0.0
 */
export interface ReaderT1<M extends URIS, R, A> {
  (r: R): Kind<M, A>
}

/**
 * @since 3.0.0
 */
export interface ReaderM1<M extends URIS> {
  readonly map: <A, B>(f: (a: A) => B) => <R>(ma: ReaderT1<M, R, A>) => ReaderT1<M, R, B>
  readonly of: <R, A>(a: A) => ReaderT1<M, R, A>
  readonly ap: <R, A>(ma: ReaderT1<M, R, A>) => <B>(mab: ReaderT1<M, R, (a: A) => B>) => ReaderT1<M, R, B>
  readonly chain: <A, R, B>(f: (a: A) => ReaderT1<M, R, B>) => (ma: ReaderT1<M, R, A>) => ReaderT1<M, R, B>
  readonly ask: <R>() => ReaderT1<M, R, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT1<M, R, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <A>(ma: ReaderT1<M, R, A>) => ReaderT1<M, Q, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT1<M, R, A>
  readonly fromM: <R, A>(ma: Kind<M, A>) => ReaderT1<M, R, A>
}

/**
 * @since 2.0.0
 */
export interface ReaderT2<M extends URIS2, R, E, A> {
  (r: R): Kind2<M, E, A>
}

/**
 * @since 3.0.0
 */
export interface ReaderM2<M extends URIS2> {
  readonly map: <A, B>(f: (a: A) => B) => <R, E>(ma: ReaderT2<M, R, E, A>) => ReaderT2<M, R, E, B>
  readonly of: <R, E, A>(a: A) => ReaderT2<M, R, E, A>
  readonly ap: <R, E, A>(ma: ReaderT2<M, R, E, A>) => <B>(mab: ReaderT2<M, R, E, (a: A) => B>) => ReaderT2<M, R, E, B>
  readonly chain: <A, R, E, B>(f: (a: A) => ReaderT2<M, R, E, B>) => (ma: ReaderT2<M, R, E, A>) => ReaderT2<M, R, E, B>
  readonly ask: <R, E>() => ReaderT2<M, R, E, R>
  readonly asks: <R, E, A>(f: (r: R) => A) => ReaderT2<M, R, E, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <E, A>(ma: ReaderT2<M, R, E, A>) => ReaderT2<M, Q, E, A>
  readonly fromReader: <R, E, A>(ma: Reader<R, A>) => ReaderT2<M, R, E, A>
  readonly fromM: <R, E, A>(ma: Kind2<M, E, A>) => ReaderT2<M, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface ReaderM2C<M extends URIS2, E> {
  readonly map: <A, B>(f: (a: A) => B) => <R>(ma: ReaderT2<M, R, E, A>) => ReaderT2<M, R, E, B>
  readonly of: <R, A>(a: A) => ReaderT2<M, R, E, A>
  readonly ap: <R, A>(ma: ReaderT2<M, R, E, A>) => <B>(mab: ReaderT2<M, R, E, (a: A) => B>) => ReaderT2<M, R, E, B>
  readonly chain: <A, R, B>(f: (a: A) => ReaderT2<M, R, E, B>) => (ma: ReaderT2<M, R, E, A>) => ReaderT2<M, R, E, B>
  readonly ask: <R>() => ReaderT2<M, R, E, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT2<M, R, E, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <A>(ma: ReaderT2<M, R, E, A>) => ReaderT2<M, Q, E, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT2<M, R, E, A>
  readonly fromM: <R, A>(ma: Kind2<M, E, A>) => ReaderT2<M, R, E, A>
}

/**
 * @since 2.0.0
 */
export interface ReaderT3<M extends URIS3, R, U, E, A> {
  (r: R): Kind3<M, U, E, A>
}

/**
 * @since 3.0.0
 */
export interface ReaderM3<M extends URIS3> {
  readonly map: <A, B>(f: (a: A) => B) => <R, U, E>(ma: ReaderT3<M, R, U, E, A>) => ReaderT3<M, R, U, E, B>
  readonly of: <R, U, E, A>(a: A) => ReaderT3<M, R, U, E, A>
  readonly ap: <R, U, E, A>(
    ma: ReaderT3<M, R, U, E, A>
  ) => <B>(mab: ReaderT3<M, R, U, E, (a: A) => B>) => ReaderT3<M, R, U, E, B>
  readonly chain: <A, R, U, E, B>(
    f: (a: A) => ReaderT3<M, R, U, E, B>
  ) => (ma: ReaderT3<M, R, U, E, A>) => ReaderT3<M, R, U, E, B>
  readonly ask: <R, U, E>() => ReaderT3<M, R, U, E, R>
  readonly asks: <R, U, E, A>(f: (r: R) => A) => ReaderT3<M, R, U, E, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <U, E, A>(ma: ReaderT3<M, R, U, E, A>) => ReaderT3<M, Q, U, E, A>
  readonly fromReader: <R, U, E, A>(ma: Reader<R, A>) => ReaderT3<M, R, U, E, A>
  readonly fromM: <R, U, E, A>(ma: Kind3<M, U, E, A>) => ReaderT3<M, R, U, E, A>
}

/**
 * @since 2.0.0
 */
export function getReaderM<M extends URIS3>(M: Monad3<M>): ReaderM3<M>
export function getReaderM<M extends URIS2>(M: Monad2<M>): ReaderM2<M>
export function getReaderM<M extends URIS2, E>(M: Monad2C<M, E>): ReaderM2C<M, E>
export function getReaderM<M extends URIS>(M: Monad1<M>): ReaderM1<M>
export function getReaderM<M>(M: Monad<M>): ReaderM<M>
export function getReaderM<M>(M: Monad<M>): ReaderM<M> {
  return {
    map: (f) => (ma) => (r) => pipe(ma(r), M.map(f)),
    of: (a) => () => M.of(a),
    ap: (ma) => (mab) => (r) => pipe(mab(r), M.ap(ma(r))),
    chain: (f) => (ma) => (r) =>
      pipe(
        ma(r),
        M.chain((a) => f(a)(r))
      ),
    ask: () => M.of,
    asks: (f) => (r) => pipe(M.of(r), M.map(f)),
    local: (f) => (ma) => (q) => ma(f(q)),
    fromReader: (ma) => (r) => M.of(ma(r)),
    fromM: (ma) => () => ma
  }
}
