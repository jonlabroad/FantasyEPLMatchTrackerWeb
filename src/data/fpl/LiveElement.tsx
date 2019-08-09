import FootballerScoreDetailElement from "./ElementScoreDetailElement";
import { LiveElementStats } from "./LiveElementStats";
import { Explain } from "./Explain";

export default interface LiveElement
{
    id: number;
    explain: Explain[];
    stats: LiveElementStats;
}


