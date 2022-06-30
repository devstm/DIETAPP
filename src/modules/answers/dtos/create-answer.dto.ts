import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnswerDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  recommendations: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  consultationId: number;

  @IsNotEmpty()
  @IsBoolean()
  isDraft: boolean;
}
