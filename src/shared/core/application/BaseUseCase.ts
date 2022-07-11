import { IUseCase } from '../domain/interfaces/IUseCase';
import { Logger } from '@nestjs/common';

export abstract class BaseUseCase<T, U> implements IUseCase<T, U> {
  protected _logger: Logger;
  constructor() {
    this._logger = new Logger(this.constructor.name);
  }

  abstract execute(request: T): U | Promise<U>;
}
