import { Tariff } from "../entities"

export class CreateReserveDto{
    tariff: Tariff
    cotagge_id: number
    date_start: Date
    date_end?: Date
    qnty_days: number
    places?: number
    price?: number
    whole_cottage?: boolean
}