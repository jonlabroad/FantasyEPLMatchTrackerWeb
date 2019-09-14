import React, { Dispatch } from "react";
import Entry from "../data/fpl/Entry";
import { Action } from "redux";
import { TrackerState } from "../types";
import { connect } from "react-redux";
import TeamsTab from "../components/TeamsTab";
import Picks from "../data/fpl/Picks";
import PicksHelper from "../util/PicksHelper";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";

export interface TeamsTabContainerProps {
    currentTab: number
    index: number
    
    teams: number[]
    gameweek: number

    bootstrap?: BootstrapStatic
    entries: {[key: number]: Entry}
    mappedPicks: {[key: string]: Picks}
}

export class TeamsTabContainer extends React.Component<TeamsTabContainerProps> {
    render() {
        const { teams, index, currentTab, entries, mappedPicks, bootstrap, gameweek } = this.props;

        if (currentTab !== index) {
            return null;
        }

        if (!entries || !mappedPicks) {
            return null;
        }

        const matchEntries = [entries[teams[0]]];
        if (teams[1] && entries[teams[1]]) {
            matchEntries.push(entries[teams[1]]);
        } 

        const picksGameweek = PicksHelper.getPicksGameweek(gameweek, bootstrap);

        return (
            <TeamsTab
                entries={matchEntries}
                picks={PicksHelper.getMatchPicks(teams[0], teams[1], picksGameweek, mappedPicks)}
                bootstrap={bootstrap}
            />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        teams: state.nav.teams,
        entries: state.data.entries,
        mappedPicks: state.data.picks,
        gameweek: state.nav.gameweek,
        bootstrap: state.data.bootstrapStatic
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TeamsTabContainer);