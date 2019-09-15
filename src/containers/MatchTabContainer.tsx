import React, { ChangeEvent } from "react";
import { Dispatch, Action } from "redux";
import { TrackerState } from "../types";
import { RootAction, tabSelect, setDifferentials } from "../actions";
import { connect } from "react-redux";
import TrackerTabs from "../components/TrackerTabs";
import MatchTab from "../components/MatchTab";

export interface MatchTabContainerProps {
    currentTab: number
    gameweek: number
    teams: number[]
    index: number
    differentials: boolean

    setDifferentials: any

    tabChanged: Function
}

export class MatchTabContainer extends React.Component<MatchTabContainerProps> {
    onDifferentialsChange(event: any) {
        if (event.target) {
            this.props.setDifferentials(!!event.target.checked);
        }
    }
    
    render() {
        if (this.props.currentTab !== this.props.index) {
            return null;
        }

        return (
            <MatchTab
                gameweek={this.props.gameweek}
                teams={this.props.teams}
                differentialsOnly={this.props.differentials}
            
                onDifferentialsChange={this.onDifferentialsChange.bind(this)}
            />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        currentTab: state.nav.selectedTab,
        teams: state.nav.teams,
        gameweek: state.nav.gameweek,
        differentials: state.nav.differentialsOnly
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    tabChanged: (index: number) => dispatch(tabSelect(index)),
    setDifferentials: (value: boolean) => dispatch(setDifferentials(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchTabContainer);