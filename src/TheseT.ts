/**
 * @since 2.4.0
 */
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
import { Semigroup } from './Semigroup'
import * as TH from './These'
import { pipe } from './function'

/**
 * @since 2.4.0
 */
export interface TheseT<M, E, A> extends HKT<M, TH.These<E, A>> {}

/**
 * @since 3.0.0
 */
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

/**
 * @since 2.4.0
 */
export type TheseT1<M extends URIS, E, A> = Kind<M, TH.These<E, A>>

/**
 * @since 3.0.0
 */
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

/**
 * @since 2.4.0
 */
export type TheseT2<M extends URIS2, R, E, A> = Kind2<M, R, TH.These<E, A>>

/**
 * @since 3.0.0
 */
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

/**
 * @since 2.4.0
 */
export function getTheseM<M extends URIS2>(M: Monad2<M>): TheseM2<M>
export function getTheseM<M extends URIS>(M: Monad1<M>): TheseM1<M>
export function getTheseM<M>(M: Monad<M>): TheseM<M>
export function getTheseM<M>(M: Monad<M>): TheseM<M> {
  const map = <A, B>(f: (a: A) => B) => <E>(fa: TheseT<M, E, A>): TheseT<M, E, B> => pipe(fa, M.map(TH.map(f)))

  const of = <E, A>(a: A): TheseT<M, E, A> => M.of(TH.right(a))

  const left = <E = never, A = never>(e: E): TheseT<M, E, A> => M.of(TH.left(e))

  return {
    map,
    bimap: (f, g) => M.map(TH.bimap(f, g)),
    mapLeft: (f) => M.map(TH.mapLeft(f)),
    fold: (onLeft, onRight, onBoth) => M.chain(TH.fold(onLeft, onRight, onBoth)),
    swap: M.map(TH.swap),
    rightM: M.map(TH.right),
    leftM: M.map(TH.left),
    left: left,
    right: of,
    both: (e, a) => M.of(TH.both(e, a)),
    toTuple: (e, a) => M.map(TH.toTuple(e, a)),
    getMonad: <E>(E: Semigroup<E>) => {
      const chain = <A, B>(f: (a: A) => TheseT<M, E, B>): ((fa: TheseT<M, E, A>) => TheseT<M, E, B>) =>
        M.chain(
          TH.fold(left, f, (e1, a) =>
            pipe(
              f(a),
              M.map(
                TH.fold(
                  (e2) => TH.left(E.concat(e1, e2)),
                  TH.right,
                  (e2, b) => TH.both(E.concat(e1, e2), b)
                )
              )
            )
          )
        )

      return {
        _E: undefined as any,
        map: map,
        of,
        ap: <A>(fa: TheseT<M, E, A>) => <B>(fab: TheseT<M, E, (a: A) => B>): TheseT<M, E, B> =>
          pipe(
            fab,
            chain((f) => pipe(fa, map(f)))
          ),
        chain
      }
    }
  }
}
