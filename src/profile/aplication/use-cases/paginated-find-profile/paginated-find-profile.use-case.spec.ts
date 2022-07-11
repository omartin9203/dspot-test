import { IProfileRepository } from '../../../domain/interfeces/IProfileRepository';
import { PaginatedFindResult } from '../../../../shared/core/application/PaginatedFindResult';
import { Profile } from '../../../domain/entities/profile.entity';
import { generateMockTypeFactory, MockType } from '../../../../shared/core/mocks/MockType';
import { Test, TestingModule } from '@nestjs/testing';
import { keys } from 'ts-transformer-keys';
import { PaginatedFindProfileUseCase } from './paginated-find-profile.use-case';
import { AppError } from '../../../../shared/core/domain/errors/AppError';

describe('Testing Paginated Find Profile Use Case', () => {
  let useCase: PaginatedFindProfileUseCase;
  let profileRepoMock: MockType<IProfileRepository>;
  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        PaginatedFindProfileUseCase,
        {
          provide: 'IProfileRepository',
          useFactory: generateMockTypeFactory<IProfileRepository>(keys<IProfileRepository>()),
        },
      ],
    }).compile();
    useCase = testModule.get(PaginatedFindProfileUseCase);
    profileRepoMock = testModule.get('IProfileRepository');
  });

  it('Valid case 1', async () => {
    const entity = Profile.new({
      img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinys rgb&dpr=1&w=500',
      first_name: 'Steph',
      last_name: 'Walters',
      phone: '(820) 289-1818',
      address: '5190 Center Court Drive',
      city: 'Spring',
      state: 'TX',
      zipcode: '77370',
      available: true,
    }).unwrap();
    const paginatedFindProfile: PaginatedFindResult<Profile> = {
      limit: 1,
      totalPages: 1,
      currentPage: 1,
      items: [entity],
    };
    profileRepoMock.getAllPaginated.mockReturnValue(paginatedFindProfile);

    const resp = await useCase.execute({
      pageParams: { pageNum: 1, pageLimit: 1 },
      where: { first_name: { contains: 'ep' } },
    });

    expect(resp.isSuccess).toBeTruthy();
    expect(resp.unwrap().limit).toEqual(1);
    expect(resp.unwrap().currentPage).toEqual(1);
    expect(resp.unwrap().totalPages).toEqual(1);
    expect(resp.unwrap().items.length).toEqual(1);
  });
  it('Valid case 2', async () => {
    const entity = Profile.new({
      img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinys rgb&dpr=1&w=500',
      first_name: 'Steph',
      last_name: 'Walters',
      phone: '(820) 289-1818',
      address: '5190 Center Court Drive',
      city: 'Spring',
      state: 'TX',
      zipcode: '77370',
      available: true,
    }).unwrap();
    const paginatedFindProfile: PaginatedFindResult<Profile> = {
      limit: 1,
      totalPages: 1,
      currentPage: 1,
      items: [entity],
    };
    profileRepoMock.getAllPaginated.mockReturnValue(paginatedFindProfile);

    const resp = await useCase.execute({
      pageParams: { pageNum: 1, pageLimit: 1 },
      // where: { first_name: { contains: 'ep' } },
    });

    expect(resp.isSuccess).toBeTruthy();
    expect(resp.unwrap().limit).toEqual(1);
    expect(resp.unwrap().currentPage).toEqual(1);
    expect(resp.unwrap().totalPages).toEqual(1);
    expect(resp.unwrap().items.length).toEqual(1);
  });
  it('Error: Invalid pageNum', async () => {
    const resp = await useCase.execute({
      pageParams: { pageNum: -1, pageLimit: 1 },
      where: { first_name: { contains: 'ep' } },
    });

    expect(resp.isFailure).toBeTruthy();
    expect(resp.unwrapError() instanceof AppError.ValidationError).toBeTruthy();
  });

  it('Error: Invalid pageLimit', async () => {
    const resp = await useCase.execute({
      pageParams: { pageNum: 1, pageLimit: -25 },
      where: { first_name: { contains: 'ep' } },
    });

    expect(resp.isFailure).toBeTruthy();
    expect(resp.unwrapError() instanceof AppError.ValidationError).toBeTruthy();
  });
  it('Error: unexpected error', async () => {
    profileRepoMock.getAllPaginated.mockImplementation(() => {
      throw new Error('Test Error');
    });
    const resp = await useCase.execute({
      pageParams: { pageNum: 1, pageLimit: 1 },
      where: { first_name: { contains: 'ep' } },
    });

    expect(resp.isFailure).toBeTruthy();
    expect(resp.unwrapError() instanceof AppError.UnexpectedError).toBeTruthy();
  });
});
