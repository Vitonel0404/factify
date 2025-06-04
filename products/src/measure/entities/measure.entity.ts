import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('measure')
export class Measure {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_measure: number;

  @Column({ type: 'int' })
  id_branch: number;

  @Column({ type: 'varchar', length: 250 })
  description: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_eliminated: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
