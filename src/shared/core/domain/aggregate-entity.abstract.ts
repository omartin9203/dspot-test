import { AggregateRoot } from '@nestjs/cqrs';
import { IEntity, EntityBaseProps, BaseProps } from './interfaces/IEntity';
import { Identifier } from './Identifier';
import { Logger } from '@nestjs/common';

export abstract class AggregateDomainEntity<TProps extends BaseProps> extends AggregateRoot implements IEntity {
  protected _logger: Logger;

  protected constructor(
    protected readonly props: EntityBaseProps<TProps>,
    public readonly id: Identifier,
    ctx = 'AggregateDomainEntity'
  ) {
    super();
    this.id = id;
    this.props = props;
    this._logger = new Logger(ctx);
  }

  public equals(entity: AggregateDomainEntity<TProps>): boolean {
    if (entity === null || entity === undefined) return false;
    if (this === entity) return true;
    return this.id === entity.id;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
