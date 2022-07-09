import { IResultError } from './interfaces/IResultError';
import Optional from './Option';

type BaseErrorProps = {
  name: string;
  message?: string;
  context?: string;
  internationalization: InternationalizationType;
};

type InternationalizationType = {
  variables: {
    [key: string]: string;
  };
  messagesProvider: unknown;
}

export abstract class BaseError extends Error implements IResultError {
  readonly internationalization: InternationalizationType;

  constructor({ name, message, context, internationalization }: BaseErrorProps) {
    super(BaseError.translateErrorMessage(name, internationalization, message));
    Object.defineProperty(this, 'name', { value: name });
    this.internationalization = internationalization;
  }

  throw(): void {
    throw this;
  }

  pretty(): string {
    return `[${this.name}]: ${this.message}`;
  }

  translatedMessage(lan?: string): string {
    return BaseError.translateErrorMessage(this.name, this.internationalization, this.message, lan)
  };

  protected static translateErrorMessage(code: string, internationalization: InternationalizationType, message?: string, lan?: string): string {
    lan = !lan || !Object.keys(internationalization.messagesProvider).includes(lan)
      ? 'en' : lan;
    message = internationalization.messagesProvider[lan][code]
      ?? message ?? `Does not exist message provider for ErrorCode: [${code}] and Language: [${lan}]`;
    if(!Object.keys(internationalization.messagesProvider[lan]).includes(code))
      return message;
    Object.keys(internationalization.variables)
      .filter(key => Optional(internationalization.variables[key]).isSome())
      .forEach(key => {
        message = message.replace(new RegExp(`%${key}%`, 'gi'), internationalization.variables[key])
      });
    return message;
  }
}
