import { Identifier } from 'src/shared/core/domain/Identifier';

export type BaseProps = {
  [index: string]: unknown;
};

export type EntityBaseProps<T extends BaseProps> = T & {
  createdAt: Date;
  updatedAt: Date;
};

export interface IEntity {
  readonly id: Identifier;
  createdAt: Date;
  updatedAt: Date;
  equals(entity: IEntity): boolean;
}
