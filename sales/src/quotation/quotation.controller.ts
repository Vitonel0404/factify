import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { CompanyGuard } from 'src/middleware/company.guard';
import { Request } from 'express';

@Controller('quotation')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}
  
  @UseGuards(CompanyGuard)
  @Post()
  create(@Req() req: Request, @Body() createQuotationDto: CreateQuotationDto) {
    const branch = req.headers.branch as string;
    return this.quotationService.create(createQuotationDto,+branch);
  }

  @UseGuards(CompanyGuard)
  @Get()
  findAll(@Req() req: Request) {
    const branch = req.headers.branch as string;
    return this.quotationService.findAll(+branch);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuotationDto: UpdateQuotationDto) {
    return this.quotationService.update(+id, updateQuotationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotationService.remove(+id);
  }
}
