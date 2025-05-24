import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('sale')
export class Sale {
  @PrimaryGeneratedColumn()
  id_sale: number;

  @Column()
  id_branch: number;

  @Column()
  id_voucher_type: number;

  @Column()
  id_customer: number;

  @Column({ type: 'varchar', length: 10 })
  series: string;

  @Column()
  number: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'decimal', precision: 20, scale: 2 })
  total: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  taxed_operation: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  igv_percent: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  igv: number;

  @Column({ type: 'boolean', default: false })
  is_credit: boolean;

  @Column({ type: 'timestamp', nullable: true })
  due_date: Date;

  @Column({ type: 'varchar', length: 100 })
  user_name: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'varchar', length: 250, nullable: true })
  reason_cancellation: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  user_name_cancellation: string;

  @Column({ type: 'boolean', default: false })
  send_sunat: boolean;

  @Column({ type: 'int', nullable: true })
  id_quotation: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
