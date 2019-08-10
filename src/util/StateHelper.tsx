import FplClient from "../services/fpl/FplClient";

export default class StateHelper {
    static async requestLeagueFixtures(leagueId: number) {
        return await new FplClient().leagueFixtures(leagueId);
    }

    static async requestPicks(entryId: number, gameweek: number) {
        return await new FplClient().picks(entryId, gameweek);
    }

    static async requestLive(gameweek: number) {
        return await new FplClient().live(gameweek);
    }
}