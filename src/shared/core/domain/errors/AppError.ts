import { Result } from '../Result';
import { BaseError } from '../BaseError';
import * as en from './internationalization/en.json';
import * as es from './internationalization/es.json';

/**
 * @desc General application errors (few of these as possible)
 * @http 500
 */
export namespace AppError {
  const _context = 'AppError';
  const messagesProvider = {
    en, es,
  }
  export class UnexpectedError extends BaseError {
    public constructor(readonly error?: Error) {
      super({
        name: 'UnexpectedError',
        context: _context,
        internationalization: {
          variables: {error: error?.message},
          messagesProvider,
        }
      });
    }
  }

  export type UnexpectedErrorResult<T> = Result<T, UnexpectedError>;

  export class TransactionalError extends BaseError {
    private readonly _brand?: TransactionalError;
    public constructor() {
      super({
        name: 'TransactionalError',
        context: _context,
        internationalization: {
          variables: {},
          messagesProvider,
        }
      });
    }
  }

  export type TransactionalErrorResult<T> = Result<T, ValidationError>;

  export class ValidationError extends BaseError {
    private readonly _brand?: ValidationError;
    public constructor(message: string) {
      super({
        name: 'ValidationError',
        message,
        context: _context,
        internationalization: {
          variables: {},
          messagesProvider,
        }
      });
    }
  }

  export type ValidationErrorResult<T> = Result<T, ValidationError>;

  export class ValidationErrorGreaterThan extends BaseError {
    public constructor(argumentPath: string, minValue: string) {
      super({
        name: 'ValidationErrorGreaterThan',
        context: _context,
        internationalization: {
          variables: {argumentPath, minValue},
          messagesProvider,
        }
      });
    }
  }

  export type ValidationErrorGreaterThanResult<T> = Result<T, ValidationErrorGreaterThan>;

  export class ValidationErrorAgainstNullOrUndefined extends BaseError {
    public constructor(argumentPath: string) {
      super({
        name: 'ValidationErrorAgainstNullOrUndefined',
        context: _context,
        internationalization: {
          variables: {argumentPath},
          messagesProvider,
        }
      });
    }
  }

  export type ValidationErrorAgainstNullOrUndefinedResult<T> = Result<T, ValidationErrorAgainstNullOrUndefined>;

  export class ValidationErrorAgainstAtLeast extends BaseError {
    public constructor(argumentPath: string, numChars: string) {
      super({
        name: 'ValidationErrorAgainstAtLeast',
        context: _context,
        internationalization: {
          variables: {argumentPath, numChars},
          messagesProvider,
        }
      });
    }
  }

  export type ValidationErrorAgainstAtLeastResult<T> = Result<T, ValidationErrorAgainstAtLeast>;


}
