import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateFileDto {
  @IsString()
  key: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  extension?: string;

  @IsOptional()
  @IsInt()
  size?: number;

  @IsOptional()
  @IsString()
  blur_hash?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsString()
  bucket?: string;
}
