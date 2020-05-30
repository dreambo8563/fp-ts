import * as assert from 'assert'
import * as A from '../src/Array'
import * as _ from '../src/Filterable'
import { some, none } from '../src/Option'
import { right, left } from '../src/Either'
import { pipe } from '../src/function'

describe('Filterable', () => {
  it('getFilterableComposition', () => {
    const F = _.getFilterableComposition(A.functorArray, A.filterableArray)
    assert.deepStrictEqual(
      pipe(
        [
          [1, 2],
          [3, 4]
        ],
        F.filter((a) => a > 1)
      ),
      [[2], [3, 4]]
    )

    assert.deepStrictEqual(
      pipe(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        F.filterMap((a) => (a.length > 1 ? some(a.length) : none))
      ),
      [[2], [3, 4]]
    )

    assert.deepStrictEqual(
      pipe(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        F.partition((a) => a.length % 2 === 0)
      ),
      {
        left: [['a'], ['ccc']],
        right: [['bb'], ['dddd']]
      }
    )

    assert.deepStrictEqual(
      pipe(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        F.partitionMap((a) => (a.length % 2 === 0 ? right(a.length) : left(a)))
      ),
      {
        left: [['a'], ['ccc']],
        right: [[2], [4]]
      }
    )
  })
})
