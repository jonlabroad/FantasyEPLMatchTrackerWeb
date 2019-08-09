import Live from "../../data/fpl/Live";
import Entry from "../../data/fpl/Entry";
import Picks from "../../data/fpl/Picks";
import { MappedFixtures } from "../../data/MappedFixtures";
import LeaguesH2hStandings from "../../data/fpl/LeaguesH2hStandings";
import { ProcessedPlayers } from "../../data/ProcessedPlayers";

export default interface IFplClient {
    bootstrapStatic(): Promise<any>;
    event(eventId: number): Promise<any>;
    entryEvent(entryId: number, eventId: number): Promise<any>;
    entry(entryId: number): Promise<Entry>;
    picks(entryId: number, gameweek: number): Promise<Picks>;
    live(eventId: number): Promise<Live>;
    fixtures(eventId: number): Promise<MappedFixtures>;
    history(entryId: number): Promise<any>;
    leaguesH2hMatches(leagueId: number): Promise<any>;
    leaguesH2hStandings(leagueId: number): Promise<LeaguesH2hStandings>;

    processedPlayers(eventId: number): Promise<ProcessedPlayers>;
}