import H2hLeague from "./H2hLeague";
import ClassicLeague from "./ClassicLeague";
import Match from "./Match";

export default interface Leagues
{
    classic: ClassicLeague[];
    h2h: H2hLeague[];
    cup: Match[];
}
