import Picks from "../data/fpl/Picks";
import Live, { Lives } from "../data/fpl/Live";
import { Events } from "../data/state/Events";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import { MappedFixtures } from "../data/MappedFixtures";
import Entry from "../data/fpl/Entry";
import { MappedProcessedPlayers } from "../data/ProcessedPlayers";
import EventStatus from "../data/fpl/EventStatus";
import { MappedLeagueFixtures } from "../data/LeagueFixtures";
import LeaguesH2hStandings, { MappedLeaguesH2hStandings } from "../data/fpl/LeaguesH2hStandings";

export interface TrackerData {
    entries: {[key: number]: Entry}
    events: Events
    fixtures: MappedFixtures
    picks: {[key: string]: Picks}
    live: Lives
    bootstrapStatic?: BootstrapStatic,
    eventStatus?: EventStatus | undefined,
    processedPlayers?: MappedProcessedPlayers | undefined,
    mappedLeagueFixtures?: MappedLeagueFixtures | undefined,
    mappedLeagueH2hStandings: MappedLeaguesH2hStandings | undefined
}

export interface NavigationState {
    selectedTab: number,
    gameweek: number,
    leagueId: number,
    team: number,
    teams: number[],
    differentialsOnly: boolean
}

export interface TrackerState {
    data: TrackerData
    nav: NavigationState
}