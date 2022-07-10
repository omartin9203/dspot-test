import { BaseError } from '../../../shared/core/domain/BaseError';
import { Result } from '../../../shared/core/domain/Result';
import * as en from './internationalization/en.json';
import * as es from './internationalization/es.json';

export namespace NewsErrors {
  const _context = 'NewsErrors';
  const messagesProvider = {
    en, es,
  };

  export class NewsIsAlreadyUnavailable extends BaseError {
    constructor(readonly code: string) {
      super({
        name: 'NewsIsAlreadyUnavailable',
        context: _context,
        internationalization: {
          variables: {code},
          messagesProvider,
        }
      });
    }
  }

  export type NewsIsAlreadyUnavailableResult<T> = Result<
    T,
    NewsIsAlreadyUnavailable
    >;

  export class NewsIsAlreadyAvailable extends BaseError {
    constructor(code: string) {
      super({
        name: 'NewsIsAlreadyAvailable',
        context: _context,
        internationalization: {
          variables: {code},
          messagesProvider,
        }
      });
    }
  }

  export type NewsIsAlreadyAvailableResult<T> = Result<
    T,
    NewsIsAlreadyAvailable
    >;

  export class NewsIsInactive extends BaseError {
    constructor(readonly code: string) {
      super({
        name: 'NewsIsInactive',
        context: _context,
        internationalization: {
          variables: {code},
          messagesProvider,
        }
      });
    }
  }

  export type NewsIsInactiveResult<T> = Result<
    T,
    NewsIsInactive
    >;

  export class NewsByCodeDoesNotExist extends BaseError {
    constructor(readonly code: string) {
      super({
        name: 'NewsByCodeDoesNotExist',
        context: _context,
        internationalization: {
          variables: {code},
          messagesProvider,
        }
      });
    }
  }

  export type NewsByCodeDoesNotExistResult<T> = Result<
    T,
    NewsByCodeDoesNotExist
    >;

  export class NewsByCodeAlreadyExist extends BaseError {
    constructor(readonly code: string) {
      super({
        name: 'NewsByCodeAlreadyExist',
        context: _context,
        internationalization: {
          variables: {code},
          messagesProvider,
        }
      });
    }
  }

  export type NewsByCodeAlreadyExistResult<T> = Result<
    T,
    NewsByCodeAlreadyExist
    >;
}