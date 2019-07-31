import { TrackerState } from "../types";
import { TEST, RECEIVE_ENTRY, TAB_SELECT, RECEIVE_PICKS, RECEIVE_BOOTSTRAP, RECEIVE_LIVE, RECEIVE_EVENT, RECEIVE_BOOTSTRAPSTATIC, RECEIVE_FIXTURES } from "../constants";
import { Reducer } from "redux";

export const initialState: TrackerState = {
    data: {
        entries: {},
        picks: {},
        live: {},
        events: {},
        bootstrap: undefined,
        fixtures: {}
    },
    nav: {
        selectedTab: 0
    }
};

export const trackerReducer: Reducer<TrackerState> = (state = initialState, action) => {
    console.log({action: action});
    if (!state) {
        state = initialState;
    }
    console.log(action.type);
    switch (action.type) {
        case RECEIVE_BOOTSTRAP:
            return { ...state, data: { ...state.data, bootstrap: action.bootstrap }};
        case RECEIVE_BOOTSTRAPSTATIC:
                return { ...state, data: { ...state.data, bootstrapStatic: action.bootstrapStatic }};
        case RECEIVE_ENTRY:
            {
                let newState = { ...state, data: { ...state.data, entries: { ...state.data.entries } } };
                newState.data.entries[action.entry.entry.id] = action.entry;
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
        case TAB_SELECT:
            return { ...state, nav: {...state.nav, selectedTab: action.index } };
        case TEST:
            return { ...state };
        default:
            console.log(`Don't know how to process ${action.type}`)
    }
    return state;
}