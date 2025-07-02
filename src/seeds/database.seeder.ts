import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CategoryEntity } from '../categories/entities/category.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { CategorySeeder } from './category.seeder';
import { ProductSeeder } from './product.seeder';
import { DataSource } from 'typeorm';

async function bootstrapSeeder() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const categoryRepo = dataSource.getRepository(CategoryEntity);
  const productRepo = dataSource.getRepository(ProductEntity);

  const categories = await CategorySeeder(categoryRepo);
  await ProductSeeder(productRepo, categories);

  console.log('🌱 Seeding completo!');
  await app.close();
}

bootstrapSeeder().catch((error) => {
  console.error('🚨 Erro no seeding:', error);
  process.exit(1);
});
