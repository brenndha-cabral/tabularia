import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductEntity } from '../entities/product.entity';

@Controller('/products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<ProductEntity[]> {
    return this.productsService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
    return this.productsService.findById(id);
  }

  @Get('/:name')
  @HttpCode(HttpStatus.OK)
  findByName(@Param('name') name: string): Promise<ProductEntity[]> {
    return this.productsService.findByName(name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() product: ProductEntity): Promise<ProductEntity> {
    return this.productsService.create(product);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() product: ProductEntity): Promise<ProductEntity> {
    return this.productsService.update(product);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
