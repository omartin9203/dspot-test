import { IncludesTypeProfile } from '../../domain/interfeces/IProfileRepository';

export type FindOneByIdProfileDto = {
  id: string;
  includes?: IncludesTypeProfile[];
};
