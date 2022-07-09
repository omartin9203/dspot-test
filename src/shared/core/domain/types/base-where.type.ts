import { IQuantitativeFieldOptions } from '../../../modules/data-access/types/IQuantitativeFieldOptions';
import { QualitativeFieldOptions } from '../../../modules/data-access/types/IQualitativeFieldOptions';

export type WhereType<T> = BaseWhereType<T> | BaseWhereType<T>[]

type BaseWhereType<T> = {
  [K in keyof BaseType<T>]?: BaseType<T>[K];
}

type BaseType<T> = T & {
  _id: QualitativeFieldOptions;
  updatedAt: IQuantitativeFieldOptions<Date>;
  createdAt: IQuantitativeFieldOptions<Date>;
}
