import { IsString } from 'class-validator';

export class CreateUserResponse {
  @IsString()
  id: string;
}