import React from "react";
import { TrackerState } from "../types";
import { Dispatch, Action } from "redux";
import { RootAction, receiveEntry, receivePicks, receiveLive, receiveEvent, receiveBootstrapStatic, receiveFixtures, setTeams, setGameweek, receiveProcessedPlayers, receiveLeagueFixtures, setTeam, receiveStandingsH2h, setLeague, updateGameweekData, setDifferentials } from "../actions";
import { connect } from "react-redux";
import MatchHeaderContainer from "./MatchHeaderContainer";
import FplAppBar from "../components/FplAppBar";
import TrackerTabsContainer from "./TrackerTabsContainer";
import Picks from "../data/fpl/Picks";
import Live from "../data/fpl/Live";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import { MappedFixtures } from "../data/MappedFixtures";
import Url from "../util/Url";
import { ProcessedPlayers } from "../data/ProcessedPlayers";
import FplClient from "../services/fpl/FplClient";
import { LeagueFixtures, MappedLeagueFixtures } from "../data/LeagueFixtures";
import MatchStatusContainer from "./MatchStripContainer";
import StateHelper from "../util/StateHelper";
import FplAppBarContainer from "./FplAppBarContainer";
import LeaguesH2hStandings from "../data/fpl/LeaguesH2hStandings";
import Entry from "../data/fpl/Entry";
import PicksHelper from "../util/PicksHelper";

export interface MatchTrackerContainerProps {
    gameweek: number
    teams: number[]
    team: number
    leagueId: number
    fixtures: MappedFixtures
    mappedLeagueFixtures?: MappedLeagueFixtures
    entries: {[key: number]: Entry}
    picks: {[key: string]: Picks}

    setTeams: any
    setTeam: any
    setLeague: any
    setGameweek: any
    setDifferentials: any
    receiveBootstrapStatic: any
    receiveEntry: any
    receiveFixtures: any
    receivePicks: any
    receiveLive: any
    receiveEvent: any
    receiveProcessedPlayers: any
    receiveLeagueFixtures: any
    receiveLeaguesH2hStandings: any
    updateGameweekData: any
}

export interface MatchTrackerContainerState {
    retrievingData: boolean
}

export class MatchTrackerContainer extends React.Component<MatchTrackerContainerProps, MatchTrackerContainerState> {
    constructor(props: MatchTrackerContainerProps) {
        super(props);
        this.state = {
            retrievingData: false
        };
    }
    
    async componentDidMount() {
        const gameweek = parseInt(Url.getGameweek() || "1");
        let teamId = Url.getTeam() || 55385;
        let differentials = Url.getDifferentials() || false;
        const leagueId = Url.getLeague() || this.props.leagueId;

        this.props.setTeam(teamId);
        this.props.setLeague(leagueId);
        this.props.setTeams([teamId, teamId]);
        this.props.setDifferentials(differentials);
        this.props.receiveEntry(await new FplClient().entry(teamId));

        this.props.setGameweek(gameweek);
        this.props.updateGameweekData(gameweek, teamId, leagueId);
    }
    
    render() {
        return (
        <div>
            <FplAppBarContainer/>
            <MatchHeaderContainer/>
            <MatchStatusContainer/>
            <TrackerTabsContainer/>
        </div>
        )
    }
}

export function mapStateToProps(state: TrackerState) {
    console.log({state: state});
    return {
        gameweek: state.nav.gameweek,
        team: state.nav.team,
        teams: state.nav.teams,
        leagueId: state.nav.leagueId,
        fixtures: state.data.fixtures,
        mappedLeagueFixtures: state.data.mappedLeagueFixtures,
        picks: state.data.picks,
        entries: state.data.entries
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    setTeam: (team: number) => dispatch(setTeam(team)),
    setLeague: (league: number) => dispatch(setLeague(league)),
    setTeams: (teams: number[]) => dispatch(setTeams(teams)),
    setGameweek: (gameweek: number) => dispatch(setGameweek(gameweek)),
    setDifferentials: (diff: boolean) => dispatch(setDifferentials(diff)),
    receiveBootstrapStatic: (bootstrapStatic: BootstrapStatic) => dispatch(receiveBootstrapStatic(bootstrapStatic)),
    receiveEntry: (entry: any) => dispatch(receiveEntry(entry)),
    receiveFixtures: (fixtures: MappedFixtures) => dispatch(receiveFixtures(fixtures)),
    receivePicks: (entryId: number, gameweek: number, picks: Picks) => dispatch(receivePicks(entryId, gameweek, picks)),
    receiveLive: (gameweek: number, live: Live) => dispatch(receiveLive(gameweek, live)),
    receiveEvent: (gameweek: number, event: Event) => dispatch(receiveEvent(gameweek, event)),
    receiveProcessedPlayers: (gameweek: number, processedPlayers: ProcessedPlayers) => dispatch(receiveProcessedPlayers(gameweek, processedPlayers)),
    receiveLeagueFixtures: (leagueId: number, leagueFixtures: LeagueFixtures) => dispatch(receiveLeagueFixtures(leagueId, leagueFixtures)),
    receiveLeaguesH2hStandings: (leagueId: number, standings: LeaguesH2hStandings) => dispatch(receiveStandingsH2h(leagueId, standings)),
    updateGameweekData: (gameweek: number, team: number, leagueId: number) => dispatch(updateGameweekData(gameweek, team, leagueId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchTrackerContainer);

