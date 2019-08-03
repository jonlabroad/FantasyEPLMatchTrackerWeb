import React, { Dispatch } from "react";
import { TrackerState } from "../types";
import { RootAction } from "../actions";
import { connect } from "react-redux";
import EventFixtureList from "../components/EventFixtureList";
import { MappedFixtures } from "../data/MappedFixtures";
import FixturesHelper from "../util/FixturesHelper";
import Bootstrap from "../data/fpl/Bootstrap";
import LiveHelper from "../util/LiveHelper";
import Live, { Lives } from "../data/fpl/Live";
import Picks from "../data/fpl/Picks";

export interface EventFixtureListContainerProps {
    gameweek: number
    bootstrap?: Bootstrap
    fixtures?: MappedFixtures
    live: Lives
    picks: {[key: string]: Picks}
    team1: number,
    team2: number
}

export class EventFixtureListContainer extends React.Component<EventFixtureListContainerProps> {
    render() {
        console.log('hi');
        return (
        <EventFixtureList
            bootstrap={this.props.bootstrap}
            fixtures={FixturesHelper.getFixtures(this.props.gameweek, this.props.fixtures)}
            live={LiveHelper.getLive(this.props.gameweek, this.props.live)}
            picks={this.props.picks}
            team1={this.props.team1}
            team2={this.props.team2}
            gameweek={this.props.gameweek}
        />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
      bootstrap: state.data.bootstrap,
      fixtures: state.data.fixtures,
      live: state.data.live,
      picks: state.data.picks,
      team1: 2365803,
      team2: 2365803
    };
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(EventFixtureListContainer);