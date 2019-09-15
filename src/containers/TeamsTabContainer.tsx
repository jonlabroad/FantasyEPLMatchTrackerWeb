import React, { Dispatch } from "react";
import Entry from "../data/fpl/Entry";
import { Action } from "redux";
import { TrackerState } from "../types";
import { connect } from "react-redux";
import TeamsTab from "../components/TeamsTab";
import Picks from "../data/fpl/Picks";
import PicksHelper from "../util/PicksHelper";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import { MappedEntryHistory } from "../data/fpl/EntryHistory";
import EntryHistoryHelper from "../util/EntryHistoryHelper";

export interface TeamsTabContainerProps {
    currentTab: number
    index: number
    
    teams: number[]
    gameweek: number

    bootstrap?: BootstrapStatic
    entries: {[key: number]: Entry}
    mappedPicks: {[key: string]: Picks}
    history: MappedEntryHistory
}

export class TeamsTabContainer extends React.Component<TeamsTabContainerProps> {
    render() {
        const { teams, index, currentTab, entries, mappedPicks, bootstrap, gameweek, history } = this.props;

        if (this.props.currentTab !== this.props.index) {
            return null;
        }

        if (!entries || !mappedPicks) {
            return null;
        }

        const matchEntries = [entries[teams[0]]];
        if (teams[1] && entries[teams[1]]) {
            matchEntries.push(entries[teams[1]]);
        } 

        const histories = [];
        for (let team of teams) {
            const hist = EntryHistoryHelper.getHistory(team, history);
            histories.push(hist);
        }

        const picksGameweek = PicksHelper.getPicksGameweek(gameweek, bootstrap);

        return (
            <TeamsTab
                entries={matchEntries}
                picks={PicksHelper.getMatchPicks(teams[0], teams[1], picksGameweek, mappedPicks)}
                bootstrap={bootstrap}
                history={histories}
            />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        currentTab: state.nav.selectedTab,
        teams: state.nav.teams,
        entries: state.data.entries,
        mappedPicks: state.data.picks,
        gameweek: state.nav.gameweek,
        bootstrap: state.data.bootstrapStatic,
        history: state.data.history
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TeamsTabContainer);