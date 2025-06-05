import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductMovementService } from './product_movement.service';
import { CreateProductMovementDto } from './dto/create-product_movement.dto';
import { UpdateProductMovementDto } from './dto/update-product_movement.dto';

@Controller('product-movement')
export class ProductMovementController {
  constructor(private readonly productMovementService: ProductMovementService) {}

  @Post()
  create(@Body() createProductMovementDto: CreateProductMovementDto) {
    return this.productMovementService.create(createProductMovementDto);
  }

  @Get()
  findAll() {
    return this.productMovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productMovementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductMovementDto: UpdateProductMovementDto) {
    return this.productMovementService.update(+id, updateProductMovementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productMovementService.remove(+id);
  }
}
