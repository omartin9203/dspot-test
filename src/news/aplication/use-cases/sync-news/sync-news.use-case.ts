import {BaseUseCase} from "../../../../shared/core/application/BaseUseCase";
import {Result} from "../../../../shared/core/domain/Result";
import {Inject, Injectable} from "@nestjs/common";
import {IHnNewsClient} from "../../../domain/interfeces/IHnNewsClient";
import {INewsRepositoryFactory} from "../../../domain/interfeces/INewsRepositoryFactory";
import {IUnitOfWork, IUnitOfWorkFactory} from "../../../../shared/core/domain/interfaces/IUnitOfWork";
import {AppError} from "../../../../shared/core/domain/errors/AppError";
import {INewsRepository, WhereNews} from "../../../domain/interfeces/INewsRepository";
import {News} from "../../../domain/entities/news.entity";

@Injectable()
export class SyncNewsUseCase extends BaseUseCase<null, Result<void>> {
  constructor(
    @Inject('IHnNewsClient')
    readonly hnNewsClient: IHnNewsClient,
    @Inject('INewsRepository')
    private readonly _newsRepository: INewsRepository,
    @Inject('INewsRepositoryFactory')
    private readonly _newsRepositoryFactory: INewsRepositoryFactory,
    @Inject('IUnitOfWorkFactory')
    private readonly _unitOfWorkFact: IUnitOfWorkFactory,
  ) {
    super();
  }
  async execute(): Promise<Result<void>> {
    this._logger.log('Executing...');
    const iterator = this.hnNewsClient.newsIterable();
    for await (const item of iterator) {
      if(item.isFailure){
        this._logger.debug(item.unwrapError().pretty());
        if(item.unwrapError() instanceof AppError.ValidationError)
          continue;
        return Result.Fail(item.unwrapError());
      }
      const hnNews = item.unwrap();
      const where: WhereNews = [];
      if(hnNews.externalId) where.push({externalId: {is: hnNews.externalId}});
      if(hnNews.createdAtTS) where.push({createdAtTS: {is: hnNews.createdAtTS}});
      const exist = await this._newsRepository.exist(where);
      if(exist) break;
      const entityOrError = News.new(hnNews.getNewsProps());
      if(entityOrError.isFailure) {
        this._logger.debug(entityOrError.unwrapError().pretty());
        continue;
      }
      try {
        const unitOfWork: IUnitOfWork = this._unitOfWorkFact.build();
        await unitOfWork.start();
        const repository: INewsRepository = unitOfWork.getRepository(
          this._newsRepositoryFactory,
        );
        await unitOfWork.commit(() => repository.save(entityOrError.unwrap()));
      } catch (err) {
        return Result.Fail(new AppError.UnexpectedError(err));
      }
    }
    return Result.Ok();
  }
}