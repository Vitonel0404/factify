import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('product_movement')
export class ProductMovement {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_movement: number;

  @Column({ type: 'int' })
  id_product: number;

  @Column({ type: 'int' })
  id_branch: number;

  @Column({ type: 'varchar', length: 50 })
  movement_type: string; 

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observation: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
