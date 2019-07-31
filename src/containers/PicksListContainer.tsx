import React, { ChangeEvent } from "react";
import { Dispatch } from "redux";
import { TrackerState } from "../types";
import { RootAction, tabSelect } from "../actions";
import { connect } from "react-redux";
import TrackerTabs from "../components/TrackerTabs";
import PicksHelper from "../util/PicksHelper";
import PicksList from "../components/PicksList";
import Bootstrap from "../data/fpl/Bootstrap";
import Live from "../data/fpl/Live";
import LiveHelper from "../util/LiveHelper";

export interface PicksListContainerProps {
    entryId: number,
    gameweek: number,

    picks: any
    bootstrap?: Bootstrap
    live: {[key: number]: Live}
}

export class PicksListContainer extends React.Component<PicksListContainerProps> {
    render() {
        const picks = PicksHelper.getPicks(this.props.entryId, this.props.gameweek, this.props.picks);
        if (!picks) {
            return null;
        }

        return (
            <PicksList
                picks={picks}
                bootstrap={this.props.bootstrap}
                live={LiveHelper.getLive(this.props.gameweek, this.props.live)}
            />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        bootstrap: state.data.bootstrap,
        picks: state.data.picks,
        live: state.data.live
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    //tabChanged: (index: number) => dispatch(tabSelect(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PicksListContainer);