import { BaseError } from '../../../shared/core/domain/BaseError';
import { Result } from '../../../shared/core/domain/Result';
import en from './internationalization/en';
import es from './internationalization/es';
import { ProfileErrorCode } from './internationalization';

export namespace ProfileErrors {
  const _context = 'ProfileErrors';
  const messagesProvider = {
    en,
    es,
  };

  export class ProfileIsAlreadyUnavailable extends BaseError {
    constructor(readonly code: string) {
      super({
        name: ProfileErrorCode.IsAlreadyUnavailable,
        context: _context,
        internationalization: {
          variables: { code },
          messagesProvider,
        },
      });
    }
  }

  export type ProfileIsAlreadyUnavailableResult<T> = Result<T, ProfileIsAlreadyUnavailable>;

  export class ProfileIsAlreadyAvailable extends BaseError {
    constructor(code: string) {
      super({
        name: ProfileErrorCode.IsAlreadyAvailable,
        context: _context,
        internationalization: {
          variables: { code },
          messagesProvider,
        },
      });
    }
  }

  export type ProfileIsAlreadyAvailableResult<T> = Result<T, ProfileIsAlreadyAvailable>;

  export class ProfileIsInactive extends BaseError {
    constructor(readonly code: string) {
      super({
        name: ProfileErrorCode.IsInactive,
        context: _context,
        internationalization: {
          variables: { code },
          messagesProvider,
        },
      });
    }
  }

  export type ProfileIsInactiveResult<T> = Result<T, ProfileIsInactive>;

  export class ProfileByCodeDoesNotExist extends BaseError {
    constructor(readonly code: string) {
      super({
        name: ProfileErrorCode.ByCodeDoesNotExist,
        context: _context,
        internationalization: {
          variables: { code },
          messagesProvider,
        },
      });
    }
  }

  export type ProfileByCodeDoesNotExistResult<T> = Result<T, ProfileByCodeDoesNotExist>;

  export class ProfileByCodeAlreadyExist extends BaseError {
    constructor(readonly code: string) {
      super({
        name: ProfileErrorCode.ByCodeAlreadyExist,
        context: _context,
        internationalization: {
          variables: { code },
          messagesProvider,
        },
      });
    }
  }

  export type ProfileByCodeAlreadyExistResult<T> = Result<T, ProfileByCodeAlreadyExist>;
}
