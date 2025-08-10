import { Controller } from '@nestjs/common';
import { SalesService } from './sales.service';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { Sale } from './sale.entity';
@ApiTags('Sales')
@Controller('sales')
export class SalesController extends BaseController<Sale> {
  constructor(private readonly salesService: SalesService) {
    super(salesService);
  }
}
