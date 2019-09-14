import React, { ChangeEvent } from "react";
import { Dispatch, Action } from "redux";
import { TrackerState } from "../types";
import { RootAction, tabSelect } from "../actions";
import { connect } from "react-redux";
import TrackerTabs from "../components/TrackerTabs";

export interface TrackerTabsContainerProps {
    currentTab: number
    gameweek: number
    teams: number[]

    tabChanged: Function
}

export class TrackerTabsContainer extends React.Component<TrackerTabsContainerProps> {
    tabChanged(event: ChangeEvent<{}>, newIndex: any) {
        if (newIndex !== this.props.currentTab) {
            this.props.tabChanged(newIndex);
        }
    }
    
    render() {
        return (
            <TrackerTabs
                currentTab={this.props.currentTab}
                tabChanged={this.tabChanged.bind(this)}
                gameweek={this.props.gameweek}
                teams={this.props.teams}
            />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        currentTab: state.nav.selectedTab,
        teams: state.nav.teams,
        gameweek: state.nav.gameweek
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    tabChanged: (index: number) => dispatch(tabSelect(index)),
    
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackerTabsContainer);