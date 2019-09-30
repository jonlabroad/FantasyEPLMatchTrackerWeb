import Picks from "../data/fpl/Picks";
import { Lives } from "../data/fpl/Live";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import { MappedFixtures } from "../data/MappedFixtures";
import Entry from "../data/fpl/Entry";
import { MappedProcessedPlayers } from "../data/ProcessedPlayers";
import EventStatus from "../data/fpl/EventStatus";
import { MappedLeagueFixtures } from "../data/LeagueFixtures";
import { MappedLeaguesH2hStandings } from "../data/fpl/LeaguesH2hStandings";
import { MappedEntryHistory } from "../data/fpl/EntryHistory";
import { MappedGameweekTimelines } from "../data/GameweekTimeline";
import { MappedMatchEvents } from "../data/state/MatchEvents";

export interface TrackerData {
    entries: {[key: number]: Entry}
    events: MappedMatchEvents
    fixtures: MappedFixtures
    picks: {[key: string]: Picks}
    live: Lives
    history: MappedEntryHistory,
    bootstrapStatic?: BootstrapStatic,
    eventStatus?: EventStatus | undefined,
    processedPlayers?: MappedProcessedPlayers | undefined,
    mappedLeagueFixtures?: MappedLeagueFixtures | undefined,
    mappedLeagueH2hStandings: MappedLeaguesH2hStandings | undefined,
    mappedGameweekTimelines: MappedGameweekTimelines,

    actionsInProgress: Set<string>
}

export interface NavigationState {
    selectedTab: number,
    gameweek: number,
    leagueId: number,
    team: number,
    teams: number[],
    differentialsOnly: boolean,
    drawerOpen: boolean
}

export interface TrackerState {
    data: TrackerData
    nav: NavigationState
}