import Picks from "../data/fpl/Picks";
import Live, { Lives } from "../data/fpl/Live";
import { Events } from "../data/state/Events";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import { MappedFixtures } from "../data/MappedFixtures";
import Entry from "../data/fpl/Entry";
import { MappedProcessedPlayers } from "../data/ProcessedPlayers";
import EventStatus from "../data/fpl/EventStatus";

export interface TrackerData {
    entries: {[key: number]: Entry}
    events: Events
    fixtures: MappedFixtures
    picks: {[key: string]: Picks}
    live: Lives
    bootstrapStatic?: BootstrapStatic,
    eventStatus?: EventStatus | undefined,
    processedPlayers?: MappedProcessedPlayers | undefined
}

export interface NavigationState {
    selectedTab: number,
    gameweek: number,
    teams: number[]
}

export interface TrackerState {
    data: TrackerData
    nav: NavigationState
}