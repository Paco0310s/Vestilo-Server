import { Controller, Post, Body, Patch, Param, ParseIntPipe, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { BaseController } from '../../common/controllers/base.controller';
import { Product, ProductStatus } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Products')
@ApiBearerAuth('JWT-auth')
@Controller('products')
export class ProductsController extends BaseController<Product, CreateProductDto, UpdateProductDto> {
  constructor(private readonly productsService: ProductsService) {
    super(productsService);
  }

  @Post()
  @ApiBody({ 
    type: CreateProductDto,
    description: 'Datos para crear un nuevo producto'
  })
  create(@Body() createProductDto: CreateProductDto, @Req() request: Request & { auditData?: any }) {
    return super.create(createProductDto, request);
  }

  // Endpoint específico para crear producto con imágenes multipart
  @Post('with-images')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 5, {
    storage: diskStorage({
      destination: './uploads/products',
      filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
    fileFilter: (_req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return cb(new Error('Tipo de archivo no soportado'), false);
      }
      cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  }))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        color: { type: 'string' },
        size: { type: 'string' },
        purchase_price: { type: 'number', format: 'float' },
        sale_price: { type: 'number', format: 'float' },
        status: { type: 'string', enum: Object.values(ProductStatus) },
        images: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
      required: ['name', 'color', 'purchase_price', 'sale_price']
    },
    description: 'Crear producto con hasta 5 imágenes (multipart/form-data)'
  })
  async createWithImages(
    @Body() body: any,
    @UploadedFiles() images: Express.Multer.File[],
    @Req() request: Request & { auditData?: any }
  ) {
    console.log('[ProductsController] createWithImages body:', body);
    console.log('[ProductsController] createWithImages images:', images?.length || 0);

    // Normalizar y forzar tipos (números) para evitar guardar strings
    const normalized: any = {
      name: body.name,
      description: body.description ?? null,
      color: body.color,
      size: body.size ?? null,
      purchase_price: body.purchase_price !== undefined ? Number(body.purchase_price) : undefined,
      sale_price: body.sale_price !== undefined ? Number(body.sale_price) : undefined,
      status: body.status,
    };

    // Validación mínima manual en caso de multipart
    if (!normalized.name || !normalized.color || !normalized.purchase_price || !normalized.sale_price) {
      throw new Error('Campos requeridos faltantes (name, color, purchase_price, sale_price)');
    }

    const product = await super.create(normalized, request);

    if (images && images.length) {
      await this.productsService.attachImages(product.id, images);
    }

    const saved = await this.productsService.findOne(product.id);
    return saved;
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateProductDto,
    description: 'Datos para actualizar el producto'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto, @Req() request: Request & { auditData?: any }) {
    return super.update(id, updateProductDto, request);
  }
}
