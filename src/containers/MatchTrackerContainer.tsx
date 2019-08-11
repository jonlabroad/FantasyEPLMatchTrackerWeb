import React from "react";
import { TrackerState } from "../types";
import { Dispatch } from "redux";
import { RootAction, receiveEntry, receivePicks, receiveLive, receiveEvent, receiveBootstrapStatic, receiveFixtures, setTeams, setGameweek, receiveProcessedPlayers, receiveLeagueFixtures, setTeam, receiveStandingsH2h } from "../actions";
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
    setGameweek: any
    receiveBootstrapStatic: any
    receiveEntry: any
    receiveFixtures: any
    receivePicks: any
    receiveLive: any
    receiveEvent: any
    receiveProcessedPlayers: any
    receiveLeagueFixtures: any
    receiveLeaguesH2hStandings: any
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
    
    async requestInitialData(teamId: number, gameweek: number, leagueId: number) {
        const fplClient = new FplClient();
        var promises = [];

        promises.push(fplClient.bootstrapStatic().then(bs => this.props.receiveBootstrapStatic(bs)));
        promises.push(StateHelper.requestLive(gameweek).then(live => this.props.receiveLive(gameweek, live)));
        promises.push(fplClient.fixtures().then(fixtures => this.props.receiveFixtures(fixtures)));
        promises.push(fplClient.leaguesH2hStandings(leagueId).then(standings => this.props.receiveLeaguesH2hStandings(leagueId, standings)));
        promises.push(new FplClient().processedPlayers(gameweek).then(processedPlayers => {this.props.receiveProcessedPlayers(gameweek, processedPlayers)}));
        promises.push(new FplClient().leagueFixtures(leagueId).then(async fixtures => {
            await this.findOpponent(gameweek, teamId, fixtures);
        
            this.props.receiveLeagueFixtures(leagueId, fixtures);
        }));
        await Promise.all(promises);
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
            if (!this.props.entries[team]) {
                this.props.receiveEntry(await new FplClient().entry(team));
            }
            if (!PicksHelper.getPicks(team, this.props.gameweek, this.props.picks)) {
                this.props.receivePicks(team, gameweek, await new FplClient().picks(team, gameweek));
            }
        }
    }
    
    async componentDidMount() {
        const gameweek = parseInt(Url.getGameweek() || "1");
        let teamId = Url.getTeam() || 55385;
        
        this.props.setTeam(teamId);
        this.props.setTeams([teamId, teamId]);
        this.props.receiveEntry(await new FplClient().entry(teamId));

        const leagueId = this.props.leagueId;

        this.props.setGameweek(gameweek);
        this.requestInitialData(teamId, gameweek, leagueId).then(() => this.setState({retrievingData: false}));
    }
    
    async componentDidUpdate() {
        this.stateUpdates();
    }

    async stateUpdates() {
        const fplClient = new FplClient();
        var promises: Promise<any>[] = [];
        if (!this.state.retrievingData) {
            console.log("Get some data");
            if (!this.props.fixtures[this.props.gameweek]) {
                console.log("Get fixtures");
                this.setState({retrievingData: true});
                promises.push(fplClient.fixtures().then(fixtures => {
                    this.props.receiveFixtures(fixtures);
                }));
            }
            console.log([this.props.team, this.props.teams]);
            if (!this.props.teams.includes(this.props.team) && this.props.mappedLeagueFixtures) {
                console.log("Setup teams");
                this.setState({retrievingData: true});
                promises.push(this.findOpponent(this.props.gameweek, this.props.team, this.props.mappedLeagueFixtures[this.props.leagueId]));
            }
            if (promises.length > 0) {
                Promise.all(promises).then(() => this.setState({retrievingData: false}));
            }
        }
        else {
            console.log("Already getting your data!!!");
        }
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
    receiveLeagueFixtures: (leagueId: number, leagueFixtures: LeagueFixtures) => dispatch(receiveLeagueFixtures(leagueId, leagueFixtures)),
    receiveLeaguesH2hStandings: (leagueId: number, standings: LeaguesH2hStandings) => dispatch(receiveStandingsH2h(leagueId, standings))
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchTrackerContainer);

