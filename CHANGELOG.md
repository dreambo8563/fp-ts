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
  - remove deprecated APIs
  - remove `pipeable` module
  - (**b**) move `pipe` to `function.ts`
  - remove `ChainRec` module
  - remove `Choice` module
  - remove `EitherT` module
  - remove `OptionT` module
  - remove `StateT` module
  - remove `Strong` module
  - remove `ReaderT` module
  - remove the mega instances in favour of (**b**) splitted instances
  - `Applicative`
    - remove `getApplicativeComposition` in favour of
      - (**b**) `Apply.apComposition`
  - `Compactable`
    - remove `getCompactableComposition` in favour of
      - (**b**) `separateComposition`
  - `Date`
    - (**b**) rename `eqDate` to `eqGetDate`
    - (**b**) rename `eqMonth` to `eqGetMonth`
    - (**b**) rename `eqYear` to `eqGetFullYear`
  - `Either`
    - make `fromNullable` lazy, closes #918
    - remove `getValidation` in favour of
      - (**b**) add `getValidationApplicative`
      - (**b**) add `getValidationAlt`
  - `Eq`
    - move `eqDate` to `Date` module
  - `Filterable`
    - remove `getFilterableComposition` in favour of
      - (**b**) `filterComposition`
      - (**b**) `filterMapComposition`
      - (**b**) `partitionComposition`
      - (**b**) `partitionMapComposition`
  - `Foldable`
    - remove `traverse_`
    - (**b**) rename `foldM` to `reduceM`
    - remove `getFoldableComposition` in favour of
      - (**b**) `reduceComposition`
      - (**b**) `foldMapComposition`
      - (**b**) `reduceRightComposition`
  - `FoldableWithIndex`
    - remove `getFoldableWithIndexComposition` in favour of
      - (**b**) `reduceWithIndexComposition`
      - (**b**) `foldMapWithIndexComposition`
      - (**b**) `reduceRightWithIndexComposition`
  - `Functor`
    - remove `getFunctorComposition`
  - `FunctorWithIndex`
    - remove `getFunctorWithIndexComposition` in favour of
      - (**b**) `mapWithIndexComposition`
  - `IOEither`
    - remove `getIOValidation` in favour of
      - (**b**) add `getIOValidationApplicative`
      - (**b**) add `getIOValidationAlt`
  - `Ord`
    - (**b**) move `ordDate` to `Date` module
  - `ReaderEither`
    - remove `getReaderValidation` in favour of
      - (**b**) add `getReaderValidationApplicative`
      - (**b**) add `getReaderValidationAlt`
    - remove `local`
  - `ReaderTask`
    - remove `local`
    - remove `run`
  - `ReaderTaskEither`
    - remove `local`
    - remove `run`
    - `getReaderTaskValidation` in favour of
      - (**b**) add `getReaderTaskValidationApplicative`
      - (**b**) add `getReaderTaskValidationAlt`
  - `ReadonlyTuple`
    - remove `getChainRec` function
  - `Semigroupoid`
    - rename the type-class operation `compose` to `pipe`
  - `State`
    - (**b**) curry `evalState` and rename to `evaluate`
    - (**b**) curry `execState` and rename to `execute`
  - `StateReaderTaskEither`
    - (**b**) curry `evalState` and rename to `evaluate`
    - (**b**) curry `execState` and rename to `execute`
    - remove `run` function
  - `TaskEither`
    - `getTaskValidation` in favour of
      - (**b**) add `getTaskValidationApplicative`
      - (**b**) add `getTaskValidationAlt`
  - `TaskThese`
    - make `toTuple` lazy
  - `These`
    - make `toTuple` lazy
    - make `leftOrBoth` lazy
    - make `rightOrBoth` lazy
  - `TheseT`
    - make `toTuple` lazy
  - `Traversable`
    - remove `getTraversableComposition` in favour of
      - (**b**) `traverseComposition`
      - (**b**) `sequenceComposition`
  - `Traced`
    - curry `tracks`
  - `Tuple`
    - remove `getChainRec` function
  - `Writer`
    - (**b**) rename `evalWriter` to `evaluate`
    - (**b**) rename `execWriter` to `execute`

(**b**) means "backportable"
