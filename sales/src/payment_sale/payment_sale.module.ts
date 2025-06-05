import { Module } from '@nestjs/common';
import { PaymentSaleService } from './payment_sale.service';
import { PaymentSaleController } from './payment_sale.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';

@Module({
  imports:[TenancyModule],
  controllers: [PaymentSaleController],
  providers: [PaymentSaleService],
  exports:[PaymentSaleService]
})
export class PaymentSaleModule {}
