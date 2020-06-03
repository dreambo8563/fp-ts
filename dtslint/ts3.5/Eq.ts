import * as _ from '../../src/Eq'

//
// getTupleEq
//

_.getTupleEq(_.eqString, _.eqNumber, _.eqBoolean) // $ExpectType Eq<[string, number, boolean]>

//
// getStructEq
//

_.getStructEq({ a: _.eqString, b: _.eqNumber, c: _.eqBoolean }) // $ExpectType Eq<{ a: string; b: number; c: boolean; }>
