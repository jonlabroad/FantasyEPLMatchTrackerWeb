import EntryHistory from "./EntryHistory";
import AutomaticSub from "./AutomaticSubs";
import Pick from "./Pick";

export default interface Picks
{
    active_chip: string;
    event: Event;
    picks: Pick[];
    entry_history: EntryHistory;
    automatic_subs: AutomaticSub[];
}
