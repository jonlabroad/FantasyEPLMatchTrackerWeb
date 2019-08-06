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

export interface Result {
    entry: number;
    entry_name: string;
    joined_time: Date;
    player_first_name: string;
    player_last_name: string;
}

export interface NewEntries {
    has_next: boolean;
    page: number;
    results: Result[];
}

export interface Standings {
    has_next: boolean;
    page: number;
    results: any[];
}

export default interface LeaguesH2hStandings {
    league: League;
    new_entries: NewEntries;
    standings: Standings;
}
