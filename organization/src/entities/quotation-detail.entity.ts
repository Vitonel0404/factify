import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class QuotationDetail {
  @PrimaryGeneratedColumn()
  id_quotation_detail: number;

  @Column()
  id_quotation: number;

  @Column()
  id_product: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 15, scale: 2 })
  subtotal: number;
}
