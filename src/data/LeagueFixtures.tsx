export type MappedLeagueFixtures = {[key: number]: LeagueFixtures};

export interface LeagueFixture {
    id: number;
    entry_1_entry: number;
    entry_1_name: string;
    entry_1_player_name: string;
    entry_1_points: number;
    entry_1_win: number;
    entry_1_draw: number;
    entry_1_loss: number;
    entry_1_total: number;
    entry_2_entry?: number;
    entry_2_name: string;
    entry_2_player_name: string;
    entry_2_points: number;
    entry_2_win: number;
    entry_2_draw: number;
    entry_2_loss: number;
    entry_2_total: number;
    is_knockout: boolean;
    winner?: any;
    own_entry: boolean;
    seed_value?: any;
    event: number;
    tiebreak?: any;
}

export type LeagueFixtures = { [key: number]: LeagueFixture[] };
