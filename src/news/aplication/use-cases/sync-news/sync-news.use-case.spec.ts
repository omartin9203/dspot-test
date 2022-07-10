import {BaseUseCase} from "../../../../shared/core/application/BaseUseCase";
import {Result} from "../../../../shared/core/domain/Result";
import {Inject, Injectable} from "@nestjs/common";
import {IHnNewsClient} from "../../../domain/interfeces/IHnNewsClient";
import {INewsRepositoryFactory} from "../../../domain/interfeces/INewsRepositoryFactory";
import {IUnitOfWork, IUnitOfWorkFactory} from "../../../../shared/core/domain/interfaces/IUnitOfWork";
import {AppError} from "../../../../shared/core/domain/errors/AppError";
import {INewsRepository, WhereNews} from "../../../domain/interfeces/INewsRepository";
import {News} from "../../../domain/entities/news.entity";
import {DisableNewsUseCase} from "../disable-news/disable-news.use-case";
import {generateMockTypeFactory, MockType} from "../../../../shared/core/mocks/MockType";
import {Test, TestingModule} from "@nestjs/testing";
import {keys} from "ts-transformer-keys";
import {UniqueEntityID} from "../../../../shared/core/domain/UniqueEntityID";
import Optional from "../../../../shared/core/domain/Option";
import {HnNewsValueObject} from "../../../domain/value-objects/hn-news.value-object";
import {SyncNewsUseCase} from "./sync-news.use-case";

describe('Testing Sync News Use Case', () => {
  let useCase: SyncNewsUseCase;
  let newsRepoFactMock: MockType<INewsRepositoryFactory>;
  let unitOfWorkFactMock: MockType<IUnitOfWorkFactory>;
  let newsRepoMock: MockType<INewsRepository>;
  let hnNewsClientRepoMock: MockType<IHnNewsClient>;
  let unitOfWorkMock: MockType<IUnitOfWork>;
  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        SyncNewsUseCase,
        {
          provide: 'IUnitOfWorkFactory',
          useFactory: generateMockTypeFactory<IUnitOfWorkFactory>(
            keys<IUnitOfWorkFactory>())
        },
        {
          provide: 'INewsRepositoryFactory',
          useFactory: generateMockTypeFactory<INewsRepositoryFactory>(
            keys<INewsRepositoryFactory>(),
          )
        },
        {
          provide: 'INewsRepository',
          useFactory: generateMockTypeFactory<INewsRepository>(
            keys<INewsRepository>(),
          )
        },
        {
          provide: 'IHnNewsClient',
          useFactory: generateMockTypeFactory<IHnNewsClient>(
            keys<IHnNewsClient>(),
          )
        },
      ],
    }).compile();
    useCase = testModule.get(SyncNewsUseCase);
    unitOfWorkFactMock = testModule.get('IUnitOfWorkFactory');
    newsRepoFactMock = testModule.get('INewsRepositoryFactory');
    newsRepoMock = testModule.get('INewsRepository');
    hnNewsClientRepoMock = testModule.get('IHnNewsClient');

    unitOfWorkMock = generateMockTypeFactory<IUnitOfWork>(
      keys<IUnitOfWork>(),
    )();
    unitOfWorkFactMock.build.mockReturnValue(unitOfWorkMock);
    newsRepoFactMock.build.mockReturnValue(newsRepoMock);

    unitOfWorkMock.getRepository.mockReturnValue(newsRepoMock);
    unitOfWorkMock.start.mockImplementation(() => 'do something!');
    unitOfWorkMock.commit.mockImplementation(work => work());
  });

  it('Valid Case', async () => {
    const hnews = HnNewsValueObject.create({
      created_at: 'string',
      title: 'title',
      url: 'url',
      author: 'author',
      story_title: 'store-title',
      story_url: 'store-url',
      created_at_i: 123,
      objectID: '123',
    });
    const hnewsUnespectedErr = HnNewsValueObject.create({
    } as any);
    const hnewsValidationErr = HnNewsValueObject.create({
      created_at: 'string',
      title: '',
      url: 'url',
      author: 'author',
      story_title: '',
      story_url: 'store-url',
      created_at_i: 0,
      objectID: 'id',
    });
    const hnewsExist = HnNewsValueObject.create({
      created_at: 'string',
      title: 'title',
      url: 'url',
      author: 'author',
      story_title: 'store-title',
      story_url: 'store-url',
      created_at_i: 124,
      objectID: '124',
    });
    hnNewsClientRepoMock.newsIterable.mockReturnValue([hnews, hnewsUnespectedErr, hnewsValidationErr,hnewsExist]);
    newsRepoMock.exist.mockImplementation((where: any[]) => where[0]?.externalId?.is == '124');
    newsRepoMock.save.mockImplementation(() => Result.Ok());
    const resp = await useCase.execute();
    expect(resp.isSuccess).toBeTruthy();
  });

  it('Error: UnexpectedError fetch client', async () => {
    hnNewsClientRepoMock.newsIterable.mockReturnValue([Result.Fail(new AppError.UnexpectedError())]);
    const resp = await useCase.execute();
    expect(resp.isFailure).toBeTruthy();
    expect(resp.unwrapError() instanceof AppError.UnexpectedError).toBeTruthy();
  });

  it('Error: UnexpectedError at save', async () => {
    const hnews = HnNewsValueObject.create({
      created_at: 'string',
      title: 'title',
      url: 'url',
      author: 'author',
      story_title: 'store-title',
      story_url: 'store-url',
      created_at_i: 123,
      objectID: '123',
    });
    hnNewsClientRepoMock.newsIterable.mockReturnValue([hnews]);
    newsRepoMock.exist.mockReturnValue(false);
    newsRepoMock.save.mockImplementation(() => { throw new Error('Test Error'); });
    const resp = await useCase.execute();
    expect(resp.isFailure).toBeTruthy();
    expect(resp.unwrapError() instanceof AppError.UnexpectedError).toBeTruthy();
  });


})