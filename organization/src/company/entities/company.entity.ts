import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_company: number;

  @Column({ type: 'varchar', length: 20 })
  ruc: string;

  @Column({ type: 'varchar', length: 150 })
  legal_name: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  logo: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  second_user_sunat: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  second_password_sunat: string;

  @Column({ type: 'varchar', length: 100 })
  db_name: string;

  @Column({ type: 'boolean', default: false })
  is_delinquent: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'int' })
  id_admin_user: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
