import { Module } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';
import { QuotationDetailModule } from 'src/quotation_detail/quotation_detail.module';

@Module({
  imports:[TenancyModule, QuotationDetailModule],
  controllers: [QuotationController],
  providers: [QuotationService],
})
export class QuotationModule {}
