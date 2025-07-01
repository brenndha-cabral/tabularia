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
import { CategoryService } from '../services/category.service';
import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryDto } from '../dtos/createCategory.dto';
import { UpdateCategoryDto } from '../dtos/updateCategory.dto';
import { ApiBody, ApiExtraModels } from '@nestjs/swagger';

@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<CategoryEntity> {
    return this.categoryService.findById(id);
  }

  @Get('/:name')
  @HttpCode(HttpStatus.OK)
  findByName(@Param('name') name: string): Promise<CategoryEntity[]> {
    return this.categoryService.findByName(name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() category: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryService.create(category);
  }

  @ApiExtraModels(UpdateCategoryDto)
  @Put('/:id')
  @ApiBody({ type: CreateCategoryDto })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.update(id, category);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
