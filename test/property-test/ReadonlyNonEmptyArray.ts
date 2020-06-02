import * as fc from 'fast-check'
import { ReadonlyNonEmptyArray } from '../../src/ReadonlyNonEmptyArray'

/**
 * Returns an `Arbitrary` that yelds a reaodnly non empty array
 */
export function readonlyNonEmptyArray<A>(arb: fc.Arbitrary<A>): fc.Arbitrary<ReadonlyNonEmptyArray<A>> {
  return fc.array(arb, 1, 100) as any
}
