import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';
import { SaleDetailModule } from 'src/sale_detail/sale_detail.module';
import { PaymentSaleModule } from 'src/payment_sale/payment_sale.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[TenancyModule, SaleDetailModule, PaymentSaleModule, HttpModule],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
