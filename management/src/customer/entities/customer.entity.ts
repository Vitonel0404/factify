import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_customer: number;

  @Column({ type: 'int' })
  id_document_type: number;

  @Column({ type: 'varchar', length: 15 })
  document_number: string;

  @Column({ type: 'varchar', length: 250 })
  full_name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_eliminated: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
