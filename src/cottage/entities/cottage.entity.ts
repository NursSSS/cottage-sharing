import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateCottageDto } from "../dto";

@Entity()
export class CottageEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column()
    @ApiProperty()
    name: string
    
    @Column()
    @ApiProperty()
    floors: number

    @Column()
    @ApiProperty()
    sleepPlaces: number

    @Column({nullable: true})
    @ApiProperty()
    image: string

    @Column()
    @ApiProperty()
    pricePerPlace: number

    @Column({type: 'text', array: true, default:[]})
    @ApiProperty()
    menu: string[]

    @Column({default: 0})
    @ApiProperty()
    manager_id: number
}