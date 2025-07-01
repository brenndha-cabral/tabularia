import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity({ name: 'tb_categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  name: string;

  @IsNotEmpty()
  @Column({ type: 'text', nullable: false })
  description: string;

  @UpdateDateColumn()
  created_at: Date;

  @ManyToOne(() => ProductEntity, (product) => product.category, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity[];
}
