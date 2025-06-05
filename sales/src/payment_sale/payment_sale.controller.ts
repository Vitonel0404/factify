import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentSaleService } from './payment_sale.service';
import { CreatePaymentSaleDto } from './dto/create-payment_sale.dto';
import { UpdatePaymentSaleDto } from './dto/update-payment_sale.dto';

@Controller('payment-sale')
export class PaymentSaleController {
  constructor(private readonly paymentSaleService: PaymentSaleService) {}

  @Post()
  create(@Body() createPaymentSaleDto: CreatePaymentSaleDto) {
    return this.paymentSaleService.create(createPaymentSaleDto);
  }

  @Get()
  findAll() {
    return this.paymentSaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentSaleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentSaleDto: UpdatePaymentSaleDto) {
    return this.paymentSaleService.update(+id, updatePaymentSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentSaleService.remove(+id);
  }
}
