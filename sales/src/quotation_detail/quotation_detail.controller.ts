import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuotationDetailService } from './quotation_detail.service';
import { CreateQuotationDetailDto } from './dto/create-quotation_detail.dto';
import { UpdateQuotationDetailDto } from './dto/update-quotation_detail.dto';

@Controller('quotation-detail')
export class QuotationDetailController {
  constructor(private readonly quotationDetailService: QuotationDetailService) {}

  @Post()
  create(@Body() createQuotationDetailDto: CreateQuotationDetailDto) {
    return this.quotationDetailService.create(createQuotationDetailDto);
  }

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
