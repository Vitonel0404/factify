import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { CorrelativeService } from './correlative.service';
import { CreateCorrelativeDto } from './dto/create-correlative.dto';
import { UpdateCorrelativeDto } from './dto/update-correlative.dto';
import { CompanyGuard } from 'src/middleware/company.guard';
import { Request } from 'express';

@Controller('correlative')
export class CorrelativeController {
  constructor(private readonly correlativeService: CorrelativeService) {}

  @UseGuards(CompanyGuard)
  @Post()
  create(@Body() createCorrelativeDto: CreateCorrelativeDto) {
    return this.correlativeService.create(createCorrelativeDto);
  }

  @UseGuards(CompanyGuard)
  @Get()
  findAll(@Req() req: Request) {
    const branch = req.headers.branch as string;
    return this.correlativeService.findAll(+branch);
  }

  @UseGuards(CompanyGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.correlativeService.findOne(+id);
  }

  @UseGuards(CompanyGuard)
  @Get('voucher/:id_branch/:id_voucher_type')
  findOneByVoucher(@Param('id_branch') id_branch: string, @Param('id_voucher_type') id_voucher_type: string) {
    return this.correlativeService.findOneByVoucher(+id_branch,+id_voucher_type);
  }

  @UseGuards(CompanyGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCorrelativeDto: UpdateCorrelativeDto) {
    return this.correlativeService.update(+id, updateCorrelativeDto);
  }

  @UseGuards(CompanyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.correlativeService.remove(+id);
  }
}
