import { Module } from '@nestjs/common';
import { SaleDetailService } from './sale_detail.service';
import { SaleDetailController } from './sale_detail.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';

@Module({
  imports:[TenancyModule],
  controllers: [SaleDetailController],
  providers: [SaleDetailService],
  exports: [SaleDetailService]
})
export class SaleDetailModule {}
