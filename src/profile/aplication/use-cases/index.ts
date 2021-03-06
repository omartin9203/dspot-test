import { PaginatedFindProfileUseCase } from './paginated-find-profile/paginated-find-profile.use-case';
import { CreateProfileUseCase } from './create-profile/create-profile.use-case';
import { UpdateProfileUseCase } from './update-profile/update-profile.use-case';
import { DeleteProfileUseCase } from './delete-profile/delete-profile.use-case';
import { FindOneProfileUseCase } from './find-one-profile/find-one-profile.use-case';
import { FindOneByIdProfileUseCase } from './find-one-by-id-profile/find-one-by-id-profile.use-case';
import { GenerateProfilesUseCase } from './generate-profiles/generate-profiles.use-case';
import { ShorterConnectionUseCase } from './shorter-connection/shorter-connection.use-case';

export const ProfileUseCases = [
  PaginatedFindProfileUseCase,
  FindOneProfileUseCase,
  FindOneByIdProfileUseCase,
  CreateProfileUseCase,
  UpdateProfileUseCase,
  DeleteProfileUseCase,
  GenerateProfilesUseCase,
  ShorterConnectionUseCase,
];
