import { PersistentEntity } from '../../../shared/modules/data-access/mongoose/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MSchema } from 'mongoose';

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
  @Prop({ type: [MSchema.Types.ObjectId], default: [] })
  friendsIds: string[];

  friends?: ProfileEntity[];
}

export const ProfileSchema = SchemaFactory.createForClass(ProfileEntity);

ProfileSchema.virtual('friends', {
  ref: ProfileEntity.name,
  localField: 'friendsIds',
  foreignField: '_id',
});

export const ProfileFeature = {
  name: ProfileEntity.name,
  schema: ProfileSchema,
};
