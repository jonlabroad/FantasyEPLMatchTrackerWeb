export default interface Match
{
    id: number;
    entry_1_entry : number;
    entry_1_name: string;
    entry_1_player_name: string;
    entry_2_entry: number;
    entry_2_name: string;
    entry_2_player_name: string;
    is_knockout: boolean;
    //winner: null,
    //tiebreak: null,
    own_entry: boolean;
    entry_1_points: number;
    entry_1_win: number;
    entry_1_draw: number;
    entry_1_loss: number;
    entry_2_points: number;
    entry_2_win: number;
    entry_2_draw: number;
    entry_2_loss: number;
    entry_1_total: number;
    entry_2_total: number;
    //seed_value: null,
    eventId: number;
}
