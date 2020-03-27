import { IsNotEmpty } from 'class-validator';

export class PermissionRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}