import { TrackerState } from "../types";
import { TEST, RECEIVE_ENTRY, TAB_SELECT, RECEIVE_PICKS, RECEIVE_LIVE, RECEIVE_EVENT, RECEIVE_BOOTSTRAPSTATIC, RECEIVE_FIXTURES, SET_GAMEWEEK, SET_TEAMS, RECEIVE_PROCESSED_PLAYERS, RECEIVE_LEAGUE_FIXTURES, SET_TEAM } from "../constants";
import { Reducer } from "redux";
import Url from "../util/Url";
import { ReceiveLeagueFixturesAction } from "../actions";

export const initialState: TrackerState = {
    data: {
        entries: {},
        picks: {},
        live: {},
        events: {},
        bootstrapStatic: undefined,
        fixtures: {},
        processedPlayers: {}
    },
    nav: {
        selectedTab: 0,
        gameweek: 1,
        team: 55385,
        teams: [55385, 55385],
        leagueId: 22356
    }
};

export const trackerReducer: Reducer<TrackerState> = (state = initialState, action) => {
    if (!state) {
        state = initialState;
    }
    switch (action.type) {
        case SET_GAMEWEEK:
            Url.set(action.gameweek, state.nav.team);
            return { ...state, nav: { ...state.nav, gameweek: action.gameweek }};
        case SET_TEAM:
            return { ...state, nav: { ...state.nav, team: action.team }};
        case SET_TEAMS:
            return { ...state, nav: { ...state.nav, teams: action.teams }};
        case RECEIVE_BOOTSTRAPSTATIC:
                return { ...state, data: { ...state.data, bootstrapStatic: action.bootstrapStatic }};
        case RECEIVE_ENTRY:
            {
                let newState = { ...state, data: { ...state.data, entries: { ...state.data.entries } } };
                newState.data.entries[action.entry.id] = action.entry;
                return newState;
            }
        case RECEIVE_PICKS:
            {
                let newState = { ...state, data: { ...state.data, picks: { ...state.data.picks } } };
                newState.data.picks[`${action.entryId}_${action.gameweek}`] = action.picks;
                return newState;
            }
        case RECEIVE_LIVE:
            {
                let newState = { ...state, data: { ...state.data, live: { ...state.data.live } } };
                newState.data.live[action.gameweek] = action.live;
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
                return newState;
            }
        case RECEIVE_PROCESSED_PLAYERS:
            {
                let newState = { ...state, data: { ...state.data, processedPlayers: { ...state.data.processedPlayers, ...{[action.gameweek]: action.processedPlayers} }}};
                return newState;
            }
        case RECEIVE_LEAGUE_FIXTURES:
            {
                const typedAction = action as ReceiveLeagueFixturesAction;
                let newState = { ...state, data: { ...state.data, mappedLeagueFixtures: { ...state.data.mappedLeagueFixtures, ...{[typedAction.leagueId]: typedAction.fixtures} }}};
                return newState;
            }
        case TAB_SELECT:
            return { ...state, nav: {...state.nav, selectedTab: action.index } };
        case TEST:
            return { ...state };
        default:
            console.log(`Don't know how to process ${action.type}`)
    }
    return state;
}