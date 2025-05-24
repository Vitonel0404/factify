import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('company_plan')
export class CompanyPlan {
  @PrimaryGeneratedColumn()
  id_company_plan: number;

  @Column()
  id_company: number;

  @Column()
  id_plan: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
