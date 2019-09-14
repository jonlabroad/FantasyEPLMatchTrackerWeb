import React, { ChangeEvent } from "react";
import { Dispatch, Action } from "redux";
import { TrackerState } from "../types";
import { RootAction, tabSelect, setDifferentials } from "../actions";
import { connect } from "react-redux";
import TrackerTabs from "../components/TrackerTabs";
import PicksHelper from "../util/PicksHelper";
import PicksList from "../components/PicksList";
import Live from "../data/fpl/Live";
import LiveHelper from "../util/LiveHelper";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import { MappedFixtures } from "../data/MappedFixtures";
import FixturesHelper from "../util/FixturesHelper";
import Picks from "../data/fpl/Picks";

export interface PicksListContainerProps {
    entryId: number,
    otherEntryId?: number,
    gameweek: number,
    differentialsOnly: boolean,

    picks?: {[key: string]: Picks}
    bootstrapStatic?: BootstrapStatic
    live: {[key: number]: Live}
    mappedFixtures?: MappedFixtures
}

export class PicksListContainer extends React.Component<PicksListContainerProps> {
    render() {
        const picks = PicksHelper.getPicks(this.props.entryId, this.props.gameweek, this.props.picks);
        if (!picks) {
            return null;
        }
        
        const otherPicks = this.props.otherEntryId ? PicksHelper.getPicks(this.props.otherEntryId, this.props.gameweek, this.props.picks) : undefined;

        const fixtures = FixturesHelper.getFixtures(this.props.gameweek, this.props.mappedFixtures);
        return (
            <PicksList
                differentialsOnly={this.props.differentialsOnly}
                picks={picks}
                otherPicks={otherPicks}
                bootstrapStatic={this.props.bootstrapStatic}
                live={LiveHelper.getLive(this.props.gameweek, this.props.live)}
                fixtures={fixtures}
            />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        bootstrapStatic: state.data.bootstrapStatic,
        picks: state.data.picks,
        live: state.data.live,
        mappedFixtures: state.data.fixtures,
        differentialsOnly: state.nav.differentialsOnly
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PicksListContainer);