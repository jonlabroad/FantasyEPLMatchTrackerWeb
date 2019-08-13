import Leagues from "./Leagues";

export default interface Entry
{
    id: number;
    joined_time: string;
    started_event: number;
    favourite_team: number;
    player_first_name: string;
    player_last_name: string;
    player_region_id: number;
    player_region_name: string;
    player_region_short_iso: string;
    player_region_short_long: string;
    summary_overall_points: number;
    summary_overall_rank: number;
    summary_event_points: number;
    summary_event_rank: number;
    joined_seconds: number;
    current_event: number;
    name: string;
    kit: string;
    leagues: Leagues;
}
