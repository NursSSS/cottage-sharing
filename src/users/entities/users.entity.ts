import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../interface";
import { UserRole } from "./role.enum";

@Entity()
export class UsersEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    phoneNumber: string

    @Column()
    password: string

    @Column()
    name: string

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    roles: UserRole
}