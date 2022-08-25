import { UserRole } from "../entities/role.enum"

export class CreateManagerDto {
    phoneNumber: string
    password: string
    name: string
    roles?: UserRole
}