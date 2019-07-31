import Picks from "../data/fpl/Picks";

export default class PicksHelper {
    public static getPicks(entryId: number, gameweek: number, picksData: any): Picks | undefined {
        if (!picksData) {
            return undefined;
        }
        console.log({lookup: `${entryId}_${gameweek}`})
        return picksData[`${entryId}_${gameweek}`];
    }
}