import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id_purchase_order: number;

  @Column({ type: 'int' })
  id_branch: number;

  @Column({ type: 'int' })
  id_supplier: number;

  @Column({ type: 'int' })
  order_number: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column('decimal', { precision: 20, scale: 2 })
  total: number;

  @Column('decimal', { precision: 15, scale: 2 })
  taxed_operation: number;

  @Column('decimal', { precision: 10, scale: 2 })
  igv_percent: number;

  @Column('decimal', { precision: 10, scale: 2 })
  igv: number;

  @Column()
  user_name: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  reason_cancellation: string;

  @Column({ nullable: true })
  user_name_cancellation: string;
}
