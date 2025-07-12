import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CreditNote {
  @PrimaryGeneratedColumn()
  id_credit_note: number;

  @Column()
  id_branch: number;

  @Column()
  id_voucher_type: number;

  @Column()
  credit_note_type: string;

  @Column()
  series: string;

  @Column('int')
  number: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  date: Date;

  @Column()
  reference_series: string;

  @Column('int')
  reference_number: number;

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

  @Column({ default: false })
  send_sunat: boolean;
}
