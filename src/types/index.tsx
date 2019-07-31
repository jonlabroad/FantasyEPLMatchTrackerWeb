import Picks from "../data/fpl/Picks";
import Bootstrap from "../data/fpl/Bootstrap";
import Live from "../data/fpl/Live";

export interface TrackerData {
    entries: {[key: number]: any}
    picks: {[key: string]: Picks}
    live: {[key: number]: Live}
    bootstrap: Bootstrap | undefined
}

export interface NavigationState {
    selectedTab: number
}

export interface TrackerState {
    data: TrackerData
    nav: NavigationState
}