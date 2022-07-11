import { registerEnumType } from '@nestjs/graphql';

export enum OrderByType {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderByType, {name: 'OrderByType'});
