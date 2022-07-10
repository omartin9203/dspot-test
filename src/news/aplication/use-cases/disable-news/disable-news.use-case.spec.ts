import {IUnitOfWork, IUnitOfWorkFactory} from "../../../../shared/core/domain/interfaces/IUnitOfWork";
import {Result} from "../../../../shared/core/domain/Result";
import {INewsRepository} from "../../../domain/interfeces/INewsRepository";
import {INewsRepositoryFactory} from "../../../domain/interfeces/INewsRepositoryFactory";
import {AppError} from "../../../../shared/core/domain/errors/AppError";
import {UniqueEntityID} from "../../../../shared/core/domain/UniqueEntityID";
import {NewsErrors} from "../../../domain/errors/news.errors";
import {generateMockTypeFactory, MockType} from "../../../../shared/core/mocks/MockType";
import {Test, TestingModule} from "@nestjs/testing";
import {keys} from "ts-transformer-keys";
import Optional from "../../../../shared/core/domain/Option";
import {News} from "../../../domain/entities/news.entity";
import {DisableNewsUseCase} from "./disable-news.use-case";

describe('Testing Disable News Use Case', () => {
  let useCase: DisableNewsUseCase;
  let newsRepoFactMock: MockType<INewsRepositoryFactory>;
  let unitOfWorkFactMock: MockType<IUnitOfWorkFactory>;
  let newsRepoMock: MockType<INewsRepository>;
  let unitOfWorkMock: MockType<IUnitOfWork>;
  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        DisableNewsUseCase,
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
      ],
    }).compile();
    useCase = testModule.get(DisableNewsUseCase);
    newsRepoFactMock = testModule.get('INewsRepositoryFactory');
    unitOfWorkFactMock = testModule.get('IUnitOfWorkFactory');
    unitOfWorkMock = generateMockTypeFactory<IUnitOfWork>(
      keys<IUnitOfWork>(),
    )();
    newsRepoMock = generateMockTypeFactory<INewsRepository>(
      keys<INewsRepository>(),
    )();
    unitOfWorkFactMock.build.mockReturnValue(unitOfWorkMock);
    newsRepoFactMock.build.mockReturnValue(newsRepoMock);

    unitOfWorkMock.getRepository.mockReturnValue(newsRepoMock);
    unitOfWorkMock.start.mockImplementation(() => 'do something!');
    unitOfWorkMock.commit.mockImplementation(work => work());
  });

  it('Valid Case', async  () => {
    const entity = News.create({
      createdAtTS: undefined,
      externalId: 'id',
      storyUrl: 'story url',
      storyTitle: 'story title',
      createdAt: new Date(),
      active: true,
      title: 'title',
      author: 'author',
      url: 'url'
    }, new UniqueEntityID()).unwrap();
    newsRepoMock.findById.mockReturnValue(Optional(entity));
    newsRepoMock.save.mockImplementation(() => Result.Ok());
    const resp = await useCase.execute({newsId: '1'});
    expect(resp.isSuccess).toBeTruthy();
  });
  it('Error: NewsErrors NewsByCodeDoesNotExist', async  () => {
    newsRepoMock.findById.mockReturnValue(Optional(null));
    const resp = await useCase.execute({newsId: '1'});
    expect(resp.isFailure).toBeTruthy();
    expect(resp.unwrapError() instanceof NewsErrors.NewsByCodeDoesNotExist).toBeTruthy();
  });
  it('Error: NewsErrors NewsIsAlreadyUnavailable', async  () => {
    const entity = News.create({
      createdAtTS: undefined,
      externalId: 'id',
      storyUrl: 'story url',
      storyTitle: 'story title',
      createdAt: new Date(),
      active: false,
      title: 'title',
      author: 'author',
      url: 'url'
    }, new UniqueEntityID()).unwrap();
    newsRepoMock.findById.mockReturnValue(Optional(entity));
    const resp = await useCase.execute({newsId: '1'});
    expect(resp.isFailure).toBeTruthy();
    expect(resp.unwrapError() instanceof NewsErrors.NewsIsAlreadyUnavailable).toBeTruthy();
  });
  it('Error: AppError.UnexpectedError', async  () => {
    const entity = News.create({
      createdAtTS: undefined,
      externalId: 'id',
      storyUrl: 'story url',
      storyTitle: 'story title',
      createdAt: new Date(),
      active: true,
      title: 'title',
      author: 'author',
      url: 'url'
    }, new UniqueEntityID()).unwrap();
    newsRepoMock.findById.mockReturnValue(Optional(entity));
    newsRepoMock.save.mockImplementation(() => { throw new Error('Test Error'); });

    const resp = await useCase.execute({newsId: '1'});
    expect(resp.isFailure).toBeTruthy();
    expect(resp.unwrapError() instanceof AppError.UnexpectedError).toBeTruthy();
  });
})
