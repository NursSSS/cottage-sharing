import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { UserRole } from "../entities/role.enum"

export class CreateManagerDto {
    @ApiProperty()
    phoneNumber: string

    @ApiPropertyOptional()
    password?: string

    @ApiProperty()
    name: string

    @ApiPropertyOptional()
    roles?: UserRole
}