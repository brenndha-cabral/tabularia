import { Repository } from 'typeorm';
import { CategoryEntity } from '../categories/entities/category.entity';

export async function CategorySeeder(
  categoryRepo: Repository<CategoryEntity>,
): Promise<CategoryEntity[]> {
  const categoriesData = [
    { name: 'Família', description: 'Jogos para todas as idades' },
    { name: 'Estratégia', description: 'Jogos para mentes estratégicas' },
    { name: 'Party Game', description: 'Jogos para jogar em grupo' },
    { name: 'Infantil', description: 'Para crianças pequenas' },
    { name: 'Clássico', description: 'Grandes clássicos dos jogos' },
  ];

  const saved = await categoryRepo.save(categoriesData);
  console.log('✅ Categorias criadas');
  return saved;
}
