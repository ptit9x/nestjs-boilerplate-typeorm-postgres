import { IsString, IsInt } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  mobile: string;

  @IsString()
  password: string;

  @IsInt()
  status: number;
}