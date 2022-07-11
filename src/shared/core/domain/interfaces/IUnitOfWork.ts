import { IRepository, IRepositoryFactory } from './IRepository';

export interface IUnitOfWork {
  /**
   * Start a transaction. When a transaction is started,
   * writing to the repository from outside the transaction
   * is blocked until it is finished.
   *
   * @returns  {(Promise<void> | void)}
   * @memberof IUnitOfWork
   */
  start(): Promise<void> | void;
  /**
   *
   * Execute the passed function and free the transaction.
   *
   * @template T
   * @param {(() => Promise<T> | T)} work
   * @returns  {(Promise<T> | T)}
   * @memberof IUnitOfWork
   */
  commit<T>(work: () => Promise<T> | T): Promise<T> | T;
  /**
   * Return a repository with the UnitOfWork transaction context.
   *
   * @template E
   * @template T
   * @param {IRepositoryFactory<E, T>} F
   * @returns  {T}
   * @memberof IUnitOfWork
   */
  getRepository<E, F, I extends string, T extends IRepository<E, F, I>>(F: IRepositoryFactory<E, F, I, T>): T;
}

export interface IUnitOfWorkFactory {
  build(): IUnitOfWork;
}
