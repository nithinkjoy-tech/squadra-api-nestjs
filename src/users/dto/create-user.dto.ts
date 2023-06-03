export enum UserState {
  ACTIVE = 'Active',
  IN_ACTIVE = 'Inactive',
}

export class CreateUserDto {
  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  readonly phoneNumber: string;

  readonly companyName: string;

  readonly userState: UserState;
}
