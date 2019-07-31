import FootballerScoreDetailElement from "./ElementScoreDetailElement";
import { LiveElementStats } from "./LiveElementStats";
import { Explains } from "./Explains";

export default interface LiveElement
{
    explain: Explains[];
    stats: LiveElementStats;
}


