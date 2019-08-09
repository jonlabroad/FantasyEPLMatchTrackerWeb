import React from "react";
import { TrackerState } from "../types";
import { Dispatch } from "redux";
import { RootAction, receiveEntry, receivePicks, receiveLive, receiveEvent, receiveBootstrapStatic, receiveFixtures, setTeams, setGameweek, receiveProcessedPlayers } from "../actions";
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

export interface MatchTrackerContainerProps {
    gameweek: number
    teams: number[]

    setTeams: any
    setGameweek: any
    receiveBootstrapStatic: any
    receiveEntry: any
    receiveFixtures: any
    receivePicks: any
    receiveLive: any
    receiveEvent: any
    receiveProcessedPlayers: any
}

export class MatchTrackerContainer extends React.Component<MatchTrackerContainerProps, any> {
    async componentDidMount() {
        const gameweek = parseInt(Url.getGameweek() || "1");
        let teams = Url.getTeams();
        if (teams.length <= 0) {
            teams = [55385, 55385];
        }

        Url.set(gameweek, teams);

        this.props.setTeams(teams);
        this.props.setGameweek(gameweek);

        new FplClient().bootstrapStatic().then((bootstrapStatic) => {
            this.props.receiveBootstrapStatic(bootstrapStatic);
        });
        new FplClient().fixtures().then((fixtures) => {
            this.props.receiveFixtures(fixtures);
        });
        console.log({teams: teams});
        if (teams[0]) {
            this.props.receiveEntry(await new FplClient().entry(teams[0]));
        }
        if (teams[1]) {
            this.props.receiveEntry(await new FplClient().entry(teams[1]));
        }
        this.props.receiveLive(gameweek, await new FplClient().live(gameweek));
        //this.props.receiveEvent(gameweek, await new FplClient().event(gameweek));

        // TODO get picks for all entries in league!
        this.props.receivePicks(teams[0], gameweek, await new FplClient().picks(teams[0], gameweek));
        if (teams[1]) {
            this.props.receivePicks(teams[1], gameweek, await new FplClient().picks(teams[1], gameweek));
        }

        new FplClient().processedPlayers(gameweek).then(processedPlayers => this.props.receiveProcessedPlayers(gameweek, processedPlayers));
    }
    
    render() {
        return (
        <div>
            <FplAppBar/>
            <MatchHeaderContainer/>
            <TrackerTabsContainer/>
        </div>
        )
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        gameweek: state.nav.gameweek,
        teams: state.nav.teams
    };
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    setTeams: (teams: number[]) => dispatch(setTeams(teams)),
    setGameweek: (gameweek: number) => dispatch(setGameweek(gameweek)),
    receiveBootstrapStatic: (bootstrapStatic: BootstrapStatic) => dispatch(receiveBootstrapStatic(bootstrapStatic)),
    receiveEntry: (entry: any) => dispatch(receiveEntry(entry)),
    receiveFixtures: (fixtures: MappedFixtures) => dispatch(receiveFixtures(fixtures)),
    receivePicks: (entryId: number, gameweek: number, picks: Picks) => dispatch(receivePicks(entryId, gameweek, picks)),
    receiveLive: (gameweek: number, live: Live) => dispatch(receiveLive(gameweek, live)),
    receiveEvent: (gameweek: number, event: Event) => dispatch(receiveEvent(gameweek, event)),
    receiveProcessedPlayers: (gameweek: number, processedPlayers: ProcessedPlayers) => dispatch(receiveProcessedPlayers(gameweek, processedPlayers))
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchTrackerContainer);

