export interface EventStatusElement {
    bonus_added: boolean,
    date: string,
    event: number,
    points: string // TODO
}

export default interface EventStatus {
    status: EventStatusElement[];
    leagues: string // TODO
}