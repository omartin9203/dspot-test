import { IEntity, EntityBaseProps, BaseProps } from './interfaces/IEntity';
import { Identifier } from './Identifier';

export abstract class DomainEntity<T extends BaseProps> implements IEntity {
  protected constructor(protected readonly props: EntityBaseProps<T>, public readonly id: Identifier) {}

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public equals(entity: DomainEntity<T>): boolean {
    if (entity === null || entity === undefined) return false;
    if (this === entity) return true;
    return this.id === entity.id;
  }
}
