import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('certificate')
export class Certificate {
    @PrimaryGeneratedColumn({ type: 'int' })
    id_certificate: number;

    @Column({ type: 'varchar', length: 250 })
    filename: string;

    @Column({ type: 'varchar', length: 250 })
    filename_url: string;

    @Column({ type: 'varchar', length: 250 })
    password: string;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
