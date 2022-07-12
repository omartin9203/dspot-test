import { ObjectId } from 'mongodb';
import { ValueObject } from './value-object.abstract';
import { Result } from './Result';
import { Guard } from './Guard';
import { AppError } from './errors/AppError';

type EntityIdValueObjectProps = {
  id: string;
};

export class EntityIdValueObject extends ValueObject<EntityIdValueObjectProps> {
  get id(): string {
    return this.props.id;
  }

  static create(props: EntityIdValueObjectProps): Result<EntityIdValueObject> {
    const nullOrUndefinedResult = Guard.againstNullOrUndefined(props.id, 'id');

    if (!nullOrUndefinedResult.succeeded)
      return Result.Fail(new AppError.ValidationError(nullOrUndefinedResult.message));
    if (!ObjectId.isValid(props.id)) return Result.Fail(new AppError.ValidationError('Invalid mongo id'));

    return Result.Ok(new EntityIdValueObject(props));
  }
}
