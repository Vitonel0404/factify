import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenancyModule } from './tenancy/tenancy.module';
import { ConfigModule } from '@nestjs/config';
import { SaleModule } from './sale/sale.module';
import { SaleDetailModule } from './sale_detail/sale_detail.module';
import { PaymentSaleModule } from './payment_sale/payment_sale.module';
import { QuotationModule } from './quotation/quotation.module';
import { QuotationDetailModule } from './quotation_detail/quotation_detail.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
    isGlobal: true
  }),
    TenancyModule,
    SaleModule,
    SaleDetailModule,
    PaymentSaleModule,
    QuotationModule,
    QuotationDetailModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
