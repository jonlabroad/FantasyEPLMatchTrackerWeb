export default interface PicksEntryHistory
{
    id: number;
    movement: string;
    points: number;
    total_points: number;
    rank: number;
    rank_sort: number;
    overall_rank: number;
    event_transfers: number;
    event_transfers_cost: number;
    value: number;
    points_on_bench: number;
    bank: number;
    entry: number;

    eventId: number;
}
