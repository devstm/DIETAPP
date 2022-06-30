import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAskDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
