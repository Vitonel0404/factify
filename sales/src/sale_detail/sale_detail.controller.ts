import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SaleDetailService } from './sale_detail.service';
import { CreateSaleDetailDto } from './dto/create-sale_detail.dto';
import { UpdateSaleDetailDto } from './dto/update-sale_detail.dto';
import { CompanyGuard } from 'src/middleware/company.guard';

@Controller('sale-detail')
export class SaleDetailController {
  constructor(private readonly saleDetailService: SaleDetailService) {}

  @UseGuards(CompanyGuard)
  @Post()
  create(@Body() createSaleDetailDto: CreateSaleDetailDto) {
    return this.saleDetailService.create(createSaleDetailDto);
  }

  @UseGuards(CompanyGuard)
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.saleDetailService.findAll(+id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.saleDetailService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDetailDto: UpdateSaleDetailDto) {
    return this.saleDetailService.update(+id, updateSaleDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleDetailService.remove(+id);
  }
}
