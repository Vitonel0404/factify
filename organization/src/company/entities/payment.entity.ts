import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id_payment: number;

  @Column()
  id_company_plan: number;

@Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @Column({ type: 'date' })
  due_date: string;

  @Column({ type: 'date' })
  cutoff_date: string;

  @Column({ type: 'varchar' })
  status: 'pending' | 'paid' | 'failed' | 'overdue';

  @Column({ type: 'date', nullable: true })
  payment_date: string;

  @Column({ type: 'varchar', nullable: true })
  method: string;

  @Column({ type: 'varchar', nullable: true })
  reference: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
