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
    entry1Id: number;
    entry2Id: number;

    entries: {[key: number]: any};
    picks?: any;
    live?: {[key: string]: Live};
}

export class MatchHeaderContainer extends React.Component<MatchHeaderContainerProps, {}> {
    render() {
        return (
        <MatchHeader
            entry1={this.props.entries[this.props.entry1Id]}
            entry2={this.props.entries[this.props.entry2Id]}
            picks1={PicksHelper.getPicks(this.props.entry1Id, 1,this.props.picks)}
            picks2={PicksHelper.getPicks(this.props.entry2Id, 1, this.props.picks)}
            live={LiveHelper.getLive(1, this.props.live)}
        />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
      entries: state.data.entries,
      picks: state.data.picks,
      live: state.data.live
    };
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchHeaderContainer);