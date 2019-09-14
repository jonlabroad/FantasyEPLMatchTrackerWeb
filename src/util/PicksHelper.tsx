import Picks from "../data/fpl/Picks";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";

export default class PicksHelper {
    public static getPicks(entryId: number, gameweek: number, picksData: any): Picks | undefined {
        if (!picksData) {
            return undefined;
        }
        return picksData[`${entryId}_${gameweek}`];
    }

    public static getMatchPicks(team1: number, team2: number, gameweek: number, picksData: any): Picks[] {
        const picks = [];
        const picks1 = this.getPicks(team1, gameweek, picksData)
        if (picks1) {
            picks.push(picks1);
        }
        const picks2 = this.getPicks(team2, gameweek, picksData);
        if (picks2) {
            picks.push(picks2);
        }
        return picks;
    }

    public static getPicksGameweek(selectedGameweek: number, bootstrap?: BootstrapStatic) {
        if (!bootstrap) {
            return selectedGameweek;
        }

        let picksGameweek = selectedGameweek;
        const currEvent = bootstrap.events.find(ev => ev.is_current);
        if (currEvent && currEvent.id < selectedGameweek) {
            picksGameweek = currEvent.id;
        }
        return picksGameweek;
    }
}