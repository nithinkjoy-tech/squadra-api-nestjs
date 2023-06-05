import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserState } from '../dto/create-user.dto';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, minlength: 2, match: /^[A-Za-z]+$/ })
  readonly firstName: string;

  @Prop({ required: true, minlength: 1, match: /^[A-Za-z]+$/ })
  readonly lastName: string;

  @Prop({ required: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/ })
  readonly email: string;

  @Prop({ required: true, match: /^[6789]\d{9}$/ })
  readonly phoneNumber: string;

  @Prop({ required: true, minlength: 3 })
  readonly companyName: string;

  @Prop({ enum: UserState, default: UserState.ACTIVE })
  readonly userState: UserState;
}

export const UserSchema = SchemaFactory.createForClass(User);
