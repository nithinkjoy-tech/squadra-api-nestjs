import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserState } from '../dto/create-user.dto';

@Schema({
  timestamps: true,
})
export class User {
  @IsNotEmpty()
  @IsString()
  @Prop()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Prop()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Prop()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Prop()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Prop()
  companyName: string;

  @Prop()
  userState: UserState;
}

export const UserSchema = SchemaFactory.createForClass(User);
