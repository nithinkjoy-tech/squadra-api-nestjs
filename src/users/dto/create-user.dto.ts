import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsAlpha,
  Matches,
  IsEnum,
} from 'class-validator';

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
  @IsNotEmpty()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[6789]\d{9}$/)
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly companyName: string;

  @IsEnum(UserState)
  readonly userState: UserState;
}
