import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    const categories: Category[] = await this.categoryRepository.find({
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

  async findById(id: number): Promise<Category> {
    const categoryById = await this.categoryRepository.findOne({
      where: { id },
      relations: { product: true },
    });

    if (categoryById === null) {
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    }

    return categoryById;
  }

  async findByName(name: string): Promise<Category[]> {
    const categoriesByName: Category[] = await this.categoryRepository.find({
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

  async create(category: Category): Promise<Category> {
    return await this.categoryRepository.save(category);
  }

  async update(category: Category): Promise<Category> {
    await this.findById(category.id);
    return await this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.categoryRepository.delete(id);
  }
}
