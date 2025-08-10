import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '../product.entity';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Camiseta Polo' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descripción del producto', example: 'Camiseta polo de algodón 100%', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Color del producto', example: 'Azul', required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ description: 'Talla del producto', example: 'M', required: false })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiProperty({ description: 'Precio de compra', example: 25.50, required: false })
  @IsOptional()
  @IsNumber()
  purchase_price?: number;

  @ApiProperty({ description: 'Precio de venta', example: 45.99, required: false })
  @IsOptional()
  @IsNumber()
  sale_price?: number;

  @ApiProperty({ 
    description: 'Estado del producto', 
    example: ProductStatus.IN_STOCK,
    enum: ProductStatus,
    required: false 
  })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}
