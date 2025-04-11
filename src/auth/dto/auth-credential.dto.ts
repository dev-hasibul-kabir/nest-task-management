import { IsNotEmpty } from 'class-validator';

export class AuthCredentialDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
