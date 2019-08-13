export default interface H2hLeague
{
    id: number,
    name: string,
    short_name: string,
    created: string,
    closed: boolean,
    //rank: null,
    //max_entries: null,
    league_type: string,
    scoring: string,
    admin_entry: number,
    start_event: number,
    entry_rank: number,
    entry_last_rank: number,
    entry_can_leave: boolean,
    entry_can_admin: boolean,
    entry_can_invite: boolean
}
