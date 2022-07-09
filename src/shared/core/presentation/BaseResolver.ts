import { Logger } from '@nestjs/common';
import { IResultError } from '../domain/interfaces/IResultError';
import { ApolloError } from 'apollo-server-express';

export abstract class BaseResolver {
  protected _logger: Logger;
  constructor() {
    this._logger = new Logger(this.constructor.name);
  }

  protected handleErrors(resultError: IResultError, lang?: string): void {
    const error = new ApolloError(resultError.translatedMessage(lang), resultError.name);
    Object.defineProperty(error, 'name', { value: resultError.name });
    throw error;
  }
}
