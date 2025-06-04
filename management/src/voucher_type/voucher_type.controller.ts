import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { VoucherTypeService } from './voucher_type.service';
import { CreateVoucherTypeDto } from './dto/create-voucher_type.dto';
import { UpdateVoucherTypeDto } from './dto/update-voucher_type.dto';

@Controller('voucher-type')
export class VoucherTypeController {
  constructor(private readonly voucherTypeService: VoucherTypeService) {}

  @Post()
  create(@Body() createVoucherTypeDto: CreateVoucherTypeDto) {
    return this.voucherTypeService.create(createVoucherTypeDto);
  }

  @Get()
  findAll() {
    return this.voucherTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherTypeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVoucherTypeDto: UpdateVoucherTypeDto) {
    return this.voucherTypeService.update(+id, updateVoucherTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherTypeService.remove(+id);
  }
}
