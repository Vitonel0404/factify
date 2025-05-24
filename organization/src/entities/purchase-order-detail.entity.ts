import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PurchaseOrderDetail {
  @PrimaryGeneratedColumn()
  id_purchase_order_detail: number;

  @Column()
  id_purchase_order: number;

  @Column()
  id_product: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 15, scale: 2 })
  subtotal: number;
}
