import React, { Dispatch } from "react";
import { TrackerState } from "../types";
import { RootAction } from "../actions";
import { connect } from "react-redux";
import EventFixtureList from "../components/EventFixtureList";
import { MappedFixtures } from "../data/MappedFixtures";
import FixturesHelper from "../util/FixturesHelper";
import Bootstrap from "../data/fpl/Bootstrap";

export interface EventFixtureListContainerProps {
    gameweek: number
    bootstrap?: Bootstrap
    fixtures?: MappedFixtures
}

export class EventFixtureListContainer extends React.Component<EventFixtureListContainerProps> {
    render() {
        return (
        <EventFixtureList
            bootstrap={this.props.bootstrap}
            fixtures={FixturesHelper.getFixtures(this.props.gameweek, this.props.fixtures)}
        />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
      bootstrap: state.data.bootstrap,
      fixtures: state.data.fixtures,
      //events: state.data.events,
      //picks: state.data.picks,
      //live: state.data.live
    };
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(EventFixtureListContainer);