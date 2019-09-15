import PicksEntryHistory from "./PicksEntryHistory";
import AutomaticSub from "./AutomaticSubs";
import Pick from "./Pick";

export default interface Picks
{
    active_chip: string;
    picks: Pick[];
    entry_history: PicksEntryHistory;
    automatic_subs: AutomaticSub[];
}
