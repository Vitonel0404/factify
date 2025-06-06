import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id_purchase: number;

  @Column()
  id_branch: number;

  @Column()
  id_supplier: number;

  @Column()
  id_voucher_type: number;

  @Column()
  series: string;

  @Column('int')
  number: number;

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

  @Column({ nullable: true })
  id_purchase_order: number;
}
