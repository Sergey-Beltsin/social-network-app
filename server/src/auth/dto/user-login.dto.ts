import { IsDefined, IsEmail, IsString } from 'class-validator';
import { EMAIL_OR_PASSWORD_INCORRECT } from '../auth.constants';

export class UserLoginDto {
  @IsDefined({ message: EMAIL_OR_PASSWORD_INCORRECT })
  @IsEmail({}, { message: EMAIL_OR_PASSWORD_INCORRECT })
  email: string;

  @IsDefined({ message: EMAIL_OR_PASSWORD_INCORRECT })
  @IsString({ message: EMAIL_OR_PASSWORD_INCORRECT })
  password: string;
}
