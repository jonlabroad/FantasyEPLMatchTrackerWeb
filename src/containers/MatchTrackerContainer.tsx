import React from "react";
import { TrackerState } from "../types";
import { Dispatch } from "redux";
import { RootAction, receiveEntry, receiveBootstrap, receivePicks, receiveLive } from "../actions";
import MockFplClient from "../services/fpl/MockFplClient";
import { connect } from "react-redux";
import MatchHeaderContainer from "./MatchHeaderContainer";
import FplAppBar from "../components/FplAppBar";
import TrackerTabsContainer from "./TrackerTabsContainer";
import Bootstrap from "../data/fpl/Bootstrap";
import Picks from "../data/fpl/Picks";
import Live from "../data/fpl/Live";

export class MatchTrackerContainer extends React.Component<any, any> {
    async componentDidMount() {
        this.props.receiveBootstrap(await new MockFplClient().bootstrap());
        this.props.receiveEntry(await new MockFplClient().entry(0));
        this.props.receiveLive(1, await new MockFplClient().live(1));

        // TODO get picks for all entries in league!
        this.props.receivePicks(2365803, 1, await new MockFplClient().picks(2365803, 1));
    }
    
    render() {
        return (
        <div>
            <FplAppBar/>
            <MatchHeaderContainer entry1Id={2365803} entry2Id={2365803}/>
            <TrackerTabsContainer/>
        </div>
        )
    }
}

export function mapStateToProps(state: TrackerState) {
    return {

    };
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    receiveBootstrap: (bootstrap: Bootstrap) => dispatch(receiveBootstrap(bootstrap)),
    receiveEntry: (entry: any) => dispatch(receiveEntry(entry)),
    receivePicks: (entryId: number, gameweek: number, picks: Picks) => dispatch(receivePicks(entryId, gameweek, picks)),
    receiveLive: (gameweek: number, live: Live) => dispatch(receiveLive(gameweek, live))
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchTrackerContainer);

