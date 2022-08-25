import { UserRole } from "../entities/role.enum"


export class CreateUserDto {
    phoneNumber: string
    password: string
    name: string
    roles?: UserRole
}