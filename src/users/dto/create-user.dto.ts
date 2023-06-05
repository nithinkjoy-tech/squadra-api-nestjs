import { IsNotEmpty, IsString, MinLength, IsAlpha } from 'class-validator';

export enum UserState {
  ACTIVE = 'Active',
  IN_ACTIVE = 'Inactive',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @MinLength(1)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly companyName: string;

  readonly userState: UserState;
}
