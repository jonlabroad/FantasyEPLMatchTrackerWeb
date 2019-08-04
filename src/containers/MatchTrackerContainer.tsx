import React from "react";
import { TrackerState } from "../types";
import { Dispatch } from "redux";
import { RootAction, receiveEntry, receiveBootstrap, receivePicks, receiveLive, receiveEvent, receiveBootstrapStatic, receiveFixtures, setTeams, setGameweek } from "../actions";
import MockFplClient from "../services/fpl/MockFplClient";
import { connect } from "react-redux";
import MatchHeaderContainer from "./MatchHeaderContainer";
import FplAppBar from "../components/FplAppBar";
import TrackerTabsContainer from "./TrackerTabsContainer";
import Bootstrap from "../data/fpl/Bootstrap";
import Picks from "../data/fpl/Picks";
import Live from "../data/fpl/Live";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import { MappedFixtures } from "../data/MappedFixtures";
import Url from "../util/Url";

export interface MatchTrackerContainerProps {
    gameweek: number
    teams: number[]

    setTeams: any
    setGameweek: any
    receiveBootstrap: any
    receiveBootstrapStatic: any
    receiveEntry: any
    receiveFixtures: any
    receivePicks: any
    receiveLive: any
    receiveEvent: any
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

        new MockFplClient().bootstrapStatic().then((bootstrapStatic) => {
            this.props.receiveBootstrapStatic(bootstrapStatic);
        });
        new MockFplClient().fixtures().then((fixtures) => {
            this.props.receiveFixtures(fixtures);
        });
        this.props.receiveBootstrap(await new MockFplClient().bootstrap());
        console.log({teams: teams});
        if (teams[0]) {
            this.props.receiveEntry(await new MockFplClient().entry(teams[0]));
        }
        if (teams[1]) {
            this.props.receiveEntry(await new MockFplClient().entry(teams[1]));
        }
        this.props.receiveLive(gameweek, await new MockFplClient().live(gameweek));
        this.props.receiveEvent(gameweek, await new MockFplClient().event(gameweek));

        // TODO get picks for all entries in league!
        this.props.receivePicks(teams[0], gameweek, await new MockFplClient().picks(teams[0], gameweek));
        if (teams[1]) {
            this.props.receivePicks(teams[1], gameweek, await new MockFplClient().picks(teams[1], gameweek));
        }
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
    receiveBootstrap: (bootstrap: Bootstrap) => dispatch(receiveBootstrap(bootstrap)),
    receiveBootstrapStatic: (bootstrapStatic: BootstrapStatic) => dispatch(receiveBootstrapStatic(bootstrapStatic)),
    receiveEntry: (entry: any) => dispatch(receiveEntry(entry)),
    receiveFixtures: (fixtures: MappedFixtures) => dispatch(receiveFixtures(fixtures)),
    receivePicks: (entryId: number, gameweek: number, picks: Picks) => dispatch(receivePicks(entryId, gameweek, picks)),
    receiveLive: (gameweek: number, live: Live) => dispatch(receiveLive(gameweek, live)),
    receiveEvent: (gameweek: number, event: Event) => dispatch(receiveEvent(gameweek, event))
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchTrackerContainer);

