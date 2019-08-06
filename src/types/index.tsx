import Picks from "../data/fpl/Picks";
import Bootstrap from "../data/fpl/Bootstrap";
import Live, { Lives } from "../data/fpl/Live";
import { Events } from "../data/state/Events";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import { MappedFixtures } from "../data/MappedFixtures";
import Entry from "../data/fpl/Entry";
import { MappedProcessedPlayers } from "../data/ProcessedPlayers";

export interface TrackerData {
    entries: {[key: number]: Entry}
    events: Events
    fixtures: MappedFixtures
    picks: {[key: string]: Picks}
    live: Lives
    bootstrap: Bootstrap | undefined
    bootstrapStatic?: BootstrapStatic,
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