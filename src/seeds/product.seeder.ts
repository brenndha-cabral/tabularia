import { Repository } from 'typeorm';
import { ProductEntity } from '../products/entities/product.entity';
import { CategoryEntity } from '../categories/entities/category.entity';

export async function ProductSeeder(
  productRepo: Repository<ProductEntity>,
  categories: CategoryEntity[],
): Promise<void> {
  const products = [
    {
      name: 'Banco Imobiliário',
      description: 'Versão brasileira do Monopoly.',
      publisher: 'Estrela',
      price: 120.0,
      players_min: 2,
      players_max: 6,
      age_rating: 8,
      stock: 30,
      release_year: 1944,
      category: { id: categories.find((c) => c.name === 'Clássico')?.id },
    },
    {
      name: 'War',
      description: 'Conquiste o mundo com seu exército.',
      publisher: 'Grow',
      price: 99.0,
      players_min: 3,
      players_max: 6,
      age_rating: 10,
      stock: 20,
      release_year: 1972,
      category: { id: categories.find((c) => c.name === 'Estratégia')?.id },
    },
    {
      name: 'Imagem & Ação',
      description: 'Jogo de desenhar e adivinhar.',
      publisher: 'Grow',
      price: 79.9,
      players_min: 4,
      players_max: 10,
      age_rating: 8,
      stock: 18,
      release_year: 1989,
      category: { id: categories.find((c) => c.name === 'Party Game')?.id },
    },
    {
      name: 'Dixit',
      description: 'Jogo de associação de imagens e criatividade.',
      publisher: 'Galápagos',
      price: 149.9,
      players_min: 3,
      players_max: 6,
      age_rating: 8,
      stock: 25,
      release_year: 2010,
      category: { id: categories.find((c) => c.name === 'Família')?.id },
    },
    {
      name: 'Detetive',
      description: 'Descubra quem cometeu o crime!',
      publisher: 'Estrela',
      price: 89.0,
      players_min: 3,
      players_max: 6,
      age_rating: 10,
      stock: 22,
      release_year: 1984,
      category: { id: categories.find((c) => c.name === 'Estratégia')?.id },
    },
  ];
  await productRepo.save(products);
  console.log('🎮 Jogos inseridos!');
}
