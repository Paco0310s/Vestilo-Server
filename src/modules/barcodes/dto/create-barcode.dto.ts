import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateBarcodeDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  format?: string;

  @IsOptional()
  @IsDateString()
  assigned_at?: Date;
}
