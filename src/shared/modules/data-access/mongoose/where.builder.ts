import { WhereType } from '../../../core/domain/types/base-where.type';
import {FilterableFieldsType} from "./base.respository";
import {PersistentEntity} from "./base.entity";

import {Condition} from 'mongodb';
import {FilterQuery} from "mongoose";

type FieldQuery<T> = {
  [P in keyof T]?: Condition<T[P]>;
};

export const buildWhereFromWhereType = <T extends PersistentEntity>(
  where: WhereType<FilterableFieldsType<T>> = {}
): FilterQuery<T> => {
  const result: any = {$or: new Array<FieldQuery<T>>()};
  const items = where instanceof Array ? where : [where];
  items.forEach(item => {
    const and: any = { };
    Object
      .keys(item ?? {})
      .forEach(key => {
        and[key] = buildFieldWhere(item[key]);
      });
    result['$or'].push(and);
  })
  return result;
}

const buildFieldWhere = <T>(input: T): Condition<unknown> | undefined => {
  const operator = Object.keys(input).find(_ => true);
  if(!operator) return undefined;
  switch (operator) {
    case 'is':
      return {$eq: input[operator]};
    case 'in':
      return {$in: input[operator]};
    case 'isNull':
      return input[operator] ? null : {$exists: true, $ne: null};
    case 'not':
      return {$not: {$eq: input[operator]}};
    case 'notIn':
      return {$not: {$in: input[operator]}};
    case 'contains':
      return {$regex: new RegExp(`.*${input[operator]}.*`, 'i')};
    case 'notContains':
      return {$not: {$regex: new RegExp(`.*${input[operator]}.*`, 'i')}};
    case 'startsWith':
      return {$regex: new RegExp(`^${input[operator]}.*`, 'i')};
    case 'notStartsWith':
      return {$not: {$regex: new RegExp(`^${input[operator]}.*`, 'i')}};
    case 'endsWith':
      return {$regex: new RegExp(`.*${input[operator]}$`, 'i')};
    case 'notEndsWith':
      return {$not: {$regex: new RegExp(`.*${input[operator]}$`, 'i')}};
    case 'gt':
      return {$gt: input[operator]};
    case 'gte':
      return {$gte: input[operator]};
    case 'lt':
      return {$lt: input[operator]};
    case 'lte':
      return {$lte: input[operator]};
    case 'between':
      return {$gte: input[operator].from, $lte: input[operator].to};
    case 'containAll':
      return {$all: input[operator]};
    case 'containAny':
      return {$elemMatch: {$in: input[operator]}};
    case 'length':
      return {$size: input[operator]};
    case 'include':
      return {$elemMatch: {$eq: input[operator]}};
    default:
      return undefined;
  }
}
