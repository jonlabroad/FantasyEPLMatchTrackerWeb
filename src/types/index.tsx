import Picks from "../data/fpl/Picks";
import Bootstrap from "../data/fpl/Bootstrap";
import Live, { Lives } from "../data/fpl/Live";
import { Events } from "../data/state/Events";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import { MappedFixtures } from "../data/MappedFixtures";

export interface TrackerData {
    entries: {[key: number]: any}
    events: Events
    fixtures: MappedFixtures
    picks: {[key: string]: Picks}
    live: Lives
    bootstrap: Bootstrap | undefined
    bootstrapStatic?: BootstrapStatic
}

export interface NavigationState {
    selectedTab: number
}

export interface TrackerState {
    data: TrackerData
    nav: NavigationState
}