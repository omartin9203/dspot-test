import { IEntity, BaseProps } from './interfaces/IEntity';
import { Identifier } from './Identifier';

export abstract class DomainEntity<T extends BaseProps> implements IEntity {
  public readonly _id: Identifier;
  protected readonly props: T;

  protected constructor(props: T, id: Identifier) {
    this._id = id;
    this.props = props;
  }

  public equals(entity: DomainEntity<T>): boolean {
    if (entity === null || entity === undefined) return false;
    if (this === entity) return true;
    return this._id === entity._id;
  }
}
