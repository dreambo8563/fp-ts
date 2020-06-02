# Changelog

> **Tags:**
>
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]
> - [Deprecation]

**Note**: Gaps between patch versions are faulty/broken releases. **Note**: A feature tagged as Experimental is in a
high state of flux, you're at risk of it changing without notice.

# 3.0.0

- **Breaking Change**
  - remove deprecated APIs (@gcanti)
  - remove `pipeable` module (@gcanti)
  - (**b**) move `pipe` to `function.ts` (@gcanti)
  - remove `ChainRec` module (@gcanti)
  - remove `Choice` module (@gcanti)
  - remove `Strong` module (@gcanti)
  - remove the mega instances in favour of (**b**) splitted instances (@gcanti)
  - `Applicative`
    - remove `getApplicativeComposition` in favour of
      - (**b**) `Apply.apComposition` (@gcanti)
  - `Compactable`
    - remove `getCompactableComposition` in favour of
      - (**b**) `separateComposition` (@gcanti)
  - `Date`
    - (**b**) rename `eqDate` to `eqGetDate` (@gcanti)
    - (**b**) rename `eqMonth` to `eqGetMonth` (@gcanti)
    - (**b**) rename `eqYear` to `eqGetFullYear` (@gcanti)
  - `Either`
    - make `fromNullable` lazy, closes #918 (@gcanti)
    - `getValidation` now returns an instance of `Applicative2C & Alt2C` (@gcanti)
  - `EitherT`
    - remove `getEitherM` in favour of (**b**) splitted functions (@gcanti)
  - `Eq`
    - move `eqDate` to `Date` module (@gcanti)
  - `Filterable`
    - remove `getFilterableComposition` in favour of
      - (**b**) `filterComposition` (@gcanti)
      - (**b**) `filterMapComposition` (@gcanti)
      - (**b**) `partitionComposition` (@gcanti)
      - (**b**) `partitionMapComposition` (@gcanti)
  - `Foldable`
    - remove `traverse_` (@gcanti)
    - (**b**) rename `foldM` to `reduceM` (@gcanti)
  - `Functor`
    - remove `getFunctorComposition` (@gcanti)
  - `FunctorWithIndex`
    - remove `getFunctorWithIndexComposition` in favour of
      - (**b**) `mapWithIndexComposition` (@gcanti)
  - `IOEither`
    - `getIOValidation` now returns an instance of `Applicative2C & Alt2C` (@gcanti)
  - `Ord`
    - (**b**) move `ordDate` to `Date` module (@gcanti)
  - `ReaderEither`
    - `getReaderValidation` now returns an instance of `Applicative3C & Alt3C` (@gcanti)
    - remove `local` (@gcanti)
  - `ReaderTask`
    - remove `local` (@gcanti)
  - `ReaderTaskEither`
    - remove `local` (@gcanti)
    - `getReaderTaskValidation` now returns an instance of `Applicative3C & Alt3C` (@gcanti)
  - `ReadonlyTuple`
    - remove `getChainRec` function (@gcanti)
  - `Semigroupoid`
    - rename the type-class operation `compose` to `pipe` (@gcanti)
  - `State`
    - (**b**) curry `evalState` and rename to `evaluate` (@gcanti)
    - (**b**) curry `execState` and rename to `execute` (@gcanti)
  - `StateReaderTaskEither`
    - (**b**) curry `evalState` and rename to `evaluate` (@gcanti)
    - (**b**) curry `execState` and rename to `execute` (@gcanti)
    - remove `run` function (@gcanti)
  - `TaskEither`
    - `getTaskValidation` now returns an instance of `Applicative2C & Alt2C` (@gcanti)
  - `TaskThese`
    - make `toTuple` lazy (@gcanti)
  - `These`
    - make `toTuple` lazy (@gcanti)
    - make `leftOrBoth` lazy (@gcanti)
    - make `rightOrBoth` lazy (@gcanti)
  - `TheseT`
    - make `toTuple` lazy (@gcanti)
  - `Traversable`
    - remove `getTraversableComposition` in favour of
      - (**b**) `traverseComposition` (@gcanti)
      - (**b**) `sequenceComposition` (@gcanti)
  - `Traced`
    - curry `tracks` (@gcanti)
  - `Tuple`
    - remove `getChainRec` function (@gcanti)

(**b**) means "backportable"
