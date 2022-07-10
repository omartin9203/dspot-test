import { PersistentEntity } from '../../../shared/modules/data-access/mongoose/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class NewsEntity extends PersistentEntity {
  @Prop({ required: true })
  author: string;
  @Prop({ required: false })
  title: string | null;
  @Prop({ required: false })
  storyTitle: string | null;
  @Prop({ required: false })
  storyUrl: string | null;
  @Prop({ required: false })
  url: string | null;
  @Prop({ required: true })
  active: boolean;
  @Prop({ required: false })
  externalId?: string;
  @Prop({ required: false })
  createdAtTS?: number;
}

export const NewsSchema = SchemaFactory.createForClass(NewsEntity);

export const NewsFeature = {
  name: NewsEntity.name,
  schema: NewsSchema,
};
