import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PurchaseOrderService } from './purchase_order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase_order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase_order.dto';
import { CompanyGuard } from 'src/middleware/company.guard';
import { Request } from 'express';

@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @UseGuards(CompanyGuard)
  @Post()
  create(@Req() req: Request, @Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const branch = req.headers.branch as string;
    return this.purchaseOrderService.create(createPurchaseOrderDto,+branch);
  }

  @UseGuards(CompanyGuard)
  @Get()
  findAll(@Req() req: Request) {
    const branch = req.headers.branch as string;
    return this.purchaseOrderService.findAll(+branch);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.purchaseOrderService.update(+id, updatePurchaseOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseOrderService.remove(+id);
  }
}
