import { IncludesTypeProfile, OrderByProfile, WhereProfile } from '../../domain/interfeces/IProfileRepository';

export type FindOneProfileDto = {
  where?: WhereProfile;
  order?: OrderByProfile;
  includes?: IncludesTypeProfile[];
};
