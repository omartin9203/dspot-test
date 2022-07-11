/**
 * Interface to represent a array field to use in 'where' statement in findAll queries.
 *
 * @export
 * @type ArrayFieldOptions
 * @template T
 */
export type ArrayFieldOptions<T> = {
  /**
   *Array<T> is exactly equal to the passed T[].
   *
   * @type {T[]}
   */
  is?: T[];

  /**
   * Array<T> is null
   *
   * @type {boolean}
   */
  isNull?: boolean;

  /**
   * Array<T> contain all passed T values.
   *
   * @type {T[]}
   */
  containAll?: T[];

  /**
   * Array<T> contain at least one of the passed T values.
   *
   * @type {T[]}
   */
  containAny?: T[];

  /**
   * Array<T> contains the passed T value.
   *
   * @type {T}
   */
  include?: T;

  /**
   * Array<T> number of elements.
   *
   * @type {number}
   */
  length?: number;

  // /**
  //  * Array<T> doesn't contain any of the passed T values.
  //  *
  //  * @type {T[]}
  //  */
  // notContain?: T[];

  // /**
  //  * Array<T> doesn't contain at least one of the passed T values.
  //  *
  //  * @type {T[]}
  //  */
  // notContainAny?: T[];

  // /**
  //  * Array<T> isn't exactly equal to the passed T[].
  //  *
  //  * @type {T[]}
  //  */
  // notIs?: T[];
};

export enum ArrayFieldOptionsKeys {
  IS = 'is',
  IS_NULL = 'isNull',
  CONTAIN_ALL = 'containAll',
  CONTAIN_ANY = 'containAny',
  INCLUDE = 'include',
  LENGTH = 'length',

  // NOT_CONTAIN = 'notContain',
  // NOT_CONTAIN_ANY = 'notContainAny',
  // NOT_IS = 'notIs',
}
