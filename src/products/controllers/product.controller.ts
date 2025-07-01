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
import { UpdateProductDto } from '../dtos/updateProduct.dto';
import { CreateProductDto } from '../dtos/createProduct.dto';

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
  create(@Body() product: CreateProductDto): Promise<ProductEntity> {
    return this.productsService.create(product);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productsService.update(id, product);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
