import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({ description: 'Clave única del archivo', example: 'files/products/image_123.jpg' })
  @IsString()
  key: string;

  @ApiProperty({ description: 'Nombre original del archivo', example: 'producto-imagen.jpg', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Extensión del archivo', example: 'jpg', required: false })
  @IsOptional()
  @IsString()
  extension?: string;

  @ApiProperty({ description: 'Tamaño del archivo en bytes', example: 1024000, required: false })
  @IsOptional()
  @IsInt()
  size?: number;

  @ApiProperty({ description: 'Hash difuso para previsualización', example: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj', required: false })
  @IsOptional()
  @IsString()
  blur_hash?: string;

  @ApiProperty({ description: 'Ruta del archivo en el almacenamiento', example: '/uploads/products/image_123.jpg', required: false })
  @IsOptional()
  @IsString()
  path?: string;

  @ApiProperty({ description: 'Bucket de almacenamiento', example: 'vestilo-files', required: false })
  @IsOptional()
  @IsString()
  bucket?: string;
}
