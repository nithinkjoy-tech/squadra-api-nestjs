import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserState } from '../dto/create-user.dto';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, minlength: 1, match: /^[A-Za-z]+$/ })
  readonly firstName: string;

  @Prop({ required: true })
  readonly lastName: string;

  @Prop({ required: true })
  readonly email: string;

  @Prop({ required: true })
  readonly phoneNumber: string;

  @Prop({ required: true })
  readonly companyName: string;

  @Prop({ enum: UserState, default: UserState.ACTIVE })
  readonly userState: UserState;
}

export const UserSchema = SchemaFactory.createForClass(User);
