import { Controller } from '@nestjs/common';
import { SalesService } from './sales.service';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@ApiTags('Sales')
@Controller('sales')
export class SalesController extends BaseController<Sale, CreateSaleDto, UpdateSaleDto> {
  constructor(private readonly salesService: SalesService) {
    super(salesService);
  }
}
