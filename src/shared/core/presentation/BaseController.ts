import { Response } from 'express';
import { IResultError } from '../domain/interfaces/IResultError';
import { HttpStatus, Logger } from '@nestjs/common';

export class BaseController {
  protected _logger: Logger;
  constructor() {
    this._logger = new Logger(this.constructor.name);
  }

  public ok<T>(res: Response, dto?: T): Response {
    return !!dto ? res.status(HttpStatus.OK).json(dto) : res.status(HttpStatus.OK).send('OK');
  }

  public fail(res: Response, error: IResultError, lang?: string): Response {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: error.name,
      message: error.translatedMessage(lang),
    });
  }

  public notFound(res: Response): Response {
    return res.status(HttpStatus.NOT_FOUND).send('NOT FOUND');
  }

  public created<T>(res: Response, dto?: T): Response {
    return !!dto ? res.status(HttpStatus.CREATED).json(dto) : res.status(HttpStatus.CREATED).send('CREATED');
  }

  protected fixQuery<T>(query: Record<string, string>): T {
    const result = {};
    Object.keys(query).forEach(key => (result[key] = JSON.parse(query[key])));
    return result as T;
  }
}
