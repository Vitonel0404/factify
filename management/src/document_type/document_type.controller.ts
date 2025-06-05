import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { DocumentTypeService } from './document_type.service';
import { CreateDocumentTypeDto } from './dto/create-document_type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document_type.dto';
import { CompanyGuard } from 'src/middleware/company.guard';

@Controller('document-type')
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @UseGuards(CompanyGuard)
  @Post()
  create(@Body() createDocumentTypeDto: CreateDocumentTypeDto) {
    return this.documentTypeService.create(createDocumentTypeDto);
  }

  @UseGuards(CompanyGuard)
  @Get()
  findAll() {
    return this.documentTypeService.findAll();
  }

  @UseGuards(CompanyGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentTypeService.findOne(+id);
  }

  @UseGuards(CompanyGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDocumentTypeDto: UpdateDocumentTypeDto) {
    return this.documentTypeService.update(+id, updateDocumentTypeDto);
  }

  @UseGuards(CompanyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentTypeService.remove(+id);
  }
}
