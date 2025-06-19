import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QuotationDetailService } from './quotation_detail.service';
import { CreateQuotationDetailDto } from './dto/create-quotation_detail.dto';
import { UpdateQuotationDetailDto } from './dto/update-quotation_detail.dto';
import { CompanyGuard } from 'src/middleware/company.guard';

@Controller('quotation-detail')
export class QuotationDetailController {
  constructor(private readonly quotationDetailService: QuotationDetailService) {}

  @UseGuards(CompanyGuard)
  @Post()
  create(@Body() createQuotationDetailDto: CreateQuotationDetailDto) {
    return this.quotationDetailService.create(createQuotationDetailDto);
  }
  
  @UseGuards(CompanyGuard)
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.quotationDetailService.findAll(+id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.quotationDetailService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuotationDetailDto: UpdateQuotationDetailDto) {
    return this.quotationDetailService.update(+id, updateQuotationDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotationDetailService.remove(+id);
  }
}
