/* eslint-disable @typescript-eslint/no-empty-function */
import { MockType } from './MockType';
import { IUnitOfWork, IUnitOfWorkFactory } from '../domain/interfaces/IUnitOfWork';

export const unitOfWorkMockFactory: () => MockType<IUnitOfWork> = jest.fn(
  () => ({
    start: jest.fn(() => {}),
    commit: jest.fn(() => {}),
    getRepository: jest.fn(() => {}),
  }),
);

export const unitOfWorkFactoryMockFactory: () => MockType<
  IUnitOfWorkFactory
> = jest.fn(() => ({
  build: jest.fn(() => {
    return unitOfWorkMockFactory();
  }),
}));
