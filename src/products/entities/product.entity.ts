import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity({ name: 'tb_products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  name: string;

  @IsNotEmpty()
  @Column({ type: 'text', nullable: false })
  description: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  publisher: string;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 19, scale: 4 })
  price: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  players_min: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  players_max: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  age_rating: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  stock: number;

  @IsNotEmpty()
  @Column({ type: 'year', nullable: false })
  release_year: number;

  @UpdateDateColumn()
  created_at: Date;

  @OneToMany(() => Category, (category) => category.product, {
    onDelete: 'CASCADE',
  })
  category: Category;
}
