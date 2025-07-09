import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post()
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificateService.create(createCertificateDto);
  }

  @Get()
  findAll() {
    return this.certificateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificateService.findOne(+id);
  }

}
