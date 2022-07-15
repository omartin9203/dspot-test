import { FieldOptions } from '../../../shared/modules/data-access/types/IFieldOptions';
import { QualitativeFieldOptions } from '../../../shared/modules/data-access/types/IQualitativeFieldOptions';
import { WhereType } from '../../../shared/core/domain/types/base-where.type';
import { OrderByType } from '../../../shared/core/domain/types/base-orderBy.type';
import { IRepository } from '../../../shared/core/domain/interfaces/IRepository';
import { Profile } from '../entities/profile.entity';

export type ProfileFilterableFields = {
  first_name: QualitativeFieldOptions;
  last_name: QualitativeFieldOptions;
  phone: QualitativeFieldOptions;
  img: QualitativeFieldOptions;
  address: QualitativeFieldOptions;
  city: QualitativeFieldOptions;
  state: QualitativeFieldOptions;
  zipcode: QualitativeFieldOptions;
  available: FieldOptions<boolean>;
};

export type WhereProfile = WhereType<ProfileFilterableFields>;

export type OrderByProfile = OrderByType<ProfileFilterableFields>;

export type IncludesTypeProfile = 'friends';

export type IProfileRepository = IRepository<Profile, ProfileFilterableFields, IncludesTypeProfile>;
