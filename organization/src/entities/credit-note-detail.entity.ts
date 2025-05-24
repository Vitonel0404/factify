import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CreditNoteDetail {
  @PrimaryGeneratedColumn()
  id_credit_note_detail: number;

  @Column()
  id_credit_note: number;

  @Column()
  id_product: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 15, scale: 2 })
  subtotal: number;
}
