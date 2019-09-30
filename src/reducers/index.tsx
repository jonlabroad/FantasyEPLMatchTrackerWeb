import { TrackerState } from "../types";
import { TEST, RECEIVE_ENTRY, TAB_SELECT, RECEIVE_PICKS, RECEIVE_LIVE, RECEIVE_EVENT, RECEIVE_BOOTSTRAPSTATIC, RECEIVE_FIXTURES, SET_GAMEWEEK, SET_TEAMS, RECEIVE_PROCESSED_PLAYERS, RECEIVE_LEAGUE_FIXTURES, SET_TEAM, RECEIVE_STANDINGS_H2H, SET_LEAGUE, SET_DIFFERENTIALS, RECEIVE_ENTRY_HISTORY, RECEIVE_GAMEWEEK_TIMELINE, API_REQUEST_IN_PROGRESS, DRAWER_OPEN_CLOSE } from "../constants";
import { Reducer, AnyAction } from "redux";
import Url from "../util/Url";
import { ReceiveLeagueFixturesAction, ReceiveStandingsH2h, ReceiveStandingsH2hAction, ReceiveEntryHistoryAction, ReceiveGameweekTimeline, ReceiveGameweekTimelineAction, ReceivePicksAction, ReceivePicks, ReceiveEntryAction, ReceiveProcessedPlayers, ReceiveProcessedPlayersAction, ReceiveLiveAction, DrawerOpenCloseAction } from "../actions";
import ActionKeyGenerator from "../util/ActionKeyGenerator";

export const initialState: TrackerState = {
    data: {
        entries: {},
        picks: {},
        live: {},
        events: {},
        bootstrapStatic: undefined,
        fixtures: {},
        processedPlayers: {},
        mappedLeagueH2hStandings: {},
        history: {},
        mappedGameweekTimelines: {},

        actionsInProgress: new Set<string>()
    },
    nav: {
        selectedTab: 0,
        gameweek: parseInt(Url.getGameweek() || "1"),
        team: Url.getTeam() || 55385,
        teams: Url.getTeams() || [55385, 55385],
        leagueId: 22356,
        differentialsOnly: false,
        drawerOpen: false
    }
};

export const isRequestInProgress = (state: TrackerState, key: string): boolean => {
    console.log({key: key, inProgress: state.data.actionsInProgress.has(key)});
    return state.data.actionsInProgress.has(key);
}

export const removeActionInProgress = (state: TrackerState, key: string) => {
    // Remove this once you see that it's working
    if (!state.data.actionsInProgress.has(key)) {
        console.error(`Cannot find action ${key} in set`);
    }
    else {
        console.log(`Clearing ${key}`);
        state.data.actionsInProgress.delete(key);
    }
}

