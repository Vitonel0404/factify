import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PurchaseOrderDetailService } from './purchase_order_detail.service';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase_order_detail.dto';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase_order_detail.dto';
import { CompanyGuard } from 'src/middleware/company.guard';
import { Request } from 'express';

@Controller('purchase-order-detail')
export class PurchaseOrderDetailController {
  constructor(private readonly purchaseOrderDetailService: PurchaseOrderDetailService) {}

  @Post()
  create(@Body() createPurchaseOrderDetailDto: CreatePurchaseOrderDetailDto) {
    return this.purchaseOrderDetailService.create(createPurchaseOrderDetailDto);
  }

  @UseGuards(CompanyGuard)
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.purchaseOrderDetailService.findAll(+id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.purchaseOrderDetailService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseOrderDetailDto: UpdatePurchaseOrderDetailDto) {
    return this.purchaseOrderDetailService.update(+id, updatePurchaseOrderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseOrderDetailService.remove(+id);
  }
}
