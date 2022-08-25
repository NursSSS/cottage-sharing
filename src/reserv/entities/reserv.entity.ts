import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Tariff } from "./tariff.enum";

@Entity()
export class ReserveEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cotagge_id: number

    @Column({type: 'date'})
    date_start: Date

    @Column({type: 'date'})
    date_end: Date

    @Column()
    price: number

    @Column()
    tariff: Tariff
    
    @Column()
    qnty_days: number

    @Column()
    places: number

    @Column({default: false})
    whole_cottage: boolean
}