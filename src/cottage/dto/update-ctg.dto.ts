export class UpdateCottageDto{
    id: number
    name?: string
    floors?: number
    sleepPlaces?: number
    image?: string
    price?: number
    menu?: string[]
    manager_id: number
}