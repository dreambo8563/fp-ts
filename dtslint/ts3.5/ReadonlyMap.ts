import * as _ from '../../src/ReadonlyMap'
import { pipe } from '../../src/function'

//
// FilterableWithIndex overloadings
//

const FWI = _.getFilterableWithIndex<'a' | 'b'>()

declare function isStringWithKey(i: 'a' | 'b', x: string | number): x is string

pipe(_.empty as ReadonlyMap<'a' | 'b', string | number>, FWI.filterWithIndex(isStringWithKey)) // $ExpectType ReadonlyMap<"a" | "b", string>
pipe(_.empty as ReadonlyMap<'a' | 'b', string | number>, FWI.partitionWithIndex(isStringWithKey)) // $ExpectType Separated<ReadonlyMap<"a" | "b", string | number>, ReadonlyMap<"a" | "b", string>>
