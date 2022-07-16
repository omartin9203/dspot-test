import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '../../../../shared/core/application/BaseUseCase';
import { Result } from '../../../../shared/core/domain/Result';
import { IProfileRepository } from '../../../domain/interfeces/IProfileRepository';
import { AppError } from '../../../../shared/core/domain/errors/AppError';
import { EventPublisher } from '@nestjs/cqrs';
import { Profile } from '../../../domain/entities/profile.entity';
import { IProfileRepositoryFactory } from '../../../domain/interfeces/IProfileRepositoryFactory';
import { IUnitOfWork, IUnitOfWorkFactory } from '../../../../shared/core/domain/interfaces/IUnitOfWork';
import { GenerateProfilesDto } from '../../dto/generate-profiles.dto';

type UseCaseOkResp = {
  generationCode: string;
  relationshipsGenerated: number;
};

export type GenerateProfilesUseCaseResp = Result<UseCaseOkResp>;

@Injectable()
export class GenerateProfilesUseCase extends BaseUseCase<GenerateProfilesDto, GenerateProfilesUseCaseResp> {
  constructor(
    @Inject('IProfileRepositoryFactory')
    private readonly _factory: IProfileRepositoryFactory,
    @Inject('IUnitOfWorkFactory')
    private readonly _unitOfWorkFact: IUnitOfWorkFactory,
    private readonly _publisher: EventPublisher
  ) {
    super();
  }
  async execute({ profilesTotal, friendsTotal }: GenerateProfilesDto): Promise<GenerateProfilesUseCaseResp> {
    this._logger.log('Executing...');
    try {
      const unitOfWork: IUnitOfWork = this._unitOfWorkFact.build();
      await unitOfWork.start();
      const repository: IProfileRepository = unitOfWork.getRepository(this._factory);

      const { items: profiles, generationCode } = this.generateProfiles(profilesTotal);
      const { relationshipsGenerated } = this.generateFriendRelationships(profiles, friendsTotal);

      const okOrErr = await unitOfWork.commit(() => this.work(profiles, repository));
      if (okOrErr.isFailure) return Result.Fail(okOrErr.unwrapError());
      return Result.Ok({
        generationCode,
        relationshipsGenerated,
      });
    } catch (err) {
      return Result.Fail(new AppError.UnexpectedError(err));
    }
  }

  private async work(items: Profile[], repository: IProfileRepository): Promise<Result<void>> {
    await repository.saveMany(items);
    items.forEach(item => {
      this._publisher.mergeObjectContext(item);
      item.commit();
    });
    return Result.Ok();
  }

  private generateProfiles(profilesTotal: number) {
    const items = new Array<Profile>();
    const generationCode = new Date().getTime().toString();
    while (items.length < profilesTotal) {
      const generationNumber = items.length + 1;
      items.push(
        Profile.new({
          generationCode,
          generationNumber,
          first_name: `first_name ${generationNumber}`,
          last_name: `last_name ${generationNumber}`,
          img: `img ${generationNumber}`,
          zipcode: `zipcode ${generationNumber}`,
          state: `state ${generationNumber}`,
          address: `address ${generationNumber}`,
          city: `city ${generationNumber}`,
          phone: `phone ${generationNumber}`,
          available: true,
        }).unwrap()
      );
    }
    return {
      items,
      generationCode,
    };
  }

  private generateFriendRelationships(items: Profile[], friendsTotal: number) {
    let relationshipsGenerated = 0;
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    while (relationshipsGenerated < friendsTotal) {
      let availables = items.filter(x => Array.from(x.friends.keys()).length < items.length - 1);
      if (!availables.length) break;
      const item = availables[random(0, availables.length - 1)];
      const unavailables = [item.id, ...item.friends.keys()];
      availables = availables.filter(x => !unavailables.includes(x.id.toString()));
      const friend = availables[random(0, availables.length - 1)];
      item.addFriend(friend);
      relationshipsGenerated++;
    }
    return {
      relationshipsGenerated,
      items,
    };
  }
}
