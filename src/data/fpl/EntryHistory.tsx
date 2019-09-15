export type MappedEntryHistory = {[key: number]: EntryHistory}

export default interface EntryHistory {
    current: {
        event: number
        points: number
        total_points: number
        rank: number
        rank_sort: number
        overall_rank: number
        bank: number
        value: number
        event_transfers: number
        event_transfers_cost: number
        points_on_bench: number
    }[];

    past: {
        season_name: string
        total_points: number
        rank: number
    }[];
}