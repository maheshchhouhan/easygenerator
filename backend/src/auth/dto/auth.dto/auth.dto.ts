import { IsString, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain at least 1 letter, 1 number, and 1 special character',
  })
  password: string;
}

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain at least 1 letter, 1 number, and 1 special character',
  })
  password: string;

  @IsString()
  name: string;
}
