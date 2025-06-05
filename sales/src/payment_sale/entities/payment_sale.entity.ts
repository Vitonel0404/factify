import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sale_payment')
export class PaymentSale {
  @PrimaryGeneratedColumn()
  id_sale_payment: number;

  @Column()
  id_sale: number;

  @Column()
  id_payment_method: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;
}
