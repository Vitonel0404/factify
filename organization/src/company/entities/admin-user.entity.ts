import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('admin_user')
export class AdminUser {
    @PrimaryGeneratedColumn()
    id_admin_user: number;

    @Column({ type: 'varchar', length: 150, unique: true })
    user_name: string;

    @Column({ type: 'varchar', length: 250 })
    name: string;

    @Column({ type: 'varchar', length: 250 })
    last_name: string;

    @Column({ type: 'varchar', length: 150, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 250, })
    password: string;

    @Column({ default: 'admin' })
    role: string;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
