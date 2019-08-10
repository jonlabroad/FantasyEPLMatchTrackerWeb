import React from "react";
import { TrackerState } from "../types";
import { Dispatch } from "redux";
import { RootAction, receiveEntry, receivePicks, receiveLive, receiveEvent, receiveBootstrapStatic, receiveFixtures, setTeams, setGameweek, receiveProcessedPlayers, receiveLeagueFixtures, setTeam } from "../actions";
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
import { LeagueFixtures } from "../data/LeagueFixtures";
import MatchStatusContainer from "./MatchStripContainer";
import StateHelper from "../util/StateHelper";

export interface MatchTrackerContainerProps {
    gameweek: number
    teams: number[]
    leagueId: number

    setTeams: any
    setTeam: any
    setGameweek: any
    receiveBootstrapStatic: any
    receiveEntry: any
    receiveFixtures: any
    receivePicks: any
    receiveLive: any
    receiveEvent: any
    receiveProcessedPlayers: any
    receiveLeagueFixtures: any
}

export class MatchTrackerContainer extends React.Component<MatchTrackerContainerProps, any> {
    async requestInitialData(teamId: number, gameweek: number, leagueId: number) {
        const fplClient = new FplClient();

        fplClient.bootstrapStatic().then(bs => this.props.receiveBootstrapStatic(bs));
        StateHelper.requestLive(gameweek).then(live => this.props.receiveLive(gameweek, live));
        fplClient.fixtures().then(fixtures => this.props.receiveFixtures(fixtures));

        new FplClient().processedPlayers(gameweek).then(processedPlayers => {this.props.receiveProcessedPlayers(gameweek, processedPlayers)});
        new FplClient().leagueFixtures(leagueId).then(async fixtures => {
            await this.findOpponent(gameweek, teamId, fixtures);
        
            this.props.receiveLeagueFixtures(leagueId, fixtures);
            for (let fixture of fixtures[gameweek]) {
                const teams: number[] = [fixture.entry_1_entry || 0, fixture.entry_2_entry || 0];
                for (let team of teams) {
                    if (team > 0) {
                        //StateHelper.requestPicks(team, gameweek).then(picks => this.props.receivePicks(team, gameweek, picks));
                    }
                }
            }
        });
    }
    
    async findOpponent(gameweek: number, teamId: number, fixtures: LeagueFixtures) {
        var otherTeam: number | undefined = teamId;
        var team1: number = teamId;
        var team2: number = teamId;
        if (fixtures) {
            const fixture = fixtures[gameweek].find(fixture => fixture.entry_1_entry === teamId || fixture.entry_2_entry === teamId);
            if (fixture) {
                otherTeam = fixture.entry_1_entry === teamId ? fixture.entry_2_entry : fixture.entry_1_entry;
                team1 = fixture.entry_1_entry === teamId ? teamId : otherTeam || teamId;
                team2 = fixture.entry_2_entry === teamId ? teamId : otherTeam || teamId;
            }
        }
        const teams = [team1, team2];
        this.props.setTeams(teams);
        for (var team of teams) {
            this.props.receiveEntry(await new FplClient().entry(team));
            this.props.receivePicks(team, gameweek, await new FplClient().picks(team, gameweek));
        }
    }
    
    async componentDidMount() {
        const gameweek = parseInt(Url.getGameweek() || "1");
        let teamId = Url.getTeam() || 55385;
        
        this.props.setTeam(teamId);
        this.props.setTeams([teamId, teamId]);
        this.props.receiveEntry(await new FplClient().entry(teamId));

        const leagueId = 22356;

        this.props.setGameweek(gameweek);
        this.requestInitialData(teamId, gameweek, leagueId);
    }
    
    render() {
        return (
        <div>
            <FplAppBar/>
            <MatchHeaderContainer/>
            <MatchStatusContainer/>
            <TrackerTabsContainer/>
        </div>
        )
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        gameweek: state.nav.gameweek,
        teams: state.nav.teams,
        leagueId: state.nav.leagueId
    };
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    setTeam: (team: number) => dispatch(setTeam(team)),
    setTeams: (teams: number[]) => dispatch(setTeams(teams)),
    setGameweek: (gameweek: number) => dispatch(setGameweek(gameweek)),
    receiveBootstrapStatic: (bootstrapStatic: BootstrapStatic) => dispatch(receiveBootstrapStatic(bootstrapStatic)),
    receiveEntry: (entry: any) => dispatch(receiveEntry(entry)),
    receiveFixtures: (fixtures: MappedFixtures) => dispatch(receiveFixtures(fixtures)),
    receivePicks: (entryId: number, gameweek: number, picks: Picks) => dispatch(receivePicks(entryId, gameweek, picks)),
    receiveLive: (gameweek: number, live: Live) => dispatch(receiveLive(gameweek, live)),
    receiveEvent: (gameweek: number, event: Event) => dispatch(receiveEvent(gameweek, event)),
    receiveProcessedPlayers: (gameweek: number, processedPlayers: ProcessedPlayers) => dispatch(receiveProcessedPlayers(gameweek, processedPlayers)),
    receiveLeagueFixtures: (leagueId: number, leagueFixtures: LeagueFixtures) => dispatch(receiveLeagueFixtures(leagueId, leagueFixtures))
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchTrackerContainer);

