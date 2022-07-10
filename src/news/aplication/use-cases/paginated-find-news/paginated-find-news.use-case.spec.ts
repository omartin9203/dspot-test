import {INewsRepository} from "../../../domain/interfeces/INewsRepository";
import {PaginatedFindResult} from "../../../../shared/core/application/PaginatedFindResult";
import {News} from "../../../domain/entities/news.entity";
import {generateMockTypeFactory, MockType} from "../../../../shared/core/mocks/MockType";
import {Test, TestingModule} from "@nestjs/testing";
import {keys} from "ts-transformer-keys";
import {UniqueEntityID} from "../../../../shared/core/domain/UniqueEntityID";
import {PaginatedFindNewsUseCase} from "./paginated-find-news.use-case";
import {AppError} from "../../../../shared/core/domain/errors/AppError";


describe('Testing Paginated Find News Use Case', () => {
  let useCase: PaginatedFindNewsUseCase;
  let newsRepoMock: MockType<INewsRepository>;
  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        PaginatedFindNewsUseCase,
        {
          provide: 'INewsRepository',
          useFactory: generateMockTypeFactory<INewsRepository>(
            keys<INewsRepository>(),
          )
        },
      ],
    }).compile();
    useCase = testModule.get(PaginatedFindNewsUseCase);
    newsRepoMock = testModule.get('INewsRepository');
  });

  it('Valid case', async () => {
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
    const paginatedFindNews: PaginatedFindResult<News> = {
      limit: 1,
      totalPages: 1,
      currentPage: 1,
      items: [entity],
    };
    newsRepoMock.getAllPaginated.mockReturnValue(paginatedFindNews);

    const resp = await useCase.execute({
      pageParams: { pageNum: 1, pageLimit: 1 },
      where: { author:{contains: '1' }},
    });

    expect(resp.isSuccess).toBeTruthy();
    expect((resp.unwrap()).limit).toEqual(1);
    expect(
      (resp.unwrap()).currentPage,
    ).toEqual(1);
    expect(
      (resp.unwrap()).totalPages,
    ).toEqual(1);
    expect(
      (resp.unwrap()).items.length,
    ).toEqual(1);
  });
  it('Error: Invalid pageNum', async () => {
    const resp = await useCase.execute({
      pageParams: { pageNum: -1, pageLimit: 1 },
      where: { author:{contains: '1' }},
    });

    expect(resp.isFailure).toBeTruthy();
    expect(
      resp.unwrapError() instanceof AppError.ValidationError,
    ).toBeTruthy();
  });

  it('Error: Invalid pageLimit', async () => {
    const resp = await useCase.execute({
      pageParams: { pageNum: 1, pageLimit: -25 },
      where: { author:{contains: '1' }},
    });

    expect(resp.isFailure).toBeTruthy();
    expect(
      resp.unwrapError() instanceof AppError.ValidationError,
    ).toBeTruthy();
  });
  it('Error: unexpected error', async () => {
    newsRepoMock.getAllPaginated.mockImplementation(() => {
      throw new Error('Test Error');
    });
    const resp = await useCase.execute({
      pageParams: { pageNum: 1, pageLimit: 1 },
      where: { author:{contains: '1' }},
    });

    expect(resp.isFailure).toBeTruthy();
    expect(
      resp.unwrapError() instanceof AppError.UnexpectedError,
    ).toBeTruthy();
  });
})
