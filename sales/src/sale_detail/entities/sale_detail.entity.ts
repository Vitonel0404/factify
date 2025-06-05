import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sale_detail')
export class SaleDetail {
  @PrimaryGeneratedColumn()
  id_sale_detail: number;

  @Column()
  id_sale: number;

  @Column()
  id_product: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int'})
  quantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  subtotal: number;
}
