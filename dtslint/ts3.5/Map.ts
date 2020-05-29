import * as _ from '../../src/Map'
import { pipe } from '../../src/function'

//
// FilterableWithIndex overloadings
//

const FWI = _.getFilterableWithIndex<'a' | 'b'>()

declare function isStringWithKey(i: 'a' | 'b', x: string | number): x is string

pipe(_.empty as Map<'a' | 'b', string | number>, FWI.filterWithIndex(isStringWithKey)) // $ExpectType Map<"a" | "b", string>
pipe(_.empty as Map<'a' | 'b', string | number>, FWI.partitionWithIndex(isStringWithKey)) // $ExpectType Separated<Map<"a" | "b", string | number>, Map<"a" | "b", string>>
