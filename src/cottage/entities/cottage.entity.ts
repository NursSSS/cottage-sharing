import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateCottageDto } from "../dto";

@Entity()
export class CottageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    floors: number

    @Column()
    sleepPlaces: number

    @Column({nullable: true})
    image: string

    @Column()
    pricePerPlace: number

    @Column({type: 'text', array: true, default:[]})
    menu: string[]

    @Column({default: 0})
    manager_id: number
}