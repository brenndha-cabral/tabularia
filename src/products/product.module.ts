import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { CategoryModule } from '../categories/category.module';
import { CategoryService } from '../categories/services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CategoryModule],
  providers: [ProductService, CategoryService],
  controllers: [ProductController],
  exports: [TypeOrmModule],
})
export class ProductModule {}
