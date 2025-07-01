import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryDto } from '../dtos/createCategory.dto';
import { UpdateCategoryDto } from '../dtos/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    const categories: CategoryEntity[] = await this.categoryRepository.find({
      relations: { product: true },
    });

    if (categories.length === 0) {
      throw new HttpException(
        'Categorias não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    return categories;
  }

  async findById(id: number): Promise<CategoryEntity> {
    const categoryById = await this.categoryRepository.findOne({
      where: { id },
      relations: { product: true },
    });

    if (categoryById === null) {
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    }

    return categoryById;
  }

  async findByName(name: string): Promise<CategoryEntity[]> {
    const categoriesByName: CategoryEntity[] =
      await this.categoryRepository.find({
        where: { name: ILike(`%${name}%`) },
      });

    if (categoriesByName.length === 0) {
      throw new HttpException(
        'Categorias não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return categoriesByName;
  }

  async create(category: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.categoryRepository.save(category);
  }

  async update(
    id: number,
    category: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    await this.findById(id);
    return await this.categoryRepository.save({ id, ...category });
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.categoryRepository.delete(id);
  }
}
