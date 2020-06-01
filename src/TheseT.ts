/**
 * @since 2.4.0
 */
import { pipe } from './function'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
import { Semigroup } from './Semigroup'
import * as TH from './These'

/**
 * @since 2.4.0
 */
export interface TheseT<M, E, A> extends HKT<M, TH.These<E, A>> {}

/**
 * @since 2.4.0
 */
export type TheseT1<M extends URIS, E, A> = Kind<M, TH.These<E, A>>

/**
 * @since 2.4.0
 */
export type TheseT2<M extends URIS2, R, E, A> = Kind2<M, R, TH.These<E, A>>

/**
 * @since 3.0.0
 */
export function chain<M extends URIS2>(
  F: Monad2<M>
): <E>(
  S: Semigroup<E>
) => <A, R, B>(f: (a: A) => TheseT2<M, R, E, B>) => (fa: TheseT2<M, R, E, A>) => TheseT2<M, R, E, B>
export function chain<M extends URIS>(
  F: Monad1<M>
): <E>(S: Semigroup<E>) => <A, B>(f: (a: A) => TheseT1<M, E, B>) => (fa: TheseT1<M, E, A>) => TheseT1<M, E, B>
export function chain<M>(
  F: Monad<M>
): <E>(S: Semigroup<E>) => <A, B>(f: (a: A) => TheseT<M, E, B>) => (fa: TheseT<M, E, A>) => TheseT<M, E, B>
export function chain<M>(
  M: Monad<M>
): <E>(S: Semigroup<E>) => <A, B>(f: (a: A) => TheseT<M, E, B>) => (fa: TheseT<M, E, A>) => TheseT<M, E, B> {
  return (S) => (f) =>
    M.chain(
      TH.fold(
        (e) => M.of(TH.left(e)),
        f,
        (e1, a) =>
          pipe(
            f(a),
            M.map(
              TH.fold(
                (e2) => TH.left(S.concat(e1, e2)),
                TH.right,
                (e2, b) => TH.both(S.concat(e1, e2), b)
              )
            )
          )
      )
    )
}
