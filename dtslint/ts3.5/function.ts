import * as _ from '../../src/function'
import * as RA from '../../src/ReadonlyArray'

//
// flip
//

// should handle generics
_.flip(RA.cons) // $ExpectType <A>(b: readonly A[], a: A) => ReadonlyNonEmptyArray<A>

//
// tuple
//

_.tuple() // $ExpectType []
_.tuple(1) // $ExpectType [number]
_.tuple(1, 'a') // $ExpectType [number, string]
_.tuple(1, 'a', true) // $ExpectType [number, string, boolean]

// $ExpectType <A>(head: A, tail: readonly A[]) => Option<A>
_.flow(RA.cons, RA.head)

//
// tupled
//

_.tupled(RA.insertAt) // $ExpectType <A>(a: readonly [number, A]) => (as: readonly A[]) => Option<readonly A[]>

//
// untupled
//

_.untupled(_.tupled(RA.insertAt)) // $ExpectType <A>(i: number, a: A) => (as: readonly A[]) => Option<readonly A[]>
