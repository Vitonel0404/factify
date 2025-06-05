import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';
import { CompanyGuard } from 'src/middleware/company.guard';

@Controller('measure')
export class MeasureController {
  constructor(private readonly measureService: MeasureService) {}

  @UseGuards(CompanyGuard)
  @Post()
  create(@Body() createMeasureDto: CreateMeasureDto) {
    return this.measureService.create(createMeasureDto);
  }

  @UseGuards(CompanyGuard)
  @Get()
  findAll() {
    return this.measureService.findAll();
  }

  @UseGuards(CompanyGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.measureService.findOne(+id);
  }

  @UseGuards(CompanyGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMeasureDto: UpdateMeasureDto) {
    return this.measureService.update(+id, updateMeasureDto);
  }

  @UseGuards(CompanyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.measureService.remove(+id);
  }
}
