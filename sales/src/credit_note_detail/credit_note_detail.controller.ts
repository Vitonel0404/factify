import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreditNoteDetailService } from './credit_note_detail.service';
import { CreateCreditNoteDetailDto } from './dto/create-credit_note_detail.dto';
import { UpdateCreditNoteDetailDto } from './dto/update-credit_note_detail.dto';
import { CompanyGuard } from 'src/middleware/company.guard';

@Controller('credit-note-detail')
export class CreditNoteDetailController {
  constructor(private readonly creditNoteDetailService: CreditNoteDetailService) {}

  @UseGuards(CompanyGuard)
  @Post()
  create(@Body() createCreditNoteDetailDto: CreateCreditNoteDetailDto) {
    return this.creditNoteDetailService.create(createCreditNoteDetailDto);
  }

  @UseGuards(CompanyGuard)
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.creditNoteDetailService.findAll(+id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.creditNoteDetailService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreditNoteDetailDto: UpdateCreditNoteDetailDto) {
    return this.creditNoteDetailService.update(+id, updateCreditNoteDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditNoteDetailService.remove(+id);
  }
}
