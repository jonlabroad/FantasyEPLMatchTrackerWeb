import * as constants from '../constants';
import Picks from '../data/fpl/Picks';
import Bootstrap from '../data/fpl/Bootstrap';
import Live from '../data/fpl/Live';
import { BootstrapStatic } from '../data/fpl/BootstrapStatic';
import { MappedFixtures } from '../data/MappedFixtures';

export interface Test {
    type: constants.TEST;
}
export type TestAction = Test;
export function test(): Test {
    return {
        type: constants.TEST
    }
};

export interface ReceiveBootstrap {
    type: constants.RECEIVE_BOOTSTRAP;
    bootstrap: Bootstrap;
}
export type ReceiveBootstrapAction = ReceiveBootstrap;
export function receiveBootstrap(bootstrap: Bootstrap): ReceiveBootstrap {
    return {
        type: constants.RECEIVE_BOOTSTRAP,
        bootstrap: bootstrap
    }
};

export interface ReceiveBootstrapStatic {
    type: constants.RECEIVE_BOOTSTRAPSTATIC;
    bootstrapStatic: BootstrapStatic;
}
export type ReceiveBootstrapStaticAction = ReceiveBootstrapStatic;
export function receiveBootstrapStatic(bootstrapStatic: BootstrapStatic): ReceiveBootstrapStatic {
    return {
        type: constants.RECEIVE_BOOTSTRAPSTATIC,
        bootstrapStatic: bootstrapStatic
    }
};

export interface ReceiveEntry {
    type: constants.RECEIVE_ENTRY;
    entry: any;
}
export type ReceiveEntryAction = ReceiveEntry;
export function receiveEntry(entry: any): ReceiveEntry {
    return {
        type: constants.RECEIVE_ENTRY,
        entry: entry
    }
};

export interface ReceiveFixtures {
    type: constants.RECEIVE_FIXTURES;
    mappedFixtures: MappedFixtures;
}
export type ReceiveFixturesAction = ReceiveFixtures;
export function receiveFixtures(fixtures: MappedFixtures): ReceiveFixtures {
    return {
        type: constants.RECEIVE_FIXTURES,
        mappedFixtures: fixtures
    }
};

export interface ReceivePicks {
    type: constants.RECEIVE_PICKS;
    entryId: number;
    gameweek: number;
    picks: Picks;
}
export type ReceivePicksAction = ReceivePicks;
export function receivePicks(entryId: number, gameweek: number, picks: Picks): ReceivePicks {
    return {
        type: constants.RECEIVE_PICKS,
        entryId: entryId,
        gameweek: gameweek,
        picks: picks
    }
};

export interface ReceiveLive {
    type: constants.RECEIVE_LIVE;
    gameweek: number;
    live: Live;
}
export type ReceiveLiveAction = ReceiveLive;
export function receiveLive(gameweek: number, live: Live): ReceiveLive {
    return {
        type: constants.RECEIVE_LIVE,
        gameweek: gameweek,
        live: live
    }
};

export interface ReceiveEvent {
    type: constants.RECEIVE_EVENT;
    gameweek: number;
    event: Event;
}
export type ReceiveEventAction = ReceiveEvent;
export function receiveEvent(gameweek: number, event: Event): ReceiveEvent {
    return {
        type: constants.RECEIVE_EVENT,
        gameweek: gameweek,
        event: event
    }
};

export interface TabSelect {
    type: constants.TAB_SELECT;
    index: number;
}
export type TabSelectAction = TabSelect;
export function tabSelect(index: number): TabSelect {
    return {
        type: constants.TAB_SELECT,
        index: index
    }
};

export type RootAction =
TestAction |
ReceiveBootstrap |
ReceiveBootstrapStatic |
ReceiveEntry |
ReceiveFixtures |
ReceivePicks |
ReceiveLive |
ReceiveEvent |
TabSelect
;
