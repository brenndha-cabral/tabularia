import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';

@Entity({ name: 'tb_products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ length: 255, nullable: false })
  publisher: string;

  @Column({ type: 'decimal', precision: 19, scale: 4 })
  price: number;

  @Column({ nullable: false })
  players_min: number;

  @Column({ nullable: false })
  players_max: number;

  @Column({ nullable: false })
  age_rating: number;

  @Column({ nullable: false })
  stock: number;

  @Column({ type: 'year', nullable: false })
  release_year: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.product, {
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;
}
