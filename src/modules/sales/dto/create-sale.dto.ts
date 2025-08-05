import { IsNumber, IsOptional, IsDecimal, IsBoolean } from 'class-validator';

export class CreateSaleDto {
  @IsNumber()
  product_id: number;

  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsNumber()
  sold_at?: number;

  @IsOptional()
  @IsDecimal()
  sale_price?: number;

  @IsOptional()
  @IsDecimal()
  comision?: number;

  @IsOptional()
  @IsBoolean()
  comision_paid?: boolean;
}
