import { Module } from '@nestjs/common';
import { PurchaseOrderDetailService } from './purchase_order_detail.service';
import { PurchaseOrderDetailController } from './purchase_order_detail.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';

@Module({
  imports:[TenancyModule],
  controllers: [PurchaseOrderDetailController],
  providers: [PurchaseOrderDetailService],
  exports:[PurchaseOrderDetailService]
})
export class PurchaseOrderDetailModule {}
