import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('branch')
export class Branch {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_branch: number;

  @Column({ type: 'int' })
  id_company: number;

  @Column({ type: 'varchar', length: 100 })
  trade_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  geo_code: string;

  @Column({ type: 'varchar', length: 100 , nullable: true})
  department: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  province: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  urbanization: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  annex_code: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  email: string;

  @Column({ type: 'boolean', default: false })
  is_main: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'int' })
  id_admin_user: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
