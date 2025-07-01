import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'tb_categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 150, nullable: false })
  name: string;

  @IsNotEmpty()
  @Column({ type: 'text', nullable: false })
  description: string;

  @UpdateDateColumn()
  created_at: Date;

  @ManyToOne(() => Product, (product) => product.category, {
    onDelete: 'CASCADE',
  })
  product: Product[];
}
