import { IsEmail, IsString, Max, Min } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  email: string;

  @Min(8, { message: 'password.minLength' })
  @Max(20, { message: 'password.maxLength' })
  @IsString()
  password: string;

  @Min(4, { message: 'username.minLength' })
  @Max(16, { message: 'username.maxLength' })
  @IsString()
  username: string;

  @Max(30, { message: 'name.maxLength' })
  @IsString()
  name: string;

  @Max(20, { message: 'surname.maxLength' })
  @IsString()
  surname: string;
}
