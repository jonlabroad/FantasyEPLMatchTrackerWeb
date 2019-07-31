export default interface Entry
{
    id: number;
    player_first_name: string;
    player_last_name: string;
    player_region_id: number;
    player_region_name: string;
    player_region_short_iso: string;
    summary_overall_points: number;
    summary_overall_rank: number;
    summary_event_points: number;
    summary_event_rank: number;
    joined_seconds: number;
    current_event: number;
    total_transfers: number;
    total_loans: number;
    total_loans_active: number;
    transfers_or_loans: string;
    deleted: boolean;
    email: boolean;
    joined_time: string;
    name: string;
    bank: number;
    value: number;
    kit: string;
    event_transfers: number;
    event_transfers_cost: number;
    extra_free_transfers: number;
    favourite_team: number;
    started_event: number;
    player: number;
}
