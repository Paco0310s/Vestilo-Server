import { IsNumber, IsOptional, IsBoolean, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiProperty({ description: 'ID del producto vendido', example: 1 })
  @IsNumber()
  product_id: number;

  @ApiProperty({ description: 'ID del usuario que realizó la venta', example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'Precio de venta', example: 45.99 })
  @IsNumber()
  sale_price: number;

  @ApiProperty({ description: 'Fecha y hora de la venta', example: '2024-01-01T10:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  sold_at?: Date;

  @ApiProperty({ description: 'Comisión del vendedor', example: 5.25, required: false })
  @IsOptional()
  @IsNumber()
  comision?: number;

  @ApiProperty({ description: 'Indica si la comisión fue pagada', example: false, required: false })
  @IsOptional()
  @IsBoolean()
  comision_paid?: boolean;

  @ApiProperty({ description: 'Método de pago', example: 'cash', required: false, enum: ['cash', 'card', 'transfer'] })
  @IsOptional()
  @IsEnum(['cash', 'card', 'transfer'])
  payment_method?: string;
}
