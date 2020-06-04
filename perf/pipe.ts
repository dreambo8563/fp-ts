import * as Benchmark from 'benchmark'
import * as O from '../src/Option'
import { pipe } from '../src/function'

const suite = new Benchmark.Suite()

/*
pipe x 14,576,735 ops/sec ±1.28% (88 runs sampled)
class x 75,836,185 ops/sec ±3.25% (78 runs sampled)
*/

class Just<A> {
  constructor(readonly a: A) {}
  map<B>(f: (a: A) => B): Maybe<B> {
    return new Just(f(this.a))
  }
  chain<B>(f: (a: A) => Maybe<B>): Maybe<B> {
    return f(this.a)
  }
}

class Nothing<A> {
  // tslint:disable-next-line: no-empty
  constructor() {}
  map<B>(_: (a: A) => B): Maybe<B> {
    return nothing
  }
  chain<B>(_: (a: A) => Maybe<B>): Maybe<B> {
    return nothing
  }
}

type Maybe<A> = Just<A> | Nothing<A>

const nothing: Maybe<never> = new Nothing()
const just = <A>(a: A): Maybe<A> => new Just(a)

suite
  .add('pipe', function () {
    pipe(
      O.some(1),
      O.map((n) => n * 2),
      O.chain((n) => (n > 2 ? O.some(n) : O.none)),
      O.map((n) => n + 1)
    )
  })
  .add('class', function () {
    just(1)
      .map((n) => n * 2)
      .chain((n) => (n > 2 ? just(n) : nothing))
      .map((n) => n + 1)
  })
  .on('cycle', function (event: any) {
    // tslint:disable-next-line: no-console
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    // tslint:disable-next-line: no-console
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