export const trackerReducer: Reducer<TrackerState> = (state = initialState, action) => {
    if (!state) {
        state = initialState;
    }
    switch (action.type) {
        case API_REQUEST_IN_PROGRESS:
            const newState = { ...state, data: { ...state.data, actionsInProgress: new Set<string>(state.data.actionsInProgress).add(action.key) }}
            return newState;
        case SET_GAMEWEEK:
            Url.set(action.gameweek, state.nav.team, state.nav.leagueId, state.nav.differentialsOnly, state.nav.selectedTab);
            return { ...state, nav: { ...state.nav, teams: [state.nav.team], gameweek: action.gameweek }};
        case SET_TEAM:
            Url.set(state.nav.gameweek, action.team, state.nav.leagueId, state.nav.differentialsOnly, state.nav.selectedTab);
            return { ...state, nav: { ...state.nav, team: action.team }};
        case SET_LEAGUE:
            Url.set(state.nav.gameweek, state.nav.team, action.league, state.nav.differentialsOnly, state.nav.selectedTab);
            return { ...state, nav: { ...state.nav, teams: [state.nav.team], leagueId: action.league }};
        case SET_DIFFERENTIALS:
            Url.set(state.nav.gameweek, state.nav.team, state.nav.leagueId, action.differentials, state.nav.selectedTab);
            return { ...state, nav: { ...state.nav, differentialsOnly: action.differentials }};
        case SET_TEAMS:
            return { ...state, nav: { ...state.nav, teams: action.teams }};
        case DRAWER_OPEN_CLOSE:
            const typedAction = action as DrawerOpenCloseAction;
            return { ...state, nav: { ...state.nav,  drawerOpen: typedAction.open}};
        case RECEIVE_BOOTSTRAPSTATIC:
                return { ...state, data: { ...state.data, bootstrapStatic: action.bootstrapStatic }};
        case RECEIVE_ENTRY:
            {
                const typedAction = action as ReceiveEntryAction;
                let newState = { ...state, data: { ...state.data, entries: { ...state.data.entries } } };
                newState.data.entries[typedAction.entry.id] = action.entry;
                removeActionInProgress(newState, ActionKeyGenerator.receiveEntry(typedAction.entry.id));
                return newState;
            }
        case RECEIVE_PICKS:
            {
                const typedAction = action as ReceivePicksAction;
                let newState = { ...state, data: { ...state.data, picks: { ...state.data.picks } } };
                newState.data.picks[`${typedAction.entryId}_${typedAction.gameweek}`] = action.picks;
                removeActionInProgress(newState, ActionKeyGenerator.receivePicks(typedAction.gameweek, typedAction.entryId));
                return newState;
            }
        case RECEIVE_LIVE:
            {
                const typedAction = action as ReceiveLiveAction;
                let newState = { ...state, data: { ...state.data, live: { ...state.data.live } } };
                newState.data.live[action.gameweek] = action.live;
                removeActionInProgress(newState, ActionKeyGenerator.receiveLive(typedAction.gameweek));
                return newState;
            }
        case RECEIVE_EVENT:
            {
                let newState = { ...state, data: { ...state.data, events: { ...state.data.events } } };
                newState.data.events[action.gameweek] = action.event;
                return newState;
            }
        case RECEIVE_FIXTURES:
            {
                let newState = { ...state, data: { ...state.data, fixtures: { ...state.data.fixtures, ...action.mappedFixtures } } };
                removeActionInProgress(newState, ActionKeyGenerator.receiveFixtures());
                return newState;
            }
        case RECEIVE_PROCESSED_PLAYERS:
            {
                const typedAction = action as ReceiveProcessedPlayersAction;
                let newState = { ...state, data: { ...state.data, processedPlayers: { ...state.data.processedPlayers, ...{[action.gameweek]: action.processedPlayers} }}};
                removeActionInProgress(newState, ActionKeyGenerator.receiveProcessedPlayers(typedAction.gameweek));
                return newState;
            }
        case RECEIVE_LEAGUE_FIXTURES:
            {
                const typedAction = action as ReceiveLeagueFixturesAction;
                let newState = { ...state, data: { ...state.data, mappedLeagueFixtures: { ...state.data.mappedLeagueFixtures, ...{ [typedAction.leagueId]: typedAction.fixtures } } } };
                return newState;
            }
        case RECEIVE_STANDINGS_H2H:
            {
                const typedAction = action as ReceiveStandingsH2hAction;
                let newState = { ...state, data: { ...state.data, mappedLeagueH2hStandings: { ...state.data.mappedLeagueH2hStandings, ...{ [typedAction.leagueId]: typedAction.standings } } } } as TrackerState;
                removeActionInProgress(newState, ActionKeyGenerator.receiveStandingsH2h(typedAction.leagueId));
                return newState;
            }
        case RECEIVE_ENTRY_HISTORY:
            {
                const typedAction = action as ReceiveEntryHistoryAction;
                let newState = { ...state, data: { ...state.data, history: { ...state.data.history } } };
                newState.data.history[typedAction.entryId] = typedAction.history;
                removeActionInProgress(newState, ActionKeyGenerator.receiveHistory(typedAction.entryId));
                return newState;
            }
        case RECEIVE_GAMEWEEK_TIMELINE:
            {
                const typedAction = action as ReceiveGameweekTimelineAction;
                let newState = { ...state, data: { ...state.data, mappedGameweekTimelines: { ...state.data.mappedGameweekTimelines } } };
                newState.data.mappedGameweekTimelines[typedAction.gameweek] = typedAction.value;
                removeActionInProgress(newState, ActionKeyGenerator.receiveTimeline(typedAction.gameweek));
                return newState;
            }
        case TAB_SELECT:
            Url.set(state.nav.gameweek, state.nav.team, state.nav.leagueId, state.nav.differentialsOnly, action.index);
            return { ...state, nav: {...state.nav, selectedTab: action.index } };
        case TEST:
            return { ...state };
        default:
            console.log(`Don't know how to process ${action.type}`)
    }
    return state;
}
