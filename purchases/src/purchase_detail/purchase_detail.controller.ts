import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PurchaseDetailService } from './purchase_detail.service';
import { CreatePurchaseDetailDto } from './dto/create-purchase_detail.dto';
import { UpdatePurchaseDetailDto } from './dto/update-purchase_detail.dto';
import { CompanyGuard } from 'src/middleware/company.guard';

@Controller('purchase-detail')
export class PurchaseDetailController {
  constructor(private readonly purchaseDetailService: PurchaseDetailService) {}

  @UseGuards(CompanyGuard)
  @Post()
  create(@Body() createPurchaseDetailDto: CreatePurchaseDetailDto) {
    return this.purchaseDetailService.create(createPurchaseDetailDto);
  }

  @UseGuards(CompanyGuard)
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.purchaseDetailService.findAll(+id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.purchaseDetailService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseDetailDto: UpdatePurchaseDetailDto) {
    return this.purchaseDetailService.update(+id, updatePurchaseDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseDetailService.remove(+id);
  }
}
