import React, { Dispatch } from "react";
import { TrackerState } from "../types";
import { RootAction } from "../actions";
import { connect } from "react-redux";
import EventFixtureList from "../components/EventFixtureList";
import { MappedFixtures } from "../data/MappedFixtures";
import FixturesHelper from "../util/FixturesHelper";
import LiveHelper from "../util/LiveHelper";
import Live, { Lives } from "../data/fpl/Live";
import Picks from "../data/fpl/Picks";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";

export interface EventFixtureListContainerProps {
    gameweek: number
    bootstrapStatic?: BootstrapStatic
    fixtures?: MappedFixtures
    live: Lives
    picks: {[key: string]: Picks}
    teams: number[]
}

export class EventFixtureListContainer extends React.Component<EventFixtureListContainerProps> {
    render() {
        return (null
            /*
        <EventFixtureList
            bootstrapStatic={this.props.bootstrapStatic}
            fixtures={FixturesHelper.getFixtures(this.props.gameweek, this.props.fixtures)}
            live={LiveHelper.getLive(this.props.gameweek, this.props.live)}
            picks={this.props.picks}
            team1={this.props.teams[0]}
            team2={this.props.teams[1]}
            gameweek={this.props.gameweek}
        />
        */
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
      bootstrap: state.data.bootstrapStatic,
      fixtures: state.data.fixtures,
      live: state.data.live,
      picks: state.data.picks,
      teams: state.nav.teams
    };
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(EventFixtureListContainer);