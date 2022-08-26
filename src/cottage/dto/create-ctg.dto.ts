import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateCottageDto{
    @ApiProperty()
    name: string

    @ApiProperty()
    floors: number

    @ApiProperty()
    sleepPlaces: number

    @ApiProperty()
    image: string

    @ApiProperty()
    price: number

    @ApiPropertyOptional()
    menu: string[]
    
    @ApiPropertyOptional()
    manager_id: number
}