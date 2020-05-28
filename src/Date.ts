/**
 * @since 2.0.0
 */
import { IO } from './IO'
import { Eq, fromEquals } from './Eq'
import { Ord, fromCompare, ordNumber } from './Ord'

/**
 * Returns the current `Date`
 *
 * @since 2.0.0
 */
export const create: IO<Date> = () => new Date()

/**
 * Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC
 *
 * @since 2.0.0
 */
export const now: IO<number> = () => new Date().getTime()

/**
 * @since 3.0.0
 */
export const eqDate: Eq<Date> =
  /*#__PURE__*/
  fromEquals((x, y) => x.valueOf() === y.valueOf())

/**
 * @since 3.0.0
 */
export const eqGetDate: Eq<Date> =
  /*#__PURE__*/
  fromEquals((x, y) => x.getDate() === y.getDate())

/**
 * @since 3.0.0
 */
export const eqGetMonth: Eq<Date> =
  /*#__PURE__*/
  fromEquals((x, y) => x.getMonth() === y.getMonth())

/**
 * @since 3.0.0
 */
export const eqGetFullYear: Eq<Date> =
  /*#__PURE__*/
  fromEquals((x, y) => x.getFullYear() === y.getFullYear())

/**
 * @since 3.0.0
 */
export const ordDate: Ord<Date> =
  /*#__PURE__*/
  fromCompare((x, y) => ordNumber.compare(x.valueOf(), y.valueOf()))
