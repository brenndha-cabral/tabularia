import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { UpdateProductDto } from '../dtos/updateProduct.dto';
import { CreateProductDto } from '../dtos/createProduct.dto';
import { CategoryService } from '../../categories/services/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private categoryService: CategoryService,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    const products: ProductEntity[] = await this.productRepository.find({
      relations: { category: true },
    });

    if (products.length === 0) {
      throw new HttpException('Produtos não encontrados', HttpStatus.NOT_FOUND);
    }
    return products;
  }

  async findById(id: number): Promise<ProductEntity> {
    const productById = await this.productRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (productById === null) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }

    return productById;
  }

  async findByName(name: string): Promise<ProductEntity[]> {
    const productsByName: ProductEntity[] = await this.productRepository.find({
      where: { name: ILike(`%${name}%`) },
    });

    if (productsByName.length === 0) {
      throw new HttpException('Produtos não encontrados', HttpStatus.NOT_FOUND);
    }

    return productsByName;
  }

  async create(product: CreateProductDto): Promise<ProductEntity> {
    const category = await this.categoryService.findById(product.categoryId);

    if (!category) {
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.productRepository.save(product);
  }

  async update(id: number, product: UpdateProductDto): Promise<ProductEntity> {
    await this.findById(id);

    if (product.categoryId !== undefined) {
      const category = await this.categoryService.findById(product.categoryId);

      if (!category) {
        throw new HttpException(
          'Categoria não encontrada!',
          HttpStatus.NOT_FOUND,
        );
      }
    }
    return await this.productRepository.save({ id, ...product });
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.productRepository.delete(id);
  }
}
