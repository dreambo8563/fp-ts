/**
 * @since 2.0.0
 */
import { Alt1 } from './Alt'
import { Applicative } from './Applicative'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { Foldable1 } from './Foldable'
import { identity as id, pipe } from './function'
import { HKT } from './HKT'
import { Monad1 } from './Monad'
import { Monoid } from './Monoid'
import { Show } from './Show'
import { Traversable1 } from './Traversable'

declare module './HKT' {
  interface URItoKind<A> {
    readonly Identity: Identity<A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Identity'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export type Identity<A> = A

/**
 * @since 2.0.0
 */
export const getShow: <A>(S: Show<A>) => Show<Identity<A>> = id

/**
 * @since 2.0.0
 */
export const getEq: <A>(E: Eq<A>) => Eq<Identity<A>> = id

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

const traverse_ = <F>(F: Applicative<F>) => <A, B>(ta: Identity<A>, f: (a: A) => HKT<F, B>): HKT<F, Identity<B>> => {
  return pipe(f(ta), F.map(id))
}

const sequence_ = <F>(F: Applicative<F>) => <A>(ta: Identity<HKT<F, A>>): HKT<F, Identity<A>> => {
  return pipe(ta, F.map(id))
}

/**
 * @since 2.0.0
 */
export const alt: <A>(that: () => Identity<A>) => (fa: Identity<A>) => Identity<A> = () => id

/**
 * @since 2.0.0
 */
export const ap: <A>(fa: Identity<A>) => <B>(fab: Identity<(a: A) => B>) => Identity<B> = (fa) => (fab) => fab(fa)

/**
 * @since 2.0.0
 */
export const apFirst: <B>(fb: Identity<B>) => <A>(fa: Identity<A>) => Identity<A> = (fb) => (fa) =>
  pipe(
    fa,
    map((a) => () => a),
    ap(fb)
  )

/**
 * @since 2.0.0
 */
export const apSecond = <B>(fb: Identity<B>) => <A>(fa: Identity<A>): Identity<B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @since 2.0.0
 */
export const chain: <A, B>(f: (a: A) => Identity<B>) => (ma: Identity<A>) => Identity<B> = (f) => (ma) => f(ma)

/**
 * @since 2.0.0
 */
export const chainFirst: <A, B>(f: (a: A) => Identity<B>) => (ma: Identity<A>) => Identity<A> = (f) => (ma) =>
  pipe(
    ma,
    chain((a) =>
      pipe(
        f(a),
        map(() => a)
      )
    )
  )

/**
 * @since 2.6.2
 */
export const extract: <A>(wa: Identity<A>) => A = id

/**
 * @since 2.0.0
 */
export const extend: <A, B>(f: (wa: Identity<A>) => B) => (wa: Identity<A>) => Identity<B> = (f) => (wa) => f(wa)

/**
 * @since 2.0.0
 */
export const duplicate: <A>(ma: Identity<A>) => Identity<Identity<A>> = extend(id)

/**
 * @since 2.0.0
 */
export const flatten: <A>(mma: Identity<Identity<A>>) => Identity<A> = chain(id)

/**
 * @since 2.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Identity<A>) => M = () => (f) => (fa) => f(fa)

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Identity<A>) => Identity<B> = (f) => (fa) => f(fa)

/**
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Identity<A>) => B = (b, f) => (fa) => f(b, fa)

/**
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Identity<A>) => B = (b, f) => (fa) => f(fa, b)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @internal
 */
export const monadIdentity: Monad1<URI> = {
  URI,
  map,
  of: id,
  ap,
  chain
}

/**
 * @since 2.0.0
 */
export const identity: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Alt1<URI> & Comonad1<URI> = {
  URI,
  map,
  of: id,
  ap,
  chain,
  reduce,
  foldMap,
  reduceRight,
  traverse: traverse_,
  sequence: sequence_,
  alt,
  extract,
  extend
}
