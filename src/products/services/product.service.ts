import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    const products: Product[] = await this.productRepository.find({
      relations: { category: true },
    });

    if (products.length === 0) {
      throw new HttpException('Produtos não encontrados', HttpStatus.NOT_FOUND);
    }
    return products;
  }

  async findById(id: number): Promise<Product> {
    const productById = await this.productRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (productById === null) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }

    return productById;
  }

  async findByName(name: string): Promise<Product[]> {
    const productsByName: Product[] = await this.productRepository.find({
      where: { name: ILike(`%${name}%`) },
    });

    if (productsByName.length === 0) {
      throw new HttpException('Produtos não encontrados', HttpStatus.NOT_FOUND);
    }

    return productsByName;
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(product: Product): Promise<Product> {
    await this.findById(product.id);
    return await this.productRepository.save(product);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.productRepository.delete(id);
  }
}
