import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '../../../../shared/core/application/BaseUseCase';
import { Result } from '../../../../shared/core/domain/Result';
import { IProfileRepository } from '../../../domain/interfeces/IProfileRepository';
import { AppError } from '../../../../shared/core/domain/errors/AppError';
import { Profile } from '../../../domain/entities/profile.entity';
import { ShorterConnectionDto } from '../../dto/shorter-connection.dto';
import { EntityIdValueObject } from '../../../../shared/core/domain/entity-id.value-object';
import { UniqueEntityID } from '../../../../shared/core/domain/UniqueEntityID';

type UseCaseOkResp = {
  deepCount: number;
  friends: Profile[];
};

export type ShorterConnectionUseCaseResp = Result<UseCaseOkResp>;

@Injectable()
export class ShorterConnectionUseCase extends BaseUseCase<ShorterConnectionDto, ShorterConnectionUseCaseResp> {
  constructor(
    @Inject('IProfileRepository')
    private readonly _repository: IProfileRepository
  ) {
    super();
  }
  async execute({ startId, endId }: ShorterConnectionDto): Promise<ShorterConnectionUseCaseResp> {
    this._logger.log('Executing...');
    const startIdOrErr = EntityIdValueObject.create({ id: startId });
    if (startIdOrErr.isFailure) return Result.Fail(startIdOrErr.unwrapError());
    const endIdOrErr = EntityIdValueObject.create({ id: endId });
    if (endIdOrErr.isFailure) return Result.Fail(endIdOrErr.unwrapError());
    try {
      return Result.Ok(await this.getShorterConnectionBFS(startId, endId));
    } catch (err) {
      return Result.Fail(new AppError.UnexpectedError(err));
    }
  }

  async getShorterConnectionBFS(startId: string, endId: string): Promise<UseCaseOkResp> {
    type QueueItem = {
      id: string;
      prev: Profile[];
    };
    const queue: QueueItem[] = [
      {
        id: startId,
        prev: [],
      },
    ];
    const processed: any = {};
    while (queue.length) {
      const current = queue.shift();
      processed[current.id] = true;
      if (current.id === endId)
        return {
          deepCount: current.prev.length,
          friends: current.prev,
        };
      const currentNodeOrNone = await this._repository.findById(new UniqueEntityID(current.id));
      if (currentNodeOrNone.isNone()) continue;
      const currentNode = currentNodeOrNone.unwrap();
      for (const friend of currentNode.friends.keys()) {
        if (!processed[friend])
          queue.push({
            id: friend,
            prev: currentNode.id.toString() == startId ? current.prev : [...current.prev, currentNode],
          });
      }
    }
    return {
      deepCount: -1,
      friends: [],
    };
  }
}
