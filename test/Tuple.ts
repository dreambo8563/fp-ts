import * as assert from 'assert'
import * as O from '../src/Option'
import * as _ from '../src/Tuple'

describe('Tuple', () => {
  describe('instances', () => {
    describe('Traversable', () => {
      it('traverse', () => {
        const traverse = _.traverse(O.applicativeOption)((n: number) => (n > 1 ? O.some(n) : O.none))
        assert.deepStrictEqual(traverse([2, 'a']), O.some([2, 'a']))
        assert.deepStrictEqual(traverse([1, 'a']), O.none)
      })

      it('sequence', () => {
        const sequence = _.sequence(O.applicativeOption)
        assert.deepStrictEqual(sequence([O.some(2), 'a']), O.some([2, 'a']))
        assert.deepStrictEqual(sequence([O.none, 'a']), O.none)
      })
    })
  })

  it('swap', () => {
    assert.deepStrictEqual(_.swap([1, 'a']), ['a', 1])
  })
})
