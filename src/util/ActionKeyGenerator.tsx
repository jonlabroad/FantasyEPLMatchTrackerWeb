import { RECEIVE_PICKS, RECEIVE_GAMEWEEK_TIMELINE, RECEIVE_FIXTURES, RECEIVE_ENTRY, RECEIVE_ENTRY_HISTORY, RECEIVE_PROCESSED_PLAYERS, RECEIVE_LIVE, RECEIVE_STANDINGS_H2H } from "../constants";

export default class ActionKeyGenerator {
    public static receivePicks(gameweek: number, entryId: number): string {
        return JSON.stringify([RECEIVE_PICKS, gameweek, entryId]);
    }

    public static receiveTimeline(gameweek: number): string {
        return JSON.stringify([RECEIVE_GAMEWEEK_TIMELINE, gameweek]);
    }

    public static receiveFixtures(): string {
        return JSON.stringify([RECEIVE_FIXTURES]);
    }

    public static receiveEntry(entryId: number): string {
        return JSON.stringify([RECEIVE_ENTRY, entryId]);
    }

    public static receiveHistory(entryId: number): string {
        return JSON.stringify([RECEIVE_ENTRY_HISTORY, entryId]);
    }

    public static receiveProcessedPlayers(gameweek: number): string {
        return JSON.stringify([RECEIVE_PROCESSED_PLAYERS, gameweek]);
    }

    public static receiveLive(gameweek: number): string {
        return JSON.stringify([RECEIVE_LIVE, gameweek]);
    }

    public static receiveStandingsH2h(gameweek: number): string {
        return JSON.stringify([RECEIVE_STANDINGS_H2H, gameweek]);
    }
}