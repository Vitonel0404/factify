import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('supplier')
export class Supplier {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_supplier: number;

  @Column({ type: 'int' })
  id_branch: number;

  @Column({ type: 'int' })
  id_document_type: number;

  @Column({ type: 'varchar', length: 15, unique: true })
  document_number: string;

  @Column({ type: 'varchar', length: 250 })
  legal_name: string;

  @Column({ type: 'varchar', length: 250 })
  trade_name: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  contact_phone: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  address: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_eliminated: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
