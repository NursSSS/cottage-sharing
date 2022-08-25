import { UserRole } from "src/users/entities/role.enum"



export class GenerateTokenDto {
    id?: number
    name: string
    roles: UserRole
}