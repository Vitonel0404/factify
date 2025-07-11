import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_product: number;

  @Column({ type: 'int' })
  id_branch: number;

  @Column({ type: 'int' })
  id_category: number;

  @Column({ type: 'int' })
  id_measure: number;

  @Column({ type: 'varchar', length: 250 })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  purchase_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  stock: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  minimum_stock: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_eliminated: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
