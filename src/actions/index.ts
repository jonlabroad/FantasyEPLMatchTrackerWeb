import * as constants from '../constants';
import Picks from '../data/fpl/Picks';
import Live from '../data/fpl/Live';
import { BootstrapStatic } from '../data/fpl/BootstrapStatic';
import { MappedFixtures } from '../data/MappedFixtures';
import { ProcessedPlayers } from '../data/ProcessedPlayers';
import EventStatus from '../data/fpl/EventStatus';
import { LeagueFixtures } from '../data/LeagueFixtures';
import LeaguesH2hStandings from '../data/fpl/LeaguesH2hStandings';
import { ThunkDispatch } from 'redux-thunk';
import { TrackerState } from '../types';
import FplClient from '../services/fpl/FplClient';
import PicksHelper from '../util/PicksHelper';
import LeagueFixturesHelper from '../util/LeagueFixturesHelper';
import EntryHistory from '../data/fpl/EntryHistory';
import EntryHistoryHelper from '../util/EntryHistoryHelper';

export interface Test {
    type: constants.TEST;
}
export type TestAction = Test;
export function test(): Test {
    return {
        type: constants.TEST
    }
};

export interface SetGameweek {
    type: constants.SET_GAMEWEEK;
    gameweek: number;
}
export type SetGameweekAction = SetGameweek;
export function setGameweek(gameweek: number): SetGameweek {
    return {
        type: constants.SET_GAMEWEEK,
        gameweek: gameweek
    }
};

export interface SetTeams {
    type: constants.SET_TEAMS;
    teams: number[];
}
export type SetTeamsAction = SetTeams;
export function setTeams(teams: number[]): SetTeams {
    return {
        type: constants.SET_TEAMS,
        teams: teams
    }
};

export interface SetTeam {
    type: constants.SET_TEAM;
    team: number;
}
export type SetTeamAction = SetTeam;
export function setTeam(team: number): SetTeam {
    return {
        type: constants.SET_TEAM,
        team: team
    }
};

export interface SetLeague {
    type: constants.SET_LEAGUE;
    league: number;
}
export type SetLeagueAction = SetLeague;
export function setLeague(league: number): SetLeague {
    return {
        type: constants.SET_LEAGUE,
        league: league
    }
};

export interface SetDifferentials {
    type: constants.SET_DIFFERENTIALS;
    differentials: boolean;
}
export type SetDifferentialsAction = SetDifferentials;
export function setDifferentials(diff: boolean): SetDifferentials {
    return {
        type: constants.SET_DIFFERENTIALS,
        differentials: diff
    }
};

export interface ReceiveEventStatus {
    type: constants.RECEIVE_EVENT_STATUS;
    eventStatus: EventStatus;
}
export type ReceiveEventStatusAction = ReceiveEventStatus;
export function receiveEventStatus(status: EventStatus): ReceiveEventStatus {
    return {
        type: constants.RECEIVE_EVENT_STATUS,
        eventStatus: status
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

export interface ReceiveProcessedPlayers {
    type: constants.RECEIVE_PROCESSED_PLAYERS;
    gameweek: number;
    processedPlayers: ProcessedPlayers;
}
export type ReceiveProcessedPlayersAction = ReceiveProcessedPlayers;
export function receiveProcessedPlayers(gameweek: number, processedPlayers: ProcessedPlayers): ReceiveProcessedPlayers {
    return {
        type: constants.RECEIVE_PROCESSED_PLAYERS,
        gameweek: gameweek,
        processedPlayers: processedPlayers
    }
};

export interface ReceiveLeagueFixtures {
    type: constants.RECEIVE_LEAGUE_FIXTURES;
    fixtures: LeagueFixtures;
    leagueId: number;
}
export type ReceiveLeagueFixturesAction = ReceiveLeagueFixtures;
export function receiveLeagueFixtures(leagueId: number, fixtures: LeagueFixtures): ReceiveLeagueFixtures {
    return {
        type: constants.RECEIVE_LEAGUE_FIXTURES,
        leagueId: leagueId,
        fixtures: fixtures
    }
};

export interface ReceiveStandingsH2h {
    type: constants.RECEIVE_STANDINGS_H2H;
    standings: LeaguesH2hStandings;
    leagueId: number;
}
export type ReceiveStandingsH2hAction = ReceiveStandingsH2h;
export function receiveStandingsH2h(leagueId: number, standings: LeaguesH2hStandings): ReceiveStandingsH2h {
    return {
        type: constants.RECEIVE_STANDINGS_H2H,
        leagueId: leagueId,
        standings: standings
    }
};

export interface ReceiveEntryHistory {
    type: constants.RECEIVE_ENTRY_HISTORY;
    history: EntryHistory;
    entryId: number;
}
export type ReceiveEntryHistoryAction = ReceiveEntryHistory;
export function receiveEntryHistory(entryId: number, value: EntryHistory): ReceiveEntryHistory {
    return {
        type: constants.RECEIVE_ENTRY_HISTORY,
        entryId: entryId,
        history: value
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

export interface UpdateGameweekData {
    gameweek: number,
    team: number
}
export type UpdateGameweekDataAction = UpdateGameweekData;
export function updateGameweekData(gameweek?: number, team?: number, leagueId?: number): any {
    return async (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
        const state = getState() as TrackerState;

        gameweek = gameweek ? gameweek : state.nav.gameweek;
        team = team ? team : state.nav.team;
        leagueId = leagueId ? leagueId : state.nav.leagueId;

        const fplClient = new FplClient();

        if (leagueId) {
            const theLeagueId = leagueId;
            if (!state.data.mappedLeagueH2hStandings || !state.data.mappedLeagueH2hStandings[leagueId]) {
                fplClient.leaguesH2hStandings(leagueId).then(standings => 
                    dispatch(receiveStandingsH2h(theLeagueId, standings)));
            }
        }

        if (!state.data.bootstrapStatic) {
            fplClient.bootstrapStatic().then(bs => {
                dispatch(receiveBootstrapStatic(bs));
                dispatch(updateGameweekData(gameweek, team, leagueId));
            });
        }
        else if (gameweek) {
            // Check if the current event is a future event
            const currEvent = state.data.bootstrapStatic.events.find(ev => ev.is_current);
            if (currEvent && currEvent.id !== gameweek && !currEvent.finished) {
                const lastEvent = state.data.bootstrapStatic.events.find(ev => currEvent.is_previous);
                if (lastEvent) {
                    const teams = LeagueFixturesHelper.getTeams(team, lastEvent.id, leagueFixtures);
                    for (let teamId of teams) {
                        // Get the current event's pick lists
                        if (!PicksHelper.getPicks(teamId, lastEvent.id, state.data.picks)) {
                            const thisTeamId = teamId;
                            fplClient.picks(teamId, lastEvent.id).then(picks => {
                                if (picks) {
                                    dispatch(receivePicks(thisTeamId, lastEvent.id || 0, picks));
                                    dispatch(receivePicks(thisTeamId, gameweek || 0, picks));
                                }
                            });
                        }
                    }
                }
            }
        }

        if (gameweek) {
            if (!state.data.live || !state.data.live[gameweek]) {
                fplClient.live(gameweek).then(live => {
                    dispatch(receiveLive(gameweek || 0, live));
                });
            }

            var fixtures = state.data.fixtures[gameweek];
            if (!fixtures) {
                fplClient.fixtures().then(allFixtures => {
                    fixtures = allFixtures[gameweek || 0];
                    dispatch(receiveFixtures(allFixtures));    
                });
            }

            if (!state.data.processedPlayers || !state.data.processedPlayers[gameweek]) {
                fplClient.processedPlayers(gameweek).then(processedPlayers => 
                    dispatch(receiveProcessedPlayers(gameweek || 0, processedPlayers)));
            }
        }

        // No league fixtures for this league?
        var leagueFixtures = state.data.mappedLeagueFixtures ? state.data.mappedLeagueFixtures[leagueId] : undefined;
        if (!leagueFixtures) {
            leagueFixtures = await fplClient.leagueFixtures(leagueId);
            dispatch(receiveLeagueFixtures(leagueId, leagueFixtures));
            if (leagueFixtures) {
                dispatch(updateGameweekData(gameweek, team, leagueId));
            }
        }
        
        if (leagueFixtures && gameweek && state.data.bootstrapStatic) {
            // Get teams opponent from the league fixtures
            const teams = LeagueFixturesHelper.getTeams(team, gameweek, leagueFixtures);
            
            // Check if the current event is a future event
            let picksGameweek = gameweek;
            const currEvent = state.data.bootstrapStatic.events.find(ev => ev.is_current);
            if (currEvent && currEvent.id < gameweek) {
                picksGameweek = currEvent.id;
            }

            dispatch(setTeams(teams));
            for (var teamId of teams) {
                const thisTeamId = teamId;
                if (!state.data.entries[thisTeamId]) {
                    fplClient.entry(thisTeamId).then(entry => {
                        dispatch(receiveEntry(entry));
                    });
                }
                const teamPicks = PicksHelper.getPicks(thisTeamId, picksGameweek, state.data.picks);
                if (!teamPicks) {
                    fplClient.picks(thisTeamId, picksGameweek).then(picks => {
                        if (picks) {
                            dispatch(receivePicks(thisTeamId, gameweek || 0, picks));
                            dispatch(receivePicks(thisTeamId, picksGameweek || 0, picks));
                        }
                    });
                }
                else {
                    dispatch(receivePicks(thisTeamId, gameweek || 0, teamPicks));
                }

                const history = EntryHistoryHelper.getHistory(thisTeamId, state.data.history);
                if (!history) {
                    fplClient.history(thisTeamId).then(hist => {
                        if (hist) {
                            dispatch(receiveEntryHistory(thisTeamId, hist));
                        }
                    })
                }
            }
        }
    }
}

export type RootAction =
TestAction |
SetGameweek |
SetTeams |
SetTeam |
SetLeague |
SetDifferentials |
ReceiveBootstrapStatic |
ReceiveEntry |
ReceiveFixtures |
ReceivePicks |
ReceiveLive |
ReceiveEvent |
ReceiveProcessedPlayers |
ReceiveLeagueFixtures |
ReceiveStandingsH2h |
ReceiveEntryHistory |
TabSelect |
ReceiveEventStatus |
UpdateGameweekData
;
