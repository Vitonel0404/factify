import { Module } from '@nestjs/common';
import { PurchaseDetailService } from './purchase_detail.service';
import { PurchaseDetailController } from './purchase_detail.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';

@Module({
  imports:[TenancyModule],
  controllers: [PurchaseDetailController],
  providers: [PurchaseDetailService],
  exports:[PurchaseDetailService]
})
export class PurchaseDetailModule {}
