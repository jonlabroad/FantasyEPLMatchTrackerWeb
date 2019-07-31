import { TrackerState } from "../types";
import { TEST, RECEIVE_ENTRY, TAB_SELECT, RECEIVE_PICKS, RECEIVE_BOOTSTRAP, RECEIVE_LIVE } from "../constants";
import { Reducer } from "redux";

export const initialState: TrackerState = {
    data: {
        entries: {},
        picks: {},
        live: {},
        bootstrap: undefined
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
    switch (action.type) {
        case RECEIVE_BOOTSTRAP:
            return { ...state, data: { ...state.data, bootstrap: action.bootstrap }};
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
        case TAB_SELECT:
            return { ...state, nav: {...state.nav, selectedTab: action.index } };
        case TEST:
            return { ...state };
        default:
            console.log(`Don't know how to process ${action.type}`)
    }
    return state;
}