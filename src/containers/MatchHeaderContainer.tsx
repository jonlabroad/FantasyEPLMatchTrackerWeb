import React from "react";
import { connect } from "react-redux";
import { TrackerState } from "../types";
import { RootAction } from "../actions";
import { Dispatch } from "redux";
import MatchHeader from "../components/MatchHeader";
import PicksHelper from "../util/PicksHelper";
import Live from "../data/fpl/Live";
import LiveHelper from "../util/LiveHelper";

export interface MatchHeaderContainerProps {
    teams: number[]

    gameweek: number;
    entries: {[key: number]: any};
    picks?: any;
    live?: {[key: string]: Live};
}

export class MatchHeaderContainer extends React.Component<MatchHeaderContainerProps, {}> {
    render() {
        console.log({matchHeaderContainer: this.props});
        return (
        <MatchHeader
            gameweek={this.props.gameweek}
            entry1={this.props.entries[this.props.teams[0]]}
            entry2={this.props.entries[this.props.teams[1]]}
            picks1={PicksHelper.getPicks(this.props.teams[0], this.props.gameweek, this.props.picks)}
            picks2={PicksHelper.getPicks(this.props.teams[1], this.props.gameweek, this.props.picks)}
            live={LiveHelper.getLive(this.props.gameweek, this.props.live)}
        />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
      gameweek: state.nav.gameweek,
      teams: state.nav.teams,
      entries: state.data.entries,
      picks: state.data.picks,
      live: state.data.live
    };
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchHeaderContainer);