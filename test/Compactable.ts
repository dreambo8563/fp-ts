import * as assert from 'assert'
import * as A from '../src/Array'
import * as _ from '../src/Compactable'
import { left, right } from '../src/Either'

describe('Compactable', () => {
  it('separateComposition', () => {
    const separate = _.separateComposition(A.functorArray, { ...A.compactableArray, ...A.functorArray })
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
