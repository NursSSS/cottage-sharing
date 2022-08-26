import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Tariff } from "./tariff.enum";

@Entity()
export class ReserveEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column()
    @ApiProperty()
    cotagge_id: number

    @Column({type: 'date'})
    @ApiProperty()
    date_start: Date

    @Column({type: 'date'})
    @ApiProperty()
    date_end: Date

    @Column()
    @ApiProperty()
    price: number

    @Column({ type: 'enum', enum: Tariff, nullable: true})
    @ApiProperty()
    tariff: Tariff
    
    @Column()
    @ApiProperty()
    qnty_days: number

    @Column()
    @ApiProperty()
    places: number

    @Column({default: false})
    @ApiProperty()
    whole_cottage: boolean
}