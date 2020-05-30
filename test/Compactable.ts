import * as assert from 'assert'
import * as A from '../src/Array'
import * as _ from '../src/Compactable'
import { none, some } from '../src/Option'
import { left, right } from '../src/Either'

describe('Compactable', () => {
  it('getCompactableComposition', () => {
    const C = _.getCompactableComposition(A.functorArray, { ...A.compactableArray, ...A.functorArray })
    assert.deepStrictEqual(
      C.compact([
        [some(1), none],
        [none, some(2)]
      ]),
      [[1], [2]]
    )
    assert.deepStrictEqual(
      C.separate([
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
