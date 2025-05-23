import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('customer')
export class Customer {
    @PrimaryGeneratedColumn()
    id_customer: number;

    @Column({length : 15, nullable : false, unique : true})
    document_number : string

    @Column({length: 100, nullable:false})
    first_name : string
    
    @Column({length: 100, nullable:false})
    last_name : string
    
    @Column({type: 'boolean', nullable:false})
    gender : boolean

    @Column({length: 250, nullable:true})
    email : string

}
