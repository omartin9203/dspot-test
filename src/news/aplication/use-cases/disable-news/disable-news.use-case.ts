import {DisableNewsUseCaseDto} from "../../dto/disable-news-use-case.dto";
import {Inject, Injectable} from "@nestjs/common";
import {IUnitOfWork, IUnitOfWorkFactory} from "../../../../shared/core/domain/interfaces/IUnitOfWork";
import {BaseUseCase} from "../../../../shared/core/application/BaseUseCase";
import {Result} from "../../../../shared/core/domain/Result";
import {INewsRepository} from "../../../domain/interfeces/INewsRepository";
import {INewsRepositoryFactory} from "../../../domain/interfeces/INewsRepositoryFactory";
import {AppError} from "../../../../shared/core/domain/errors/AppError";
import {UniqueEntityID} from "../../../../shared/core/domain/UniqueEntityID";
import {NewsErrors} from "../../../domain/errors/news.errors";

@Injectable()
export class DisableNewsUseCase
  extends 
    BaseUseCase<DisableNewsUseCaseDto, Result<void>> {
  constructor(
    @Inject('INewsRepositoryFactory')
    private readonly _newsRepositoryFactory: INewsRepositoryFactory,
    @Inject('IUnitOfWorkFactory')
    private readonly _unitOfWorkFact: IUnitOfWorkFactory,
  ) { 
    super();
  }
  async execute(
    request: DisableNewsUseCaseDto,
  ): Promise<Result<void>> {
    this._logger.log('Executing...');
    try {
      const unitOfWork: IUnitOfWork = this._unitOfWorkFact.build();
      await unitOfWork.start();
      const repository: INewsRepository = unitOfWork.getRepository(
        this._newsRepositoryFactory,
      );
      return await unitOfWork.commit(() => this.work(request, repository));
    } catch (err) {
      return Result.Fail(new AppError.UnexpectedError(err));
    }
  }

  async work(
    request: DisableNewsUseCaseDto,
    repository: INewsRepository,
  ): Promise<Result<void>> {
    const entityId = new UniqueEntityID(request.newsId);
    const entityOrNone = await repository.findById(entityId);
    if(entityOrNone.isNone()) {
      return Result.Fail(
        new NewsErrors.NewsByCodeDoesNotExist(request.newsId),
      );
    }
    const entity = entityOrNone.unwrap();
    const result = entity.toDisable();
    if(result.isFailure) return Result.Fail(result.unwrapError());
    await repository.save(entity);
    return Result.Ok();
  }
}
