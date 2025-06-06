import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('correlative')
export class Correlative {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_correlative: number;

  @Column({ type: 'int' })
  id_branch: number;

  @Column({ type: 'int' })
  id_voucher_type: number;

  @Column({ type: 'varchar', length: 10 })
  series: string;

  @Column({ type: 'int', nullable: true })
  last_number: number;

  @Column({ type: 'int' })
  maximun_correlative: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_eliminated: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
