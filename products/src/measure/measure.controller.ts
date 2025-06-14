import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';
import { CompanyGuard } from 'src/middleware/company.guard';
import { Request } from 'express';

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
  findAll(@Req() req: Request) {
    const branch = req.headers.branch as string;
    return this.measureService.findAll(+branch);
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
