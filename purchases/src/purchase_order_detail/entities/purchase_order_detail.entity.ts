import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PurchaseOrderDetail {
  @PrimaryGeneratedColumn()
  id_purchase_order_detail: number;

  @Column({ type: 'int' })
  id_purchase_order: number;

  @Column({ type: 'int' })
  id_product: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 15, scale: 2 })
  subtotal: number;
}
