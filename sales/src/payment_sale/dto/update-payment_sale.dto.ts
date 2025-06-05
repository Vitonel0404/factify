import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentSaleDto } from './create-payment_sale.dto';

export class UpdatePaymentSaleDto extends PartialType(CreatePaymentSaleDto) {}
