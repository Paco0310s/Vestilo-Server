import { IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateProductAssignmentDto {
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsOptional()
  @IsNumber()
  product_id?: number;

  @IsOptional()
  @IsDateString()
  assigned_at?: Date;

  @IsOptional()
  @IsDateString()
  completed_at?: Date;
}
