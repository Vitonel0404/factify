import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { VoucherTypeService } from './voucher_type.service';
import { CreateVoucherTypeDto } from './dto/create-voucher_type.dto';
import { UpdateVoucherTypeDto } from './dto/update-voucher_type.dto';
import { CompanyGuard } from 'src/middleware/company.guard';

@Controller('voucher-type')
export class VoucherTypeController {
  constructor(private readonly voucherTypeService: VoucherTypeService) {}

  @UseGuards(CompanyGuard)
  @Post()
  create(@Body() createVoucherTypeDto: CreateVoucherTypeDto) {
    return this.voucherTypeService.create(createVoucherTypeDto);
  }

  @UseGuards(CompanyGuard)
  @Get()
  findAll() {
    return this.voucherTypeService.findAll();
  }

  @UseGuards(CompanyGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherTypeService.findOne(+id);
  }

  @UseGuards(CompanyGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateVoucherTypeDto: UpdateVoucherTypeDto) {
    return this.voucherTypeService.update(+id, updateVoucherTypeDto);
  }

  @UseGuards(CompanyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherTypeService.remove(+id);
  }
}
