import { PersistentEntity } from '../../../shared/modules/data-access/mongoose/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class ProfileEntity extends PersistentEntity {
  @Prop({ required: true })
  first_name: string;
  @Prop({ required: true })
  last_name: string;
  @Prop()
  phone?: string;
  @Prop()
  img?: string;
  @Prop()
  address?: string;
  @Prop()
  city?: string;
  @Prop()
  state?: string;
  @Prop()
  zipcode?: string;
  @Prop()
  available?: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(ProfileEntity);

export const ProfileFeature = {
  name: ProfileEntity.name,
  schema: ProfileSchema,
};
