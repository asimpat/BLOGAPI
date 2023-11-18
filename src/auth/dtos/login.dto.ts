import { IsNotEmpty, MinLength, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  // @IsEmail()
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  password: string;
}
