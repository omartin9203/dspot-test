import { CreateProfileProps } from '../../domain/entities/profile.entity';

export type UpdateProfileInputDto = {
  id: string;
  update: UpdateProfileDto;
};

export type UpdateProfileDto = Partial<CreateProfileProps>;
