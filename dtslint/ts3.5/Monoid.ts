import * as _ from '../../src/Monoid'

//
// getTupleMonoid
//

_.getTupleMonoid(_.monoidString, _.monoidSum, _.monoidAll) // $ExpectType Monoid<[string, number, boolean]>

//
// getStructMonoid
//

_.getStructMonoid({ a: _.monoidString, b: _.monoidSum, c: _.monoidAll }) // $ExpectType Monoid<{ a: string; b: number; c: boolean; }>
