export type MappedLeaguesH2hStandings = {[key: number]: LeaguesH2hStandings};

export interface League {
    id: number;
    name: string;
    created: Date;
    closed: boolean;
    max_entries?: any;
    league_type: string;
    scoring: string;
    admin_entry: number;
    start_event: number;
    code_privacy: string;
    ko_rounds?: any;
}

export interface StandingsEntry {
    id: number;
    division: number;
    entry: number;
    entry_name: string;
    joined_time: Date;
    player_first_name: string;
    player_last_name: string;
    last_rank: number;
    matches_lost: number;
    matches_drawn: number;
    matches_played: number;
    matches_won: number;
    player_name: string;
    points_for: number;
    rank: number;
    rank_sort: number;
    total: number;
}

export interface Standings {
    has_next: boolean;
    page: number;
    results: StandingsEntry[];
}

export default interface LeaguesH2hStandings {
    league: League;
    new_entries: Standings;
    standings: Standings;
}
