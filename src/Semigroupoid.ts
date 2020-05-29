/**
 * @since 2.0.0
 */
import { HKT2, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @since 3.0.0
 */
export interface Semigroupoid<F> {
  readonly URI: F
  readonly pipe: <B, C>(fbc: HKT2<F, B, C>) => <A>(fab: HKT2<F, A, B>) => HKT2<F, A, C>
}

/**
 * @since 3.0.0
 */
export interface Semigroupoid2<F extends URIS2> {
  readonly URI: F
  readonly pipe: <B, C>(fbc: Kind2<F, B, C>) => <A>(fab: Kind2<F, A, B>) => Kind2<F, A, C>
}

/**
 * @since 3.0.0
 */
export interface Semigroupoid2C<F extends URIS2, A> {
  readonly URI: F
  readonly _E: A
  readonly pipe: <B, C>(fbc: Kind2<F, B, C>) => (fab: Kind2<F, A, B>) => Kind2<F, A, C>
}

/**
 * @since 3.0.0
 */
export interface Semigroupoid3<F extends URIS3> {
  readonly URI: F
  readonly pipe: <R, B, C>(fbc: Kind3<F, R, B, C>) => <A>(fab: Kind3<F, R, A, B>) => Kind3<F, R, A, C>
}

/**
 * @since 3.0.0
 */
export interface Semigroupoid3C<F extends URIS3, A> {
  readonly URI: F
  readonly _E: A
  readonly pipe: <R, B, C>(fbc: Kind3<F, R, B, C>) => (fab: Kind3<F, R, A, B>) => Kind3<F, R, A, C>
}

/**
 * @since 3.0.0
 */
export interface Semigroupoid4<F extends URIS4> {
  readonly URI: F
  readonly pipe: <S, R, B, C>(fbc: Kind4<F, S, R, B, C>) => <A>(fab: Kind4<F, S, R, A, B>) => Kind4<F, S, R, A, C>
}
