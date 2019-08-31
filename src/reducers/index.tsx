import { TrackerState } from "../types";
import { TEST, RECEIVE_ENTRY, TAB_SELECT, RECEIVE_PICKS, RECEIVE_LIVE, RECEIVE_EVENT, RECEIVE_BOOTSTRAPSTATIC, RECEIVE_FIXTURES, SET_GAMEWEEK, SET_TEAMS, RECEIVE_PROCESSED_PLAYERS, RECEIVE_LEAGUE_FIXTURES, SET_TEAM, RECEIVE_STANDINGS_H2H, SET_LEAGUE } from "../constants";
import { Reducer } from "redux";
import Url from "../util/Url";
import { ReceiveLeagueFixturesAction, ReceiveStandingsH2h, ReceiveStandingsH2hAction } from "../actions";

export const initialState: TrackerState = {
    data: {
        entries: {},
        picks: {},
        live: {},
        events: {},
        bootstrapStatic: undefined,
        fixtures: {},
        processedPlayers: {},
        mappedLeagueH2hStandings: {}
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
            Url.set(action.gameweek, state.nav.team, state.nav.leagueId);
            return { ...state, nav: { ...state.nav, teams: [state.nav.team], gameweek: action.gameweek }};
        case SET_TEAM:
            Url.set(state.nav.gameweek, action.team, state.nav.leagueId);
            return { ...state, nav: { ...state.nav, team: action.team }};
        case SET_LEAGUE:
            Url.set(state.nav.gameweek, state.nav.team, action.league);
            return { ...state, nav: { ...state.nav, teams: [state.nav.team], leagueId: action.league }};
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
                console.log({processedState: newState});
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