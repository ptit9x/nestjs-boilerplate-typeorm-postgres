import { IsString, IsInt, IsOptional } from 'class-validator';

export class UserRequest {
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

  @IsOptional()
  roleId: number;
}