/**
 * @since 2.0.0
 */
import { Either, isLeft, isRight, left, right } from './Either'
import { pipe } from './function'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
import { Semigroup } from './Semigroup'

/**
 * @since 2.0.0
 */
export interface ValidationT<M, E, A> extends HKT<M, Either<E, A>> {}

/**
 * @since 3.0.0
 */
export interface ValidationM<M, E> {
  readonly alt: <A>(that: () => ValidationT<M, E, A>) => (fa: ValidationT<M, E, A>) => ValidationT<M, E, A>
}

/**
 * @since 2.0.0
 */
export type ValidationT1<M extends URIS, E, A> = Kind<M, Either<E, A>>

/**
 * @since 2.0.0
 */
export type ValidationT2<M extends URIS2, R, E, A> = Kind2<M, R, Either<E, A>>

/**
 * @since 3.0.0
 */
export function alt<E, M extends URIS2>(
  S: Semigroup<E>,
  M: Monad2<M>
): <R, A>(that: () => ValidationT2<M, R, E, A>) => (fa: ValidationT2<M, R, E, A>) => ValidationT2<M, R, E, A>
export function alt<E, M extends URIS>(
  S: Semigroup<E>,
  M: Monad1<M>
): <A>(that: () => ValidationT1<M, E, A>) => (fa: ValidationT1<M, E, A>) => ValidationT1<M, E, A>
export function alt<E, M>(
  S: Semigroup<E>,
  M: Monad<M>
): <A>(that: () => ValidationT<M, E, A>) => (fa: ValidationT<M, E, A>) => ValidationT<M, E, A>
export function alt<E, M>(
  S: Semigroup<E>,
  M: Monad<M>
): <A>(that: () => ValidationT<M, E, A>) => (fa: ValidationT<M, E, A>) => ValidationT<M, E, A> {
  return (that) =>
    M.chain((e1) =>
      isRight(e1)
        ? M.of(right(e1.right))
        : pipe(
            that(),
            M.map((e2) => (isLeft(e2) ? left(S.concat(e1.left, e2.left)) : e2))
          )
    )
}
