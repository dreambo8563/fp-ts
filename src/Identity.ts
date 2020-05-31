/**
 * @since 2.0.0
 */
import { Alt1 } from './Alt'
import { Applicative, Applicative1 } from './Applicative'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { Foldable1 } from './Foldable'
import { identity as id, pipe } from './function'
import { HKT } from './HKT'
import { Monad1 } from './Monad'
import { Monoid } from './Monoid'
import { Show } from './Show'
import { Traversable1 } from './Traversable'
import { Functor1 } from './Functor'
import { Apply1 } from './Apply'
import { Extend1 } from './Extend'

/**
 * @since 2.0.0
 */
export const URI = 'Identity'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Identity<A>
  }
}

/**
 * @since 2.0.0
 */
export type Identity<A> = A

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const getShow: <A>(S: Show<A>) => Show<Identity<A>> = id

/**
 * @since 2.0.0
 */
export const getEq: <A>(E: Eq<A>) => Eq<Identity<A>> = id

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Identity<A>) => Identity<B> = (f) => (fa) => f(fa)

/**
 * @since 3.0.0
 */
export const functorIdentity: Functor1<URI> = {
  URI,
  map
}

/**
 * @since 2.0.0
 */
export const ap: <A>(fa: Identity<A>) => <B>(fab: Identity<(a: A) => B>) => Identity<B> = (fa) => (fab) => fab(fa)

/**
 * @since 3.0.0
 */
export const applyIdentity: Apply1<URI> = {
  URI,
  map,
  ap
}

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
 * @since 3.0.0
 */
export const of: <A>(a: A) => Identity<A> = id

/**
 * @since 3.0.0
 */
export const applicativeIdentity: Applicative1<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * @since 2.0.0
 */
export const chain: <A, B>(f: (a: A) => Identity<B>) => (ma: Identity<A>) => Identity<B> = (f) => (ma) => f(ma)

/**
 * @since 3.0.0
 */
export const monadIdentity: Monad1<URI> = {
  URI,
  map,
  ap,
  of,
  chain
}

/**
 * @since 2.0.0
 */
export const chainFirst: <A, B>(f: (a: A) => Identity<B>) => (ma: Identity<A>) => Identity<A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @since 2.0.0
 */
export const flatten: <A>(mma: Identity<Identity<A>>) => Identity<A> = chain(id)

/**
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Identity<A>) => B = (b, f) => (fa) => f(b, fa)

/**
 * @since 2.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Identity<A>) => M = () => (f) => (fa) => f(fa)

/**
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Identity<A>) => B = (b, f) => (fa) => f(fa, b)

/**
 * @since 3.0.0
 */
export const foldableIdentity: Foldable1<URI> = {
  URI,
  reduce,
  foldMap,
  reduceRight
}

/**
 * @since 2.0.0
 */
export const alt: <A>(that: () => Identity<A>) => (fa: Identity<A>) => Identity<A> = () => id

/**
 * @since 3.0.0
 */
export const altIdentity: Alt1<URI> = {
  URI,
  map,
  alt
}

/**
 * @since 2.0.0
 */
export const extend: <A, B>(f: (wa: Identity<A>) => B) => (wa: Identity<A>) => Identity<B> = (f) => (wa) => f(wa)

/**
 * @since 3.0.0
 */
export const extendIdentity: Extend1<URI> = {
  URI,
  map,
  extend
}

/**
 * @since 2.0.0
 */
export const duplicate: <A>(ma: Identity<A>) => Identity<Identity<A>> =
  /*#__PURE__*/
  extend(id)

/**
 * @since 2.6.2
 */
export const extract: <A>(wa: Identity<A>) => A = id

/**
 * @since 3.0.0
 */
export const comonadIdentity: Comonad1<URI> = {
  URI,
  map,
  extend,
  extract
}

/**
 * @since 3.0.0
 */
export const traverse: Traversable1<URI>['traverse'] = <F>(F: Applicative<F>) => <A, B>(f: (a: A) => HKT<F, B>) => (
  ta: Identity<A>
): HKT<F, Identity<B>> => pipe(f(ta), F.map(id))

/**
 * @since 3.0.0
 */
export const sequence: Traversable1<URI>['sequence'] = <F>(F: Applicative<F>) => <A>(
  ta: Identity<HKT<F, A>>
): HKT<F, Identity<A>> => {
  return pipe(ta, F.map(id))
}

/**
 * @since 3.0.0
 */
export const traversableIdentity: Traversable1<URI> = {
  URI,
  map,
  reduce,
  foldMap,
  reduceRight,
  traverse,
  sequence
}
