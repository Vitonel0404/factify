import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreditNoteService } from './credit_note.service';
import { CreateCreditNoteDto } from './dto/create-credit_note.dto';
import { UpdateCreditNoteDto } from './dto/update-credit_note.dto';
import { CompanyGuard } from 'src/middleware/company.guard';

@Controller('credit-note')
export class CreditNoteController {
  constructor(private readonly creditNoteService: CreditNoteService) {}

  @UseGuards(CompanyGuard)
  @Post()
  create(@Body() createCreditNoteDto: CreateCreditNoteDto) {
    return this.creditNoteService.create(createCreditNoteDto);
  }

  @Get()
  findAll() {
    return this.creditNoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditNoteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreditNoteDto: UpdateCreditNoteDto) {
    return this.creditNoteService.update(+id, updateCreditNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditNoteService.remove(+id);
  }
}
