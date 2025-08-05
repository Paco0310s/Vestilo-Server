import { IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateSellerPaymentDto {
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsDateString()
  paid_at?: Date;
}
