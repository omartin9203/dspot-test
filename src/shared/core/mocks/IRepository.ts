/* eslint-disable @typescript-eslint/no-empty-function */
import { IRepository, IRepositoryFactory } from '../domain/interfaces/IRepository';
import { MockType } from './MockType';

export const repositoryMockFactory: <E, F, I extends string>() => MockType<IRepository<E, F, I>> = jest.fn(
  () => ({
    save: jest.fn(() => {}),
    drop: jest.fn(() => {}),
    exist: jest.fn((_: unknown) => {}),
    findById: jest.fn((..._: unknown[]) => {}),
    findOne: jest.fn((..._: unknown[]) => {}),
    saveMany: jest.fn((..._: unknown[]) => {}),
    getAllPaginated: jest.fn((..._: unknown[]) => {}),
    getAllIterable: jest.fn((..._: unknown[]) => {}),
  }),
);

export const repositoryFactoryMockFactory: <E, F, I extends string>() => MockType<
  IRepositoryFactory<E, F, I, IRepository<E, F, I>>
> = jest.fn(() => ({
  build: jest.fn(() => {
    return repositoryMockFactory();
  }),
}));
