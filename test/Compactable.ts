import * as assert from 'assert'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/Compactable'
import { left, right } from '../src/Either'

describe('Compactable', () => {
  it('separateComposition', () => {
    const separate = _.separateComposition(RA.functorReadonlyArray, {
      ...RA.compactableReadonlyArray,
      ...RA.functorReadonlyArray
    })
    assert.deepStrictEqual(
      separate([
        [left('a'), right(1)],
        [right(2), left('b')]
      ]),
      {
        left: [['a'], ['b']],
        right: [[1], [2]]
      }
    )
  })
})
