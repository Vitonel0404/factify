import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CorrelativeService } from './correlative.service';
import { CreateCorrelativeDto } from './dto/create-correlative.dto';
import { UpdateCorrelativeDto } from './dto/update-correlative.dto';

@Controller('correlative')
export class CorrelativeController {
  constructor(private readonly correlativeService: CorrelativeService) {}

  @Post()
  create(@Body() createCorrelativeDto: CreateCorrelativeDto) {
    return this.correlativeService.create(createCorrelativeDto);
  }

  @Get()
  findAll() {
    return this.correlativeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.correlativeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCorrelativeDto: UpdateCorrelativeDto) {
    return this.correlativeService.update(+id, updateCorrelativeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.correlativeService.remove(+id);
  }
}
