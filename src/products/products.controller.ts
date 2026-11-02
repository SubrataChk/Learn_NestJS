import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateProductDto){
    return this.productsService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(){
    return this.productsService.findAll();
  }

  @Get('id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch('id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() dto: UpdateProductDto){
    return this.productsService.update(id, dto);
  }

  @Delete('id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(id);
  }


}
